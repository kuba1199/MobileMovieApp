import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FoundGroupStack from './FoundGroupStack';
import RatingsStack from './RatingsStack';
import SearchScreen from '../screens/SearchScreen';
import Ionic from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';

const Tab = createBottomTabNavigator();
export default function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: true,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#F4C10F',
          height: 60,
        },
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
            size = focused ? size + 8 : size + 5;
          }  else if (route.name === 'FoundGroupTabStack') {
            iconName = focused ? 'people-sharp' : 'people-outline';
            size = focused ? size + 8 : size + 5;
          } else if (route.name === 'Ratings') {
            iconName = focused ? 'star-sharp' : 'star-outline';
            size = focused ? size + 8 : size + 5;
          } else if (route.name === 'SearchScreen') {
            iconName = focused ? 'search-sharp' : 'search-outline';
            size = focused ? size + 8 : size + 5;
          }
          return <Ionic name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="FoundGroupTabStack"
        component={FoundGroupStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Ratings"
        component={RatingsStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
