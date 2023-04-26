import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { Button } from 'native-base';
import Logo from '../../assets/logo.png';

function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1622129710676-16a6b2014aec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }}
                style={styles.backgroundImage}
            >
                <View style={styles.overlay} />
                <Image source={Logo} style={styles.logo}></Image>
                <Text style={styles.title}>Welcome to FixIt!</Text>
                <Button style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Login</Text>
                </Button>
                <Button style={styles.button} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.buttonText}>Register</Text>
                </Button>
            </ImageBackground>

        </View>

    );
};

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
    backgroundImage: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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
    logo: {
        width: 200,
        height: 200,
    }
});

export default WelcomeScreen;
