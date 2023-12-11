import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, Alert, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { REACT_APP_API_URL } from '@env';
import OfferedService from '../../components/OfferedService';


console.log(REACT_APP_API_URL)

function OfferedServicesScreen({ route }) {
    const [offeredServices, setOfferedServices] = useState([]);
    const [reviews, setReviews] = useState([]);
    const serviceID = route.params.item.ID;
    const serviceName = route.params.item.name;

    useEffect(() => {
        fetch(`${REACT_APP_API_URL}/offeredServices/service/${serviceID}`, { headers: { 'Cache-Control': 'no-cache' } })
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


    useEffect(() => {
        fetch(`${REACT_APP_API_URL}/reviews/service/${serviceID}`, { headers: { 'Cache-Control': 'no-cache' } })
            .then(response => {
                if (!response.ok) {
                    console.log("Something went wrong: " + JSON.stringify(response));
                    Alert.alert('Something went wrong', 'Failed to load reviews.');
                    throw new Error("Failed to load reviews. A network error may have occurred.")
                }
                else {
                    return response.json();
                }
            })
            .then(data => {
                if (data) {
                    setReviews(data);
                }
            })
            .catch(error => console.error(error));
    }, []);

    console.log(`Offered services for service ID '${serviceID}': ${JSON.stringify(offeredServices)}`);
    console.log(`Reviews for service ID '${serviceID}': ${JSON.stringify(reviews)}`);

    const navigation = useNavigation();

    const onServicePressed = async (data) => {
        console.log("Service pressed, order data: " + JSON.stringify(data))
        navigation.navigate('OfferedService', { data: data });
    }

    const renderOfferedService = (item) => (
        <TouchableOpacity style={{width: '100%'}} key={item.ID} onPress={() => onServicePressed(item)}>
            <OfferedService
                price={item.price}
                serviceOfferer={item.ServiceOfferer}
                service={item.Service}
                reviews={reviews.reduce((accumulator, review) => {
                    if (review.Order.OfferedServiceID === item.ID) {
                        return review;
                    } else {
                        return accumulator;
                    }
                }, null)}
            />
        </TouchableOpacity>
    );

    try {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>{"<"} Back
                    </Text>
                </TouchableOpacity>

                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Service offerers good at {serviceName.toLowerCase()}</Text>

                    {offeredServices.map((service) => renderOfferedService(service))}
                </View>
            </ScrollView>
        );

    }
    catch (err) {
        console.log("Error making service offerers view: " + err)
    }

}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: '10%',
        justifyContent: 'flex-start',
    },
    backButton: {
        backgroundColor: '#00fff',
        zIndex: 1,
        alignSelf: 'flex-start'
    },
    buttonText: {
        color: '#43428b',
        fontWeight: 'bold',
        fontSize: 20,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: '10%',
    },
    title: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: '5%',
    },
});



export default OfferedServicesScreen;