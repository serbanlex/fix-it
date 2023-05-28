import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { API_URL } from '@env';
import OfferedService from '../../components/OfferedService';

if (!API_URL) {
    API_URL = "http://192.168.100.71:3000";
}
console.log(API_URL)
function OfferedServicesScreen({ route }) {
    const [offeredServices, setOfferedServices] = useState([]);
    const serviceID = route.params.item.ID;
    const serviceName = route.params.item.name;
    console.log(serviceID);

    useEffect(() => {
        fetch(`${API_URL}/offeredServices/service/${serviceID}`, { headers: { 'Cache-Control': 'no-cache' } })
            .then(response => {
                if (!response.ok) {
                    console.log("Something went wrong: " + JSON.stringify(response));
                    Alert.alert('Something went wrong', 'Failed to load services.');
                    throw new Error("Failed to load services. A network error may have occurred.")
                }
                else {
                    return response.json();
                }
            })
            .then(data => {
                if (data) {
                    setOfferedServices(data);
                }
            })
            .catch(error => console.error(error));
    }, []);



    console.log(`Offered services for service ID '${serviceID}': ${offeredServices}`)

    const navigation = useNavigation();

    const onServicePressed = async (data) => {
        console.log("Service pressed, order data: " + JSON.stringify(data))
        navigation.navigate('OrderService', { data: data });
    }

    try {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Service offerers good at {serviceName.toLowerCase()}</Text>
                <Button
                    style={{ backgroundColor: '#00fff', position: 'absolute', top: 40, left: 20 }}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Back</Text>
                </Button>
                <View>
                    <FlatList
                        data={offeredServices}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => onServicePressed(item)}>
                                {
                                    <OfferedService
                                        price={item.price}
                                        serviceOfferer={item.ServiceOfferer}
                                        service={item.Service}
                                    />
                                }
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.ID.toString()}
                        contentContainerStyle={styles.listContainer}
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
        color: '#000',
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 150,
    },
    buttonText: {
        color: '#43428b',
        fontWeight: 'bold',
        fontSize: 20,
    },
    listContainer: {
        flex: 1,
        marginBottom: '10%',
        marginTop: 10,

    },
});

export default OfferedServicesScreen;