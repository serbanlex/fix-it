import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { API_URL } from '@env';

function HomePage({ }) {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const navigation = useNavigation();

    const onLogOutPressed = async () => { //fetch request to log out
        await fetch(`${API_URL}/session`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            navigation.navigate('Start');
        })
            .catch(error => {
                console.error(error);
                Alert.alert('Logout Error', 'Failed to logout user.');
            });
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