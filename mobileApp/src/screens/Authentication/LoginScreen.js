import React, { useState, Component, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import GradientBackground from '../../components/GradientBackground2';
import { API_URL } from '@env';

if (!API_URL) {
  API_URL = "http://192.168.100.71:3000";
}
console.log(API_URL)
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function LoginScreen({ }) {
  const navigation = useNavigation();

  const { control, handleSubmit, formState: { errors } } = useForm();

  console.log(errors);

  useEffect(() => {
    console.log("Checking if already authorized with url " + API_URL)
    fetch(`${API_URL}/session`, { headers: { 'Cache-Control': 'no-cache' } })
      .then(response => {
        if (response.ok) {
          console.log("Already authorized. Going to home page")
          navigation.navigate('Home');
        } else {
          console.log("Not authorized. Staying on login page")
        }
      })
      .catch(error => console.error(error));
  }, []);

  const onLogInPressed = async (data) => {
    await fetch(`${API_URL}/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        } else {
          if (response.status === 401) {
            Alert.alert('Login Error', 'Invalid credentials.');
          }
          else {
            console.log(response)
            response = response.json();
            Alert.alert('Login Error', 'Failed to login user. Reason: ' + response.message);
          }
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Login Error', 'Something went wrong.');
      });
  };

  const onRegisterPressed = () => {
    navigation.navigate('ChooseRole');
  };

  return (
    <View style={styles.container}>
      <GradientBackground>
        <Text style={styles.title}>Log In</Text>
        <Button
          style={{ backgroundColor: '#00fff', position: 'absolute', top: 40, left: 20 }}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </Button>
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
        <TouchableOpacity onPress={onRegisterPressed}>
          <Text style={{ color: 'grey', fontWeight: 'bold', textDecorationLine: 'underline', padding: '3%' }}>{"Don't have an account? Create One"}</Text>
        </TouchableOpacity>
      </GradientBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 50,
  },
  buttonText: {
    color: '#43428b',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default LoginScreen;