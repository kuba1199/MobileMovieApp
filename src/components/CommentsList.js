import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {TextInput} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const CommentsList = ({movieTitle, isNewCommentAdded}) => {
  const [comments, setComments] = useState([{}]);

  useEffect(() => {
    const getComments = async () => {
      const result = await firestore()
        .collection('comments')
        .where('movieTitle', '==', movieTitle)
        .get()
        .then(querySelector => querySelector._docs[0]);
      setComments(result._data.comments);
    };

    getComments();
  }, [isNewCommentAdded]);

  if (comments.length === 0) {
    return <EmptyCommentList />;
  }

  return (
    <View>
      {comments.map((item, index) => (
        <CommentItem
          key={index}
          comment={item.comment}
          userEmail={item.userEmail}
          date={item.date}
        />
      ))}
    </View>
  );
};

const CommentItem = ({comment, userEmail, date}) => (
  <View
    style={{
      flexDirection: 'column',
      color: '#fff',
      width: '100%',
    }}>
    <View style={{backgroundColor: '#E6E6FA'}}>
      <View style={{flexDirection: 'row', backgroundColor: '#E6E6FA'}}>
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
          backgroundColor: '#F8F8FF',
        }}>
        <Text style={{marginTop: 5, color: 'black'}}>{comment}</Text>
      </View>
    </View>
  </View>
);

const EmptyCommentList = () => (
  <View>
    <Text>No comments</Text>
  </View>
);

export default CommentsList;
