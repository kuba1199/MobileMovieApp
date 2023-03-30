import {View, Text, Image, ScrollView, Pressable} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Styles from '../Styles';
import {Appbar, Divider} from 'react-native-paper';
import React, {useEffect, useState, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/firestore';
import Ionic from 'react-native-vector-icons/Ionicons';
import Constants from '../Constants';
import {RatingContext} from '../context/ratingContext';
import auth from '@react-native-firebase/auth';

const MyRatingsScreen = props => {
  const [data, setData] = useState([]);
  const {isRatingWasAdded} = useContext(RatingContext);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const currentUser = firebase.auth().currentUser;
        const querySnapshot = await firestore()
          .collection('rating')
          .where('userId', '==', currentUser.uid)
          .get();
        const userData = querySnapshot._docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(userData);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [isRatingWasAdded]);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

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
    <SafeAreaView style={Styles.sectionBg}>
      <Appbar.Header
        style={{
          backgroundColor: '#F4C10F',
        }}
        mode="center-aligned">
        <Appbar.Content
          title="My Ratings"
          color="black"
          style={{fontWeight: '700', fontSize: 20}}
        />
      </Appbar.Header>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        ListFooterComponent={<View style={{height: 70}} />}
        scrollEnabled={true}
        renderItem={({item}) => (
          <RatedMovie
            moviePhoto={item.moviePhoto}
            movieTitle={item.movieTitle}
            rating={item.rating}
            movieId={item.movieId}
            navigation={props.navigation}
          />
        )}
      />
    </SafeAreaView>
  );
};

const RatedMovie = ({moviePhoto, movieTitle, rating, movieId, navigation}) => {
  return (
    <Pressable
      style={Styles.ratingItem}
      onPress={() =>
        navigation.navigate('movieDetails', {
          movieId: movieId,
        })
      }>
      <Image source={{uri: moviePhoto}} style={Styles.rateImage} />
      <Text style={{color: 'white', marginLeft: 20}}>
        {movieTitle} {'\n'} {'\n'}
        {rating}/10 <Ionic name="star" color="yellow" />
      </Text>
    </Pressable>
  );
};

export default MyRatingsScreen;
