import * as React from 'react';
import {View, Text} from 'react-native';
import {Rating} from 'react-native-ratings';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {useState, useEffect, useContext} from 'react';
import {RatingContext} from '../context/ratingContext';

const RatingStars = props => {
  const [rate, setRated] = useState();
  const {setRatingWasAdded, isRatingWasAdded} = useContext(RatingContext);

  useEffect(() => {
    const getData = async () => {
      let movieRated = 5;
      const user = await firebase.auth().currentUser;
      if (user) {
        const result = await firestore()
          .collection('rating')
          .where('userId', '==', user.uid)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(elem => {
              const movieData = elem.data();
              if (movieData.movieTitle === props.movieTitle) {
                movieRated = movieData.rating;
              }
            });
          });
      }
      setRated(movieRated);
    };
    getData();
  }, []);

  async function saveRating(rating = 1) {
    let isFilmWasRated = false;
    let documentId = '';
    const user = firebase.auth().currentUser;

    if (user) {
      await firestore()
        .collection('rating')
        .where('userId', '==', user.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(elem => {
            const docData = elem.data();
            if (docData.movieTitle === props.movieTitle) {
              isFilmWasRated = true;
              documentId = docData.docId;
            }
          });
        });
    }
    if (isFilmWasRated) {
      await firestore().collection('rating').doc(documentId).update({
        rating: rating,
        docId: documentId,
      });
    } else {
      const docId = uuid.v4();
      await firestore().collection('rating').doc(docId).set({
        userId: user.uid,
        rating: rating,
        movieTitle: props.movieTitle,
        moviePhoto: props.moviePhoto,
        docId: docId,
        movieId: props.movieId,
      });
    }
    setRatingWasAdded(!isRatingWasAdded);
    setRated(rating);
  }

  return (
    <Rating
      type="star"
      ratingCount={10}
      startingValue={rate}
      imageSize={35}
      showRating
      onFinishRating={saveRating}
      tintColor="#151C26"
    />
  );
};

export default RatingStars;
