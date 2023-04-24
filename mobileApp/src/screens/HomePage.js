import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import CustomButton from '../components/CustomButton';
import {useNavigation } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';

function HomePage({}) {
    const {control, handleSubmit, formState: {errors}} = useForm();

    const navigation = useNavigation();

    const onLogOutPressed = () => {
            navigation.navigate('Start');
        }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Homepage</Text>
            <CustomButton text="Log Out" onPress={handleSubmit(onLogOutPressed)} />
        </View>
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
    color: '#43428b',
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 200,
    },
});

export default HomePage;