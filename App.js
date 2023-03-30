import React, {useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyRatingsScreen from './src/screens/MyRatingsScreen';
import LoginScreen from './src/screens/LoginScreen';
import MovieDetails from './src/components/MovieDetails';
import PersonDetails from './src/components/PersonDetails';
import FoundGroupScreen from './src/screens/FoundGroupScreen';
import SearchScreen from './src/screens/SearchScreen';
import TabNav from './src/navigation/TabNav';
import {RatingContext} from './src/context/ratingContext';
import {SubscriptionContext} from './src/context/subscriptionContext';
const Stack = createNativeStackNavigator();

function App() {
  const [isRatingWasAdded, setRatingWasAdded] = useState(false);
  const [isSubscriptionUpdate, setSubscriptionUpdate] = useState(false);
  return (
    <RatingContext.Provider value={{isRatingWasAdded, setRatingWasAdded}}>
      <SubscriptionContext.Provider
        value={{isSubscriptionUpdate, setSubscriptionUpdate}}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="TabNav"
              component={TabNav}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="FoundGroup"
              component={FoundGroupScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="movieDetails"
              component={MovieDetails}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="personDetails"
              component={PersonDetails}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyRatings"
              component={MyRatingsScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SubscriptionContext.Provider>
    </RatingContext.Provider>
  );
}

export default App;
