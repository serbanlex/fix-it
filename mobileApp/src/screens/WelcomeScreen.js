import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Button } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen.js';
import SuccessfulLoginScreen from './SuccessfulLoginScreen.js';
import RegisterScreen from './RegisterScreen.js';
import HomePage from './HomePage.js';
import ForgotPasswordScreen from './ForgotPasswordScreen.js';
import NewPasswordScreen from './NewPasswordScreen.js';

function StartScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.overlay} />
            <Text style={styles.title}>Welcome to Fix-It!</Text>
            <Button style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Login</Text>
            </Button>
            <Button style={styles.button} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.buttonText}>Register</Text>
            </Button>
        </View>
    );
};

const Stack = createNativeStackNavigator();

function WelcomeScreen() {
  return (
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}} />
      <Stack.Screen name="SuccessfulLogin" component={SuccessfulLoginScreen} options={{ headerShown: false}} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false}} />
      <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false}} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false}} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{ headerShown: false}} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#43428b',
    },
    overlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
        fontSize: 36,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 200,
        textAlign: 'center',
    },
    button: {
        width: '90%',
        backgroundColor: '#fff',
        marginBottom: 20,
        justifyContent: 'center',
        borderRadius: 20,
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;
