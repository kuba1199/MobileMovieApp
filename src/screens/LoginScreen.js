import React from 'react';
import {
  useState,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import Styles from '../Styles';
import auth from '@react-native-firebase/auth';

const LoginScreen = props => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();

  const navigation = useNavigation();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  auth().onAuthStateChanged(function (user) {
    if (user) {
      navigation.navigate('TabNav');
    }
  });

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Registered by: ', email);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Error', 'That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'That email address is invalid!');
        }

        console.error(error);
      });
  };

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Logged as: ', email);
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'That email address is invalid!');
        } else if (error.code === 'auth/wrong-password') {
          Alert.alert('Error', 'Invalid password!');
        }
        console.error(error);
      });
  };
  return (
    <KeyboardAvoidingView style={Styles.loginContainer}>
      <View style={Styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={Styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={Styles.input}
          secureTextEntry
        />
      </View>

      <View style={Styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={Styles.button}>
          <Text style={Styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[Styles.button, Styles.buttonOutline]}>
          <Text style={Styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TabNav')}
          style={[
            Styles.button,
            Styles.buttonOutline,
            {backgroundColor: 'grey', borderWidth: 0},
          ]}>
          <Text style={[Styles.buttonOutlineText, {color: 'white'}]}>
            Login without registration
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
