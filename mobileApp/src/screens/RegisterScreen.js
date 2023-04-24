import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { Button } from 'native-base';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const onRegisterPressed = () => {
        console.warn('Register Pressed');
    }

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
            placeholder="Username"
            value={username}
            setValue={setUsername}
            />
            <CustomInput
            placeholder="Email"
            value={email}
            setValue={setEmail}
            />
            <CustomInput
            placeholder="Phone Number"
            value={phoneNumber}
            setValue={setPhoneNumber}
            />
            <CustomInput
            placeholder="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
            />

            <CustomButton text="Register" onPress={onRegisterPressed} />
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