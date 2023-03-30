import React, {useEffect, useState} from 'react';
import {View, Image, FlatList, Text, TouchableOpacity} from 'react-native';
import {POSTER_IMAGE} from '../config';
import {GET} from '../services/API';
import Styles from '../Styles';
import Loader from './Loader';

const TrendingMovies = props => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState();

  useEffect(() => {
    const getMovies = async () => {
      const data = await GET(props.url);
      setMovies(data.results);
      setLoading(false);
    };

    getMovies();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          <Text style={Styles.heading}>{props.title}</Text>
          <FlatList
            keyExtractor={item => item.id}
            data={movies}
            horizontal
            renderItem={({item}) => (
              <DisplayMovies
                isFromHomeScreen={props.isFromHomeScreen}
                item={item}
                navigation={props.navigation}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

const DisplayMovies = ({item, navigation, isFromHomeScreen}) => {
  const getMovieDetails = async item => {
    if (isFromHomeScreen) {
      navigation.navigate('movieDetails', {movieId: item.id});
    } else {
      navigation.push('movieDetails', {movieId: item.id});
    }
  };
  return (
    <View style={{marginBottom: 20}}>
      <TouchableOpacity
        style={{marginHorizontal: 10}}
        onPress={() => getMovieDetails(item)}>
        <Image
          source={{uri: `${POSTER_IMAGE}${item.poster_path}`}}
          style={Styles.posterImage}
        />
        <Text style={Styles.movieTitle}>{item.original_title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TrendingMovies;
