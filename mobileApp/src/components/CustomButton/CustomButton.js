import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const CustomButton = ({onPress, text, type = "PRIMARY"}) => {
    return (
        <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]} >
            <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '95%',

        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 20,
    },

    container_PRIMARY: {
    backgroundColor: '#43428b',
    },

    container_TERTIARY: {

    },

    text: {
    fontWeight: 'bold',
    color: '#fff',
    },

    text_TERTIARY: {
    color: 'grey',
    },
});

export default CustomButton;