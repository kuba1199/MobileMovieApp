import * as React from 'react';
import {View, Text} from 'react-native';
import GroupMessageList from './GroupMessageList';
import GroupMessageInput from './GroupMessageInput';

import {useState} from 'react';

const GroupMessageView = ({groupName, isLoading}) => {
  const [isNewMessageAdded, setNewMessageAdded] = useState(false);

  return (
    <View style={{position: 'absolute', bottom: 0, flex: 1, width: '100%'}}>
      <GroupMessageList
        groupName={groupName}
        isNewMessageAdded={isNewMessageAdded}
        isLoading={isLoading}
      />
      <GroupMessageInput
        groupName={groupName}
        setNewMessageAdded={setNewMessageAdded}
        isNewMessageAdded={isNewMessageAdded}
      />
    </View>
  );
};

export default GroupMessageView;
