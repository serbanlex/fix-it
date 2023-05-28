import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
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
    const [session, setSession] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/serviceCategories`, { headers: { 'Cache-Control': 'no-cache' } })
            .then(response => {
                if (!response.ok) {
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

    useEffect(() => {
        fetch(`${API_URL}/session`, { headers: { 'Cache-Control': 'no-cache' } })
            .then(response => {
                console.log("***********************" + response)
                if (!response.ok) {
                    console.log(response);
                    Alert.alert('Something went wrong', 'Failed to load session.');
                    throw new Error("Failed to load session.")
                }
                else {
                    return response.json();
                }
            })
            .then(data => {
                if (data) {
                    setSession(data);
                    console.log("Session: " +  data)
                }
            })
            .catch(error => console.error(error));
    }, []);

    console.log("Categories are set: " + categories)

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

    const onCategoryPressed = async (data) => {
        navigation.navigate('ServicesOfferer', data);
    }

    try {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Home</Text>
                <Text style={styles.subtitle}>Choose a category</Text>
                <Button
                style={{ backgroundColor: '#fffff', position: 'absolute', top: 50, left: 20 }}
                onPress={handleSubmit(onLogOutPressed)}
                >
                <Text style={styles.buttonText}>Log out</Text>
            </Button>
                <View>
                    <FlatList
                        data={categories}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => onCategoryPressed(item)}>
                              <ServiceCategory category={item} />
                            </TouchableOpacity>
                          )}
                        keyExtractor={item => item.ID.toString()}
                        numColumns={2}
                        columnWrapperStyle={styles.columnWrapper}
                        contentContainerStyle={styles.columnSpacer} 
                    />
                </View>

            </View>
        );
    }
    catch (err) {
        console.log("Error making categories: " + err)
    }

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
        marginBottom: 100,
    },
    subtitle: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 50,
    },
    buttonText: {
        color: '#43428b',
        fontWeight: 'bold',
        fontSize: 20,
    },
    columnWrapper: {
        flex: 1,
        justifyContent: 'space-between',
        marginHorizontal: '15%',
        marginBottom: '10%',
        marginTop: 10,

    },
    columnSpacer: {
        width: 400,
    },
});

export default HomeScreen;