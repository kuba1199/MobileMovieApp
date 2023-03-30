import {API_KEY, BASE_URL} from '../config';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';

export const GET = async url => {
  const API_URL = `${BASE_URL}${url}?api_key=${API_KEY}`;

  let response = await fetch(API_URL, {method: `GET`});
  response = response.json();
  return response;
};
