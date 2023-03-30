import * as React from 'react';
import {View, Text, FlatList, Image, Pressable} from 'react-native';
import {POSTER_IMAGE} from '../config';
import Styles from '../Styles';
import {Searchbar} from 'react-native-paper';
import {useState} from 'react';
import Loader from '../components/Loader';
import {BASE_URL, API_KEY} from '../config';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SearchScreen = props => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);

  const onChangeSearch = query => {
    setSearchQuery(query);
    setIsLoading(true);
  };

  const submitHandler = async () => {
    setIsLoading(true);
    const API_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&`;

    const result = await fetch(
      API_URL +
        new URLSearchParams({
          query: searchQuery,
        }),
    ).then(response => response.json());

    setSearchData(result.results);
    setIsLoading(!isLoading);
    setSearchQuery('');
  };

  return (
    <View style={[Styles.sectionBg, {flex: 1, alignItems: 'center'}]}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        onSubmitEditing={submitHandler}
        value={searchQuery}
        style={{marginTop: 10, width: '95%'}}
      />
      {isLoading ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Loader />
        </View>
      ) : searchData ? (
        <FlatList
          data={searchData}
          renderItem={({item}) => (
            <Pressable
              style={Styles.ratingItem}
              onPress={() =>
                props.navigation.navigate('movieDetails', {
                  movieId: item.id,
                })
              }>
              <Image
                source={{uri: `${POSTER_IMAGE}${item.poster_path}`}}
                style={Styles.searchImage}
              />
              <Text
                style={{
                  color: 'white',
                  marginLeft: 10,
                  textAlignVertical: 'center',
                  fontSize: 18,
                }}>
                {item.original_title} {'\n'}
                <Text style={{fontSize: 13}}>{item.release_date}</Text>
              </Text>
            </Pressable>
          )}
        />
      ) : null}
    </View>
  );
};

export default SearchScreen;
