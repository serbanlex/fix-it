import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Alert } from 'react-native';
import { Button } from 'native-base';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {useNavigation } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function RegisterScreen({}) {
    const navigation = useNavigation();

    const {control, handleSubmit, watch} = useForm();
    const pwd = watch('password');

    const onRegisterPressed = async data => {
      try {
        const response = await fetch('http://192.168.100.70:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          // Registration successful, navigate to confirmation screen
          navigation.navigate('ConfirmEmail');
        } else {
          // Registration failed, show error message
          Alert.alert('Registration Error', 'Failed to register user.');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Registration Error', 'Failed to register user.');
      }
    };

    return (
    <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <Button
                style={{ backgroundColor: '#00fff', position: 'absolute', top: 40, left: 20 }}
                onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Back</Text>
            </Button>
            <CustomInput
            name="username"
            control={control}
            placeholder="Username"
            rules={{required: 'Username is required',
                    minLength: {value: 3, message: 'Username must be at least 3 characters long'},
                    maxLength: {value: 21, message: 'Username must be at most 21 characters long'}
            }}
            />
            <CustomInput
            name="email"
            control={control}
            placeholder="Email"
            rules={{required: 'Email is required',
                    pattern: {value: EMAIL_REGEX, message: 'Invalid email address'}
            }}
            />
            <CustomInput
            name="phoneNumber"
            control={control}
            placeholder="Phone Number"
            rules={{required: 'Phone Number is required'}}
            />
            <CustomInput
            name="password"
            control={control}
            placeholder="Password"
            secureTextEntry={true}
            rules={{required: 'Password is required',
                    minLength: {value: 8, message: 'Password must be at least 8 characters long'},
            }}
            />
            <CustomInput
            name="password-repeat"
            control={control}
            placeholder="Repeat Password"
            secureTextEntry={true}
            rules={{
                validate: value =>
                    value == pwd || 'Passwords do not match',
            }}
            />

            <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)} />
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

export default RegisterScreen;