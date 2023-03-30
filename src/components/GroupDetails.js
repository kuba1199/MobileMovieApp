import React, {useState, useEffect, useContext} from 'react';
import {View, Text, FlatList, Button, Pressable} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/firestore';
import {SubscriptionContext} from '../context/subscriptionContext';
import GroupMessageView from './GroupMessageView';
import Styles from '../Styles';
import {Appbar, IconButton} from 'react-native-paper';
import Constants from '../Constants';
import Ionic from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const GroupDetails = props => {
  const [details, setDetails] = useState({});
  const [isAddedToGroup, setIsAddedToGroup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isListVisible, setIsListVisible] = useState(false);

  const handlePress = () => {
    setIsListVisible(!isListVisible);
  };

  const {setSubscriptionUpdate, isSubscriptionUpdate} =
    useContext(SubscriptionContext);

  useEffect(() => {
    const getGroups = async () => {
      const user = await firebase.auth().currentUser;
      if (user) {
        const result = await firestore()
          .collection('groups')
          .doc(props.route.params.groupName)
          .get()
          .then(querySnapshot => {
            const groupData = querySnapshot.data();
            const isExist = groupData.users.find(
              element => element.userId === user.uid,
            );
            if (isExist) {
              setIsAddedToGroup(true);
            }
            setDetails(groupData);
          });
        setIsLoading(false);
      }
    };
    getGroups();
  }, [isSubscriptionUpdate]);

  const subscribeHandler = async () => {
    const user = await firebase.auth().currentUser;

    if (isAddedToGroup) {
      let newUserList = details.users.filter(item => item.userId !== user.uid);
      const result = await firestore()
        .collection('groups')
        .doc(details.groupName)
        .update({...details, users: newUserList});
      setIsAddedToGroup(false);
      setDetails({...details, users: newUserList});
    } else {
      let newUserList = [
        ...details.users,
        {userId: user.uid, userEmail: user.email},
      ];
      const result = await firestore()
        .collection('groups')
        .doc(details.groupName)
        .update({...details, users: newUserList});
      setIsAddedToGroup(true);
      setDetails({...details, users: newUserList});
    }
    setSubscriptionUpdate(!isAddedToGroup);
  };
  return (
    <View style={[Styles.sectionBg, {flex: 1}]}>
      <Appbar.Header
        style={{
          backgroundColor: Constants.secondaryColor,
          justifyContent: 'center',
        }}
        mode="center-aligned">
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: Constants.textColor,
              fontWeight: '700',
              fontSize: 20,
              textAlign: 'center',
              color: '  grey',
            }}>
            {details.groupName}
          </Text>
          <View style={{position: 'absolute', right: -110}}>
            <Pressable
              onPress={subscribeHandler}
              style={{justifyContent: 'flex-end'}}>
              {isAddedToGroup ? (
                <Ionic name="md-person-remove" size={28} />
              ) : (
                <Ionic name="md-person-add" size={28} />
              )}
            </Pressable>
          </View>
        </View>
      </Appbar.Header>
      {isAddedToGroup ? (
        <>
          <Pressable
            onPress={handlePress}
            style={{backgroundColor: 'lightblue'}}>
            <Text
              style={{
                textAlign: 'center',
                height: 30,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {isListVisible ? 'Hide members' : 'See members'}
            </Text>
          </Pressable>
          {isListVisible && (
            <FlatList
              data={details.users}
              visible={isListVisible}
              renderItem={({item}) => (
                <Text style={{color: 'white'}}>{item.userEmail}</Text>
              )}
            />
          )}
          <GroupMessageView
            groupName={details.groupName}
            isLoading={isLoading}
          />
        </>
      ) : (
        <Text style={{color: 'white'}}>
          {' '}
          To participate in the group you need to JOIN
        </Text>
      )}
    </View>
  );
};

export default GroupDetails;
