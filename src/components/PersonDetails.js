import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {GET} from '../services/API';
import Styles from '../Styles';
import Loader from './Loader';
import {IMAGE_POSTER_URL} from '../config';

const PersonDetails = props => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState();

  useEffect(() => {
    const getDetails = async () => {
      const data = await GET(`/person/${props.route.params.personId}`);
      setDetails(data);
      setLoading(false);
    };

    getDetails();
  }, []);

  return (
    <ScrollView style={Styles.sectionBg}>
      {loading ? (
        <Loader />
      ) : (
        <View>
          <Image
            source={{uri: `${IMAGE_POSTER_URL}${details.profile_path}`}}
            style={Styles.imagePerson}
          />
          <Text style={Styles.detailsPersonName}>{details.name}</Text>
          <View style={Styles.detailsContainer}>
            <View>
              <Text style={Styles.heading}>DATE OF BIRTH</Text>
              <Text style={Styles.details}>
                {details.birthday} - {details.deathday}
              </Text>
            </View>

            <View>
              <Text style={Styles.heading}>PLACE OF BIRTH</Text>
              <Text style={Styles.details}>{details.place_of_birth}</Text>
            </View>
          </View>
          <View>
            <Text style={Styles.biographyHeading}>BIOGRAPHY</Text>
            <Text style={Styles.biographyText}>{details.biography}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default PersonDetails;
