import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import GroupListView from '../components/GroupListView';
import Styles from '../Styles';
import {FAB} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const FoundGroupScreen = props => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  //to tez
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  // to tez
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  // to tez
  if (initializing) return null;
  // to tez
  if (!user) {
    return (
      <>
        <View
          style={[
            Styles.sectionBg,
            {flex: 1, justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text style={{color: 'white'}}>
            You must be logged in to see the content!
          </Text>
        </View>
      </>
    );
  }

  return (
    <View style={[Styles.sectionBg, {flex: 1}]}>
      <View>
        <FAB
          icon="plus"
          onPress={() => props.navigation.navigate('GroupCreator')}
          style={{position: 'absolute', right: 20, top: 580, borderRadius: 50}}
          size="medium"
        />
        <GroupListView navigation={props.navigation} />
      </View>
    </View>
  );
};

export default FoundGroupScreen;
