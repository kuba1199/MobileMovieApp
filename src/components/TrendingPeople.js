import React, {useEffect, useState} from 'react';
import {View, Image, FlatList, Text, TouchableOpacity} from 'react-native';
import {IMAGE_POSTER_URL} from '../config';
import {GET} from '../services/API';
import Styles from '../Styles';
import Loader from './Loader';
import uuid from 'react-native-uuid';

const TrendingPeople = props => {
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState();

  useEffect(() => {
    const getPeople = async () => {
      const data = await GET(props.url);
      setPeople(props.isForPage === 'details' ? data.cast : data.results);
      setLoading(false);
    };

    getPeople();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          <Text style={Styles.heading}>{props.title}</Text>
          <FlatList
            keyExtractor={item => uuid.v4()}
            data={people}
            renderItem={item => displayPeople(item, props)}
            horizontal
          />
        </View>
      )}
    </View>
  );
};

const displayPeople = ({item}, props) => {
  return (
    <TouchableOpacity
      style={Styles.trendingPeopleContainer}
      onPress={() => {
        props.navigation.navigate('personDetails', {personId: item.id});
      }}>
      <View>
        <Image
          source={{uri: `${IMAGE_POSTER_URL}${item.profile_path}`}}
          style={Styles.trendingPeopleImage}
        />
        <Text style={Styles.trendingPeopleName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TrendingPeople;
