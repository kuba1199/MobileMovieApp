import React, {useEffect, useState, useContext} from 'react';
import {View, Text, Button, FlatList, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/firestore';
import {SubscriptionContext} from '../context/subscriptionContext';
import Styles from '../Styles';
import Ionic from 'react-native-vector-icons/Ionicons';

const GroupListView = props => {
  const [groupList, setGroupList] = useState([]);

  const {isSubscriptionUpdate} = useContext(SubscriptionContext);

  useEffect(() => {
    const getGroups = async () => {
      const user = await firebase.auth().currentUser;
      if (user) {
        const result = await firestore()
          .collection('groups')
          .get()
          .then(snapshot => setGroupList(snapshot.docs));
      }
    };
    getGroups();
  }, [isSubscriptionUpdate]);

  return (
    <View style={{display: 'flex', flexDirection: 'column'}}>
      <FlatList
        data={groupList}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('GroupDetails', {
                groupName: item._data.groupName,
              })
            }>
            <View
              style={[
                Styles.groupItem,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}>
              <Text
                style={{
                  fontSize: 23,
                  marginLeft: 10,
                  textAlignVertical: 'center',
                }}>
                {item._data.groupName}{' '}
              </Text>
              <View style={{justifyContent: 'center', marginRight: 15}}>
                <Ionic name="arrow-forward-circle-outline" size={40} />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default GroupListView;
