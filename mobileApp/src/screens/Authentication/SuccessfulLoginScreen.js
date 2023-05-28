import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TextInput, Alert } from 'react-native';
import { Button } from 'native-base';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import GradientBackground from '../../components/GradientBackground2';
import { API_URL } from '@env';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

if (!API_URL) {
  API_URL = "http://192.168.100.71:3000";
}

function SuccessfulLoginScreen({ }) {
  const navigation = useNavigation();

  const { control, handleSubmit, formState: { errors } } = useForm();

  console.log(errors);

  const onLogInPressed = async (data) => {
    console.log(API_URL)
    await fetch(`${API_URL}/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        console.log(response)
        if (response.ok) {
          navigation.navigate('Home');
        } else {
          if (response.status === 401) {
            Alert.alert('Login Error', 'Invalid credentials.');
          }
          else {
            const response = response.json();
            Alert.alert('Login Exception', 'Failed to login user.' + response);
          }
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Something went wrong', 'Failed to login user due to an unexpected error.');
      });
  };

  const onRegisterPressed = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <GradientBackground>
        <Text style={styles.title}>
          Register successful! {'\n'}
          Please log in with your credentials
        </Text>
        <CustomInput
          name="email"
          placeholder="email"
          control={control}
          rules={{ required: 'Email is required', pattern: { value: EMAIL_REGEX, message: 'Not a valid email' } }}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          secureTextEntry={true}
          control={control}
          rules={{ required: 'Password is required', minLength: { value: 3, message: 'Password must be at least 3 characters long' } }}
        />

        <CustomButton text="Log In" onPress={handleSubmit(onLogInPressed)} />
        <CustomButton text="Don't have an account? Create One" onPress={onRegisterPressed} type="TERTIARY" />
      </GradientBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    paddingTop: "10%",
    color: '#000',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 50,
  },
  buttonText: {
    color: '#43428b',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default SuccessfulLoginScreen;