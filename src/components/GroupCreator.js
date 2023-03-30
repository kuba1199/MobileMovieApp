import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Button} from 'react-native-paper';
import Styles from '../Styles';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/firestore';
import moment from 'moment';

const GroupCreator = props => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const formHandler = async () => {
    const user = await firebase.auth().currentUser;
    const result = await firestore()
      .collection('groups')
      .doc(name)
      .set({
        groupName: name,
        groupDescription: description,
        users: [],
        messages: [],
        userId: user.uid,
        date: moment().format('MMMM Do YYYY, h:mm'),
      });

    props.navigation.navigate('GroupDetails', {
      groupName: name,
    });
  };

  return (
    <View style={Styles.sectionBg}>
      <View
        style={{
          marginTop: 10,
          color: 'white',
          marginBottom: 10,
          marginHorizontal: 3,
        }}>
        <Text style={{color: 'white'}}>Group name</Text>
        <TextInput
          placeholder="Type a name of your group"
          value={name}
          onChangeText={e => setName(e)}
          style={{backgroundColor: 'darkgrey', borderRadius: 12}}
        />
      </View>
      <View
        style={{
          marginTop: 10,
          color: 'white',
          marginBottom: 30,
          marginHorizontal: 3,
        }}>
        <Text style={{color: 'white'}}>Group description</Text>
        <TextInput
          placeholder="Type a description of your group"
          value={description}
          onChangeText={e => setDescription(e)}
          style={{backgroundColor: 'darkgrey', borderRadius: 12}}
        />
      </View>
      <Button
        mode="contained"
        onPress={formHandler}
        buttonColor="#F4C10F"
        style={{marginTop: 20, marginHorizontal: 20, height: 45}}>
        <Text style={{color: 'grey'}}>CREATE GROUP</Text>
      </Button>
    </View>
  );
};

export default GroupCreator;
