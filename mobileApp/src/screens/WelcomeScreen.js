import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { Button } from 'native-base';
import Logo from '../../assets/logo.png';
import Background from '../../assets/background-welcome-2.jpg';
import GradientBackground from '../components/GradientBackground';
import CustomButton from '../components/CustomButton';

function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <GradientBackground>
                <Image source={Logo} style={styles.logo}></Image>
                <Text style={styles.title}>Welcome to FixIt!</Text>
                <CustomButton onPress={() => navigation.navigate('Login')} text="Login" type="Welcome"></CustomButton>
                <CustomButton onPress={() => navigation.navigate('ChooseRole')} text="Register" type="Welcome"></CustomButton>
            </GradientBackground>
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
