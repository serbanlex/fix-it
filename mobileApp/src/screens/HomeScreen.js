import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { API_URL } from '@env';
import ServiceCategory from '../components/ServiceCategory';

API_URL="http://192.168.100.71:3000";

function HomeScreen({ }) {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories from the API endpoint
        fetch(`${API_URL}/serviceCategories`)
        .then(response => response.json())
        .then(data => setCategories(data))
        .catch(error => console.error(error));
    }, []);

    console.log(categories)

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