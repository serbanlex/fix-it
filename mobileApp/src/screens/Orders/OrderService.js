import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Alert, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { REACT_APP_API_URL } from '@env';
import GradientBackground from '../../components/GradientBackground2';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


console.log(REACT_APP_API_URL);

function OrderServiceScreen({ route }) {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const { control, handleSubmit, watch } = useForm();
    const [sessionDetails, setSession] = useState([]);
    const [showModal, setShowModal] = useState(false);

    console.log(route.params.data);

    const navigation = useNavigation();

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleDateConfirm = (date) => {
        setSelectedDate(date.toISOString().split('T')[0]);
        hideDatePicker();
    };

    const showTimePicker = () => {
        setTimePickerVisible(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisible(false);
    };

    const handleTimeConfirm = (time) => {
        const localTimeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setSelectedTime(localTimeString);
        hideTimePicker();
    };


    useEffect(() => {
        fetch(`${REACT_APP_API_URL}/session`, { headers: { 'Cache-Control': 'no-cache' } })
            .then(response => {
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
                }
            })
            .catch(error => console.error(error));
    }, []);

    const onRegisterPressed = async orderFormData => {
        try {
            const order = {
                ...orderFormData,
                offeredServiceID: route.params.data.ID,
                clientID: sessionDetails.ID,
                state: 'pending',
                date: selectedDate,
                time: selectedTime,
            }
            const response = await fetch(`${REACT_APP_API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });

            if (response.ok) {
                setShowModal(true);

            } else {
                const errorResponse = await response.json();
                console.log(errorResponse);
                Alert.alert('Registration Error', `Failed to register client. Reason: ${errorResponse.error}`);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Registration Error', 'Failed to register client.');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        navigation.navigate('Home');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
                <GradientBackground>
                    <Button
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.buttonText}>{"< Back"}</Text>
                    </Button>

                    <Text style={styles.title}>Some last details...</Text>

                    <CustomInput
                        name="address"
                        control={control}
                        placeholder="Address (city, street, number) etc."
                        rules={{
                            required: 'Address is required',
                            minLength: { value: 3, message: 'Address must be at least 3 characters long' },
                            maxLength: { value: 21, message: 'Address must be at most 21 characters long' }
                        }}
                    />
                    <CustomInput
                        name="description"
                        control={control}
                        placeholder="Description of the problem to be fixed"
                        rules={{
                            required: 'Description is required',
                            minLength: { value: 3, message: 'Description must be at least 3 characters long' },
                        }}
                    />
                    {(selectedDate || selectedTime) && (
                        <Text style={styles.extraText}>
                            The date & time you'd like us to fix it at:
                            {selectedDate && (
                                <Text style={{ fontWeight: 'bold' }}>{`\n${selectedDate}`}</Text>
                            )}{', '}
                            {selectedTime && (
                                <Text style={{ fontWeight: 'bold' }}>{selectedTime}</Text>
                            )}
                        </Text>
                    )}




                    <View style={styles.buttonsContainer}>
                        {/* Date Picker */}
                        <View>
                            <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
                                <Text style={styles.dateButtonText}>Select Date</Text>
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleDateConfirm}
                                onCancel={hideDatePicker}
                            />
                        </View>

                        {/* Time Picker */}
                        <View>
                            <TouchableOpacity onPress={showTimePicker} style={styles.timeButton}>
                                <Text style={styles.timeButtonText}>Select Time</Text>
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isTimePickerVisible}
                                mode="time"
                                onConfirm={handleTimeConfirm}
                                onCancel={hideTimePicker}
                            />
                        </View>
                    </View>


                    <CustomButton text="Fix it!" onPress={handleSubmit(onRegisterPressed)} />
                    <Modal
                        visible={showModal}
                        transparent={true}
                        animationType="fade"
                        onRequestClose={closeModal}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>
                                    Thank you for choosing Fix-It. Your service provider is going to contact you soon.
                                </Text>
                                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                    <Text style={styles.closeButtonText}>Got it</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </GradientBackground>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    contentContainer: {
        flexGrow: 1,
    },
    backButton: {
        backgroundColor: '#00fff',
        zIndex: 1,
        alignSelf: 'flex-start',
    },
    title: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 36,
        marginBottom: 50,
    },
    buttonText: {
        color: '#43428b',
        fontWeight: 'bold',
        fontSize: 20,
    },
    extraText: {
        color: '#43428b',
        fontWeight: '500',
        fontSize: 16,
        padding: '2%',
    },
    dateButton: {
        backgroundColor: '#8E8CE0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: 200,
        alignItems: 'center',
    },
    dateButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    timeButton: {
        backgroundColor: '#8E8CE0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: 200,
        alignItems: 'center',
    },
    timeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: '2%',
        width: '100%',
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

export default OrderServiceScreen;