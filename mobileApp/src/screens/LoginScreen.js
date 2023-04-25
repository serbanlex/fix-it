import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TextInput } from 'react-native';
import { Button } from 'native-base';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';

function LoginScreen({ }) {
  const navigation = useNavigation();

  const { control, handleSubmit, formState: { errors } } = useForm();

  console.log(errors);

  const onLogInPressed = async data => {
    navigation.navigate('Home');
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onRegisterPressed = () => {
    navigation.navigate('Register');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} >
      <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>
        <Button
          style={{ backgroundColor: '#00fff', position: 'absolute', top: 40, left: 20 }}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </Button>
        <CustomInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{ required: 'Username is required', minLength: { value: 3, message: 'Username must be at least 3 characters long' } }}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          secureTextEntry={true}
          control={control}
          rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters long' } }}
        />

        <CustomButton text="Log In" onPress={handleSubmit(onLogInPressed)} />
        <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="TERTIARY" />
        <CustomButton text="Don't have an account? Create One" onPress={onRegisterPressed} type="TERTIARY" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
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