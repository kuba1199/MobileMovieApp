import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/firestore';
import moment from 'moment';

const GroupMessageInput = ({
  groupName,
  setNewMessageAdded,
  isNewMessageAdded,
}) => {
  const [message, setMessage] = useState('');

  const submitHandler = async () => {
    const user = await firebase.auth().currentUser;
    const docsList = [];
    const docs = await firestore()
      .collection('groups')
      .get()
      .then(querySnapshot =>
        querySnapshot.forEach(elem => docsList.push(elem)),
      );

    let isExist = false;
    for (let i = 0; i < docsList.length; i++) {
      if (docsList[i]._data.groupName === groupName) {
        isExist = true;
        break;
      }
    }

    if (isExist) {
      const docBefore = await firestore()
        .collection('groups')
        .doc(groupName)
        .get();

      await firestore()
        .collection('groups')
        .doc(groupName)
        .update({
          messages: [
            ...docBefore._data.messages,
            {
              userId: user.uid,
              userEmail: user.email,
              message: message,
              date: moment().format('MMMM Do YYYY, h:mm'),
            },
          ],
        });
    } else {
      const result = await firestore()
        .collection('groups')
        .doc(groupName)
        .set({
          messages: [
            {
              userId: user.uid,
              userEmail: user.email,
              message: message,
              date: moment().format('MMMM Do YYYY, h:mm'),
            },
          ],
          groupName: groupName,
        });
    }
    setNewMessageAdded(!isNewMessageAdded);
    setMessage('');
  };

  return (
    <>
      <TextInput
        label="Add message"
        // multiline
        // numberOfLines={4}
        value={message}
        onChangeText={message => setMessage(message)}
        onSubmitEditing={submitHandler}
        style={{
          borderRadius: 0,
          width: '100%',
        }}
      />
    </>
  );
};

export default GroupMessageInput;
