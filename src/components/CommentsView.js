import * as React from 'react';
import {View, Text} from 'react-native';
import CommentInput from './CommentInput';
import CommentsList from './CommentsList';
import {useState} from 'react';
const CommentsView = ({movieTitle}) => {
  const [isNewCommentAdded, setNewCommentAdded] = useState(false);

  return (
    <View>
      <CommentInput
        movieTitle={movieTitle}
        setNewCommentAdded={setNewCommentAdded}
        isNewCommentAdded={isNewCommentAdded}
      />
      <CommentsList
        movieTitle={movieTitle}
        isNewCommentAdded={isNewCommentAdded}
      />
    </View>
  );
};

export default CommentsView;
