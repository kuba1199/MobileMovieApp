import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
} from 'react-native';
import {IMAGE_POSTER_URL} from '../config';
import Styles from '../Styles';
import Loader from './Loader';
import Icon from 'react-native-vector-icons/Feather';
import Constants from '../Constants';
import {GET} from '../services/API';
import TrendingMovies from './TrendingMovies';
import TrendingPeople from './TrendingPeople';
import RatingStars from './RatingStars';
import CommentsView from './CommentsView';
import auth from '@react-native-firebase/auth';
import {API_KEY} from '../config';

const MovieDetails = props => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState();

  const movieId = props.route.params.movieId;

  useEffect(() => {
    const getDetails = async () => {
      const data = await GET(`/movie/${movieId}`);
      setDetails(data);
      setLoading(false);
    };

    getDetails();
  }, []);

  const getGenre = () => {
    if (details && details.genres) {
      return details.genres.map(genre => (
        <View style={Styles.genreContainer}>
          <Text style={Styles.genre}>{genre.name}</Text>
        </View>
      ));
    } else {
      return null;
    }
  };

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
      <ScrollView style={Styles.sectionBg}>
        {loading ? (
          <Loader />
        ) : (
          <View>
            <View>
              <Image
                source={{uri: `${IMAGE_POSTER_URL}${details.backdrop_path}`}}
                style={Styles.imageBg}
              />
            </View>
            <Text style={Styles.detailsMovieTitle}>
              {details.original_title}
            </Text>
            {details.homepage ? (
              <View style={Styles.linkContainer}>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(details.homepage);
                  }}>
                  <Icon name="link" color={Constants.textColor} size={25} />
                </TouchableOpacity>
              </View>
            ) : null}
            <Text style={Styles.heading}>OVERVIEW</Text>
            <Text style={Styles.overview}>{details.overview}</Text>

            <View style={Styles.detailsContainer}>
              <View>
                <Text style={Styles.heading}>BUDGET</Text>
                <Text style={Styles.details}>{details.budget} $ </Text>
              </View>

              <View>
                <Text style={Styles.heading}>DURATION</Text>
                <Text style={Styles.details}>{details.runtime} min.</Text>
              </View>

              <View>
                <Text style={Styles.heading}>RELEASE DATE</Text>
                <Text style={Styles.details}>{details.release_date}</Text>
              </View>
            </View>
            <Text style={Styles.heading}>GENRE</Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              {getGenre()}
            </View>

            <TrendingPeople
              title="CAST"
              url={`/movie/${movieId}/credits`}
              isForPage="details"
              navigation={props.navigation}
            />

            <TrendingMovies
              title="SIMILAR MOVIES"
              navigation={props.navigation}
              url={`/movie/${movieId}/similar`}
              isFromHomeScreen={false}
            />
          </View>
        )}
      </ScrollView>
    );
  }

  return (
    <ScrollView style={Styles.sectionBg}>
      {loading ? (
        <Loader />
      ) : (
        <View>
          <View>
            <Image
              source={{uri: `${IMAGE_POSTER_URL}${details.backdrop_path}`}}
              style={Styles.imageBg}
            />
          </View>
          <Text style={Styles.detailsMovieTitle}>{details.original_title}</Text>
          {details.homepage ? (
            <View style={Styles.linkContainer}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(details.homepage);
                }}>
                <Icon name="link" color={Constants.textColor} size={25} />
              </TouchableOpacity>
            </View>
          ) : null}
          <View>
            <Text style={Styles.heading}>RATE MOVIE</Text>
            <RatingStars
              movieTitle={details.original_title}
              moviePhoto={`${IMAGE_POSTER_URL}${details.backdrop_path}`}
              movieId={movieId}
            />
          </View>
          <Text style={Styles.heading}>OVERVIEW</Text>
          <Text style={Styles.overview}>{details.overview}</Text>

          <View style={Styles.detailsContainer}>
            <View>
              <Text style={Styles.heading}>BUDGET</Text>
              <Text style={Styles.details}>{details.budget} $ </Text>
            </View>

            <View>
              <Text style={Styles.heading}>DURATION</Text>
              <Text style={Styles.details}>{details.runtime} min.</Text>
            </View>

            <View>
              <Text style={Styles.heading}>RELEASE DATE</Text>
              <Text style={Styles.details}>{details.release_date}</Text>
            </View>
          </View>
          <Text style={Styles.heading}>GENRE</Text>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            {getGenre()}
          </View>

          <TrendingPeople
            title="CAST"
            url={`/movie/${props.route.params.movieId}/credits`}
            isForPage="details"
            navigation={props.navigation}
          />

          <TrendingMovies
            title="SIMILAR MOVIES"
            navigation={props.navigation}
            url={`/movie/${props.route.params.movieId}/similar`}
            isFromHomeScreen={false}
          />
          <CommentsView movieTitle={details.original_title} />
        </View>
      )}
    </ScrollView>
  );
};

export default MovieDetails;
