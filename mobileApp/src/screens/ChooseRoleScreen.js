import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomRadioGroup from '../components/CustomRadioGroup';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import GradientBackground from '../components/GradientBackground2';
import { Radio } from 'native-base';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function ChooseRoleScreen({ }) {
  const navigation = useNavigation();
  const [role, setRole] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm();

  console.log(errors);
  const handleRadioChange = (value) => {
    setRole(value);
  }

  const onNextPressed = async (data) => {
    navigation.navigate('Register', { role: role });
  };


  return (
    <View style={styles.container}>
    <GradientBackground>
        <Text style={styles.title}>Register as</Text>
        <Button
          style={{ backgroundColor: '#00fff', position: 'absolute', top: 40, left: 20 }}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </Button>

        <View style={styles.radioContainer}>
            <Radio.Group
              name="chooseRoleRadioGroup"
              value={role}
              onChange={handleRadioChange}
            >
              <Radio value="client" my="5">
                <Text> Client </Text>
              </Radio>
              <Radio value="serviceOfferer" my="5">
                <Text> Service offerer </Text>
              </Radio>
            </Radio.Group>
          </View>

        <CustomButton text="Next" onPress={handleSubmit(onNextPressed)} />
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
  },
  buttonText: {
    color: '#43428b',
    fontWeight: 'bold',
    fontSize: 20,
  },
    radioContainer: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default ChooseRoleScreen;