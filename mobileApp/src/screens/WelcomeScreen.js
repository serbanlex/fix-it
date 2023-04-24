import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Button } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen.js';

function HomeScreen({ navigation }) {
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
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}} />
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
        width: '80%',
        backgroundColor: '#fff',
        marginBottom: 20,
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;
