import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Alert } from 'react-native';
import { Button } from 'native-base';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import GradientBackground from '../../components/GradientBackground2';
import { REACT_APP_API_URL } from '@env';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

if (!REACT_APP_API_URL) {
  REACT_APP_API_URL = "http://192.168.0.188:3000";
}

const RegisterScreen = ({ route }) => {
  const navigation = useNavigation();
  const role = route.params.role;
  const [genericUserData, setGenericUserData] = useState('');
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch('password');

  const onNextPressed = (data) => {
    setGenericUserData(data);
    console.log("########", genericUserData);
    console.log("########", data);
    navigation.navigate('RegisterOfferer', { data: data });
  };

  const onRegisterPressed = async data => {
    try {
      const response = await fetch(`${REACT_APP_API_URL}/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        navigation.navigate('SuccessfulLogin');
      } else {
        console.log(response);
        const errorResponse = await response.json();
        console.log(errorResponse);
        Alert.alert('Registration Error', `Failed to register client. Reason: ${errorResponse.error}`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Registration Error', 'Failed to register client.');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <GradientBackground>
          <Button
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>{"<"} Back
            </Text>
          </Button>
          <Text style={styles.title}>Register</Text>

          <CustomInput
            name="firstName"
            control={control}
            placeholder="First Name"
            rules={{
              required: 'First Name is required',
              minLength: { value: 3, message: 'First Name must be at least 3 characters long' },
              maxLength: { value: 21, message: 'First Name must be at most 21 characters long' }
            }}
          />
          <CustomInput
            name="lastName"
            control={control}
            placeholder="Last Name"
            rules={{
              required: 'Last Name is required',
              minLength: { value: 3, message: 'Last Name must be at least 3 characters long' },
              maxLength: { value: 21, message: 'Last Name must be at most 21 characters long' }
            }}
          />
          <CustomInput
            name="email"
            control={control}
            placeholder="Email"
            rules={{
              required: 'Email is required',
              pattern: { value: EMAIL_REGEX, message: 'Invalid email address' }
            }}
          />
          <CustomInput
            name="phoneNumber"
            control={control}
            placeholder="Phone Number"
            rules={{ required: 'Phone Number is required' }}
          />
          <CustomInput
            name="password"
            control={control}
            placeholder="Password"
            secureTextEntry={true}
            rules={{
              required: 'Password is required',
              minLength: { value: 3, message: 'Password must be at least 3 characters long' },
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
          {role === "serviceOfferer" && (
            <>
              <CustomButton text="Next" onPress={handleSubmit(onNextPressed)} />
            </>
          )}

          {role === "client" && (
            <>
              <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)} />
            </>
          )}

        </GradientBackground>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#fff',
    zIndex: 1,
    alignSelf: 'flex-start'
  },
  contentContainer: {
    flexGrow: 1,
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
