import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/firestore';
import moment from 'moment';

const CommentInput = ({movieTitle, setNewCommentAdded, isNewCommentAdded}) => {
  const [comment, setComment] = useState('');

  const submitHandler = async () => {
    const user = await firebase.auth().currentUser;
    const docsList = [];
    const docs = await firestore()
      .collection('comments')
      .get()
      .then(querySnapshot =>
        querySnapshot.forEach(elem => docsList.push(elem)),
      );

    let isExist = false;
    for (let i = 0; i < docsList.length; i++) {
      if (docsList[i]._data.movieTitle === movieTitle) {
        isExist = true;
        break;
      }
    }

    if (isExist) {
      const docBefore = await firestore()
        .collection('comments')
        .doc(movieTitle)
        .get();

      await firestore()
        .collection('comments')
        .doc(movieTitle)
        .update({
          comments: [
            ...docBefore._data.comments,
            {
              userId: user.uid,
              userEmail: user.email,
              comment: comment,
              date: moment().format('MMMM Do YYYY, h:mm'),
            },
          ],
        });
    } else {
      const result = await firestore()
        .collection('comments')
        .doc(movieTitle)
        .set({
          comments: [
            {
              userId: user.uid,
              userEmail: user.email,
              comment: comment,
              date: moment().format('MMMM Do YYYY, h:mm'),
            },
          ],
          movieTitle: movieTitle,
        });
    }
    setNewCommentAdded(!isNewCommentAdded);
    setComment('');
  };

  return (
    <>
      <TextInput
        label="Add comment"
        // multiline
        // numberOfLines={4}
        value={comment}
        onChangeText={comment => setComment(comment)}
        onSubmitEditing={submitHandler}
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          width: '100%',
        }}
      />
    </>
  );
};

export default CommentInput;
