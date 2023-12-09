import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Alert, TouchableOpacity, Modal } from 'react-native';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { REACT_APP_API_URL } from '@env';
import GradientBackground from '../../components/GradientBackground2';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Services from '../../components/Services';

if (!REACT_APP_API_URL) {
    REACT_APP_API_URL = "http://192.168.0.188:3000";
}

console.log(REACT_APP_API_URL)

function ServicesOffererScreen({ route }) {
    const { control, handleSubmit, formState: { errors }, watch } = useForm();
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [serviceOffererID, setServiceOffererID] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const priceValue = watch('price');
    const category = route.params.name;
    console.log(category);

    useEffect(() => {
        fetch(`${REACT_APP_API_URL}/services`, { headers: { 'Cache-Control': 'no-cache' } })
            .then(response => {
                if (!response.ok) {
                    Alert.alert('Something went wrong', 'Failed to load services.');
                    throw new Error("Failed to load services.")
                }
                else {
                    return response.json();
                }
            })
            .then(data => {
                if (data) {
                    setServices(data);
                }
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        fetch(`${REACT_APP_API_URL}/session`, { headers: { 'Cache-Control': 'no-cache' } })
            .then(response => {
                if (!response.ok) {
                    Alert.alert('Something went wrong', 'Failed to load services.');
                    throw new Error("Failed to load services.")
                }
                else {
                    return response.json();
                }
            })
            .then(data => {
                if (data) {
                    setServiceOffererID(data.ID)
                }
            })
            .catch(error => console.error(error));
    }, []);


    const navigation = useNavigation();

    const onSavePressed = async (data) => {
        try {
            if (selectedService === null) {
                // Handle the case when no service is selected
                Alert.alert('Service not selected', 'Please select a service.');
                return;
            }

            const requestData = {
                serviceOffererID: serviceOffererID,
                serviceID: selectedService.ID,
                price: priceValue, // Use the captured price from the form
            }
            const response = await fetch(`${REACT_APP_API_URL}/offeredServices`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                setShowModal(true);

            } else {
                const errorResponse = await response.json();
                console.log(errorResponse);
                //asuming that response is returning 500 also because it has been added before
                if (response.status === 409 || response.status === 500) {
                    Alert.alert('Services error', 'The service has already been added.');
                } else {
                    Alert.alert('Services error', `Failed to add service. Reason: ${errorResponse.error}`);
                }
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Services error', 'Failed to add service');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        navigation.navigate('Home');
    };

    const onServicePressed = async (data) => {
        navigation.navigate('Home');
    };

    const handleServiceSelect = (service) => {
        setSelectedService(service); // Update the selected service
    };


    try {
        return (
            <View style={styles.container}>
                <GradientBackground>
                    <Text style={styles.title}>Concrete service that you are offering</Text>
                    <Button
                        style={{ backgroundColor: '#00fff', position: 'absolute', top: 40, left: 20 }}
                        onPress={() => onServicePressed()}>
                        <Text style={styles.buttonText}>Back</Text>
                    </Button>

                    <View style={styles.contentContainer}>
                        <FlatList
                            data={services}
                            renderItem={({ item }) => (
                                <View >
                                    {category === item.category.name && (
                                        <Services
                                            service={item}
                                            isSelected={selectedService === item}
                                            onSelect={handleServiceSelect}
                                        />
                                    )}
                                </View>
                            )}
                            keyExtractor={item => item.ID.toString()}
                            contentContainerStyle={styles.listContainer}
                        />
                    </View>

                    <CustomInput
                        name="price"
                        control={control}
                        placeholder="Price"
                        rules={{
                            required: 'Price is required',
                            maxLength: { value: 5, message: 'Price should not exceed 5 digits' },
                        }}
                    />

                    <CustomButton text="Save" onPress={() => onSavePressed()} type="SECONDARY" />
                    <Modal
                        visible={showModal}
                        transparent={true}
                        animationType="fade"
                        onRequestClose={closeModal}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>
                                    Service has been added successfully!
                                </Text>
                                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                    <Text style={styles.closeButtonText}>Got it</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </GradientBackground>
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
        fontSize: 36,
        marginBottom: 150,
    },
    buttonText: {
        color: '#43428b',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: -90,
    },
    listContainer: {
        flex: 1,
        marginBottom: '10%',
        marginTop: 10,
    },
    contentContainer: {
        flex: 1,
        width: '85%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#43428b',
        padding: 10,
        borderRadius: 5,
        width: 100,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ServicesOffererScreen;