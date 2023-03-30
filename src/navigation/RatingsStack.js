import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyRatingsScreen from '../screens/MyRatingsScreen';

const Stack = createNativeStackNavigator();

export default function RatingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="MyRatings"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="MyRatings"
        component={MyRatingsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
