import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ScrollView} from 'react-native';
import {TextInput} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const GroupMessageList = ({groupName, isNewMessageAdded, isLoading}) => {
  const [messages, setMessages] = useState([{}]);

  useEffect(() => {
    const getMessages = async () => {
      if (isLoading) {
        return null;
      }
      const result = await firestore()
        .collection('groups')
        .where('groupName', '==', groupName)
        .get();
      setMessages(result._docs[0]._data.messages);
    };

    getMessages();
  }, [isNewMessageAdded, isLoading]);

  if (messages.length === 0) {
    return <EmptyMessageList />;
  }

  return (
    <ScrollView>
      {messages.map((item, index) => (
        <MessageItem
          key={index}
          message={item.message}
          userEmail={item.userEmail}
          date={item.date}
        />
      ))}
    </ScrollView>
  );
};

const MessageItem = ({message, userEmail, date}) => (
  <View
    style={{
      flexDirection: 'column',
      color: '#fff',
      width: '100%',
    }}>
    <View style={{backgroundColor: '#C0C0C0'}}>
      <View style={{flexDirection: 'row', backgroundColor: '#C0C0C0'}}>
        <Text
          style={{
            color: 'black',
            textAlign: 'left',
          }}>
          {userEmail}
        </Text>
        <Text style={{textAlign: 'right', flex: 1}}>{date}</Text>
      </View>
      <View
        style={{
          minHeight: 50,
          backgroundColor: '#CCE5FF',
        }}>
        <Text style={{marginTop: 5}}>{message}</Text>
      </View>
    </View>
  </View>
);

const EmptyMessageList = () => (
  <View>
    <Text>No messages</Text>
  </View>
);

export default GroupMessageList;
