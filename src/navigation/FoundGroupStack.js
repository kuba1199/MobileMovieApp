import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FoundGroupScreen from '../screens/FoundGroupScreen';
import GroupDetails from '../components/GroupDetails';
import GroupListView from '../components/GroupListView';
import GroupCreator from '../components/GroupCreator';

const Stack = createNativeStackNavigator();

export default function FoundGroupStack() {
  return (
    <Stack.Navigator
      initialRouteName="FoundGroupScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="FoundGroupScreen"
        component={FoundGroupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GroupDetails"
        component={GroupDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GroupList"
        component={GroupListView}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GroupCreator"
        component={GroupCreator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
