import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Button } from 'native-base';

function LoginScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>
            <Button
                style={{ backgroundColor: '#00fff', position: 'absolute', top: 40, left: 20 }}
                onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Back</Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    },
    buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    },
});

export default LoginScreen;