import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { REACT_APP_API_URL } from '@env';


const RegisterOffererScreen = ({ route }) => {
  const { control, handleSubmit, watch } = useForm();
  const genericUserData = route.params.data;
  const navigation = useNavigation();

  const onRegisterPressed = async data => {
    data = { ...genericUserData, ...data };
    delete data['password-repeat'];
    console.log(data)
    try {
      const response = await fetch(`${REACT_APP_API_URL}/serviceOfferers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        navigation.navigate('SuccessfulLogin');
      } else {
        const errorResponse = await response.json();
        console.log(errorResponse);
        Alert.alert('Registration Error', `Failed to register service offerer. Reason: ${errorResponse.error}`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Registration Error', 'Failed to register service offerer.');
    }
  };


  return (
    <View style={styles.container}>
        <Text style={styles.title}>Some last details...</Text>
      <CustomInput
        name="firmName"
        control={control}
        placeholder="Firm Name"
        rules={{
          required: 'Firm name is required',
        }}
      />
      <CustomInput
        name="firmCity"
        control={control}
        placeholder="Firm City"
        rules={{
          required: 'Firm city is required',
        }}
      />
      <CustomInput
        name="firmAddress"
        control={control}
        placeholder="Firm Address"
        rules={{
          required: 'Firm address is required',
        }}
      />
      <CustomInput
        name="CUI"
        control={control}
        placeholder="CUI"
        rules={{
          required: 'CUI is required',
        }}
      />
      <CustomInput
        name="CAEN"
        control={control}
        placeholder="CAEN"
        rules={{
          required: 'CAEN is required',
        }}
      />


      <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 36,
    }
});

export default RegisterOffererScreen;
