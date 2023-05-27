import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { API_URL } from '@env';
import ServiceCategory from '../components/ServiceCategory';

if (!API_URL) {
    API_URL = "http://192.168.100.71:3000";
}

function HomeScreen({ }) {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/serviceCategories`, { headers: { 'Cache-Control': 'no-cache' } })
            .then(response => {
                if (!response.ok) {
                    console.log(response);
                    Alert.alert('Something went wrong', 'Failed to load service categories.');
                    throw new Error("Failed to load service categories.")
                }
                else {
                    return response.json();
                }
            })
            .then(data => {
                if (data) {
                    setCategories(data);
                }
            })
            .catch(error => console.error(error));
    }, []);



    console.log("Categories are set: " + categories)

    const navigation = useNavigation();

    try {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Homepage</Text>
                {/* TODO: this logout should be more like back button */}
                <CustomButton text="Log Out" onPress={handleSubmit(onLogOutPressed)} />
                <View>
                    <FlatList
                        data={categories}
                        renderItem={({ item }) => <ServiceCategory category={item} />}
                        keyExtractor={item => item.ID.toString()}
                    />
                </View>

            </View>
        );
    }
    catch (err) {
        console.log("Error making categories: " + err)
    }

}

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

export default HomeScreen;