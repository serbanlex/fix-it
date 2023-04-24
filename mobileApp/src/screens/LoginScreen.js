import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { Button } from 'native-base';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onLogInPressed = () => {
        console.warn('Log In Pressed');
    }
    const onForgotPasswordPressed = () => {
        console.warn('Forgot Password Pressed');
    }
    const onRegisterPressed = () => {
        console.warn('Register Pressed');
    }

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
            placeholder="Username"
            value={username}
            setValue={setUsername}
            />
            <CustomInput
            placeholder="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
            />

            <CustomButton text="Log In" onPress={onLogInPressed} />
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