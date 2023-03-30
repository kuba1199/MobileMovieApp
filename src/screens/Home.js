import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import DiscoverMovies from '../components/DiscoverMovies';
import Styles from '../Styles';
import TrendingPeople from '../components/TrendingPeople';
import TrendingMovies from '../components/TrendingMovies';
import {firebase} from '@react-native-firebase/firestore';
import {Appbar, Button} from 'react-native-paper';
import Constants from '../Constants';
import auth from '@react-native-firebase/auth';

const Home = props => {
  const handleSignOut = async () => {
    const user = await firebase.auth().currentUser;
    if (user) {
      auth()
        .signOut()
        .then(
          () => props.navigation.navigate('Login'),
          console.log('Wylogowano'),
        );
    } else {
      props.navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Appbar.Header
          style={{
            backgroundColor: Constants.baseColor,
            alignContent: 'center',
            marginLeft: 10,
          }}>
          <View color={Constants.textColor}>
            <Button
              icon="logout"
              size={34}
              style={(color = 'white')}
              onPress={() => handleSignOut()}
            />
          </View>
          <Text
            style={{
              color: Constants.textColor,
              marginHorizontal: 85,
              fontWeight: '700',
              fontSize: 20,
            }}>
            MOVIES
          </Text>
        </Appbar.Header>
        <View style={Styles.sectionBg}>
          <DiscoverMovies navigation={props.navigation} />
          <TrendingPeople
            title="Trending People"
            url="/trending/person/week"
            navigation={props.navigation}
          />
          <TrendingMovies
            title="Top Rated Movies"
            url="/movie/top_rated"
            navigation={props.navigation}
            isFromHomeScreen={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
