import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Alert, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { API_URL } from '@env';
import ServiceCategory from '../../components/ServiceCategory';

if (!API_URL) {
    API_URL = "http://192.168.100.71:3000";
}

console.log(API_URL)

function HomeScreen({ }) {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [categories, setCategories] = useState([]);
    const [session, setSession] = useState([]);
    const [ongoingOrders, setOngoingOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // Track the selected order
    const [selectedOrderStatus, setSelectedOrderStatus] = useState(null); // Track the selected order's status

    const navigation = useNavigation();

    useEffect(() => {
        fetch(`${API_URL}/serviceCategories`, { headers: { 'Cache-Control': 'no-cache' } })
            .then(response => {
                if (!response.ok) {
                    Alert.alert('Something went wrong', 'Failed to load service categories.');
                    throw new Error("Failed to load service categories. A network error may have occurred.")
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

    useEffect(() => {
        if (session.ID) {
            var ongoingOrdersLink;
            if (session.serviceOffererInfo != null) {
                ongoingOrdersLink = `${API_URL}/orders/serviceOfferer/${session.ID}`;
            } else {
                ongoingOrdersLink = `${API_URL}/orders/client/${session.ID}`;
            }
            fetch(ongoingOrdersLink, { headers: { 'Cache-Control': 'no-cache' } })
                .then(response => {
                    if (!response.ok) {
                        console.log("Something went wrong: " + JSON.stringify(response));
                        Alert.alert('Something went wrong', 'Failed to load ongoing orders.');
                        throw new Error("Failed to load ongoing orders. A network error may have occurred.")
                    }
                    else {
                        return response.json();
                    }
                })
                .then(data => {
                    if (data) {
                        console.log(data)
                        setOngoingOrders(data);
                    }
                })
                .catch(error => console.error(error));
        }
    }, [session]);

    const onLogOutPressed = async () => {
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
        if (session.serviceOffererInfo != null) {
            navigation.navigate('ServicesOfferer', data);
        } else {
            navigation.navigate('ServicesClient', data);
        }
    }

    const openOrderModal = (order) => {
        setSelectedOrder(order);
        setSelectedOrderStatus(order.state);
    };

    const handleChangeStatus = async (status) => {
        try {
            const response = await fetch(`${API_URL}/orders/${selectedOrder.ID}/state`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ state: status }),
            });

            if (response.ok) {
                // Update the selected order's status and close the modal
                setSelectedOrderStatus(status);

                // Update the order's status in the list of ongoing orders
                setOngoingOrders((prevOrders) => {
                    const updatedOrders = prevOrders.map((order) => {
                        if (order.ID === selectedOrder.ID) {
                            return {
                                ...order,
                                state: status,
                            };
                        }
                        return order;
                    });
                    return updatedOrders;
                });
            } else {
                Alert.alert('Status Update Failed', 'Failed to update the order status. Please try again.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Status Update Error', 'An error occurred while updating the order status. Please try again.');
        }
    };


    const closeOrderModal = () => {
        setSelectedOrder(null);
        setSelectedOrderStatus(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <Button
                style={{ backgroundColor: '#fffff', position: 'absolute', top: 50, left: 20 }}
                onPress={handleSubmit(onLogOutPressed)}
            >
                <Text style={styles.buttonText}>Log out</Text>
            </Button>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View>
                    <Text style={[styles.subtitle, styles.centerText]}>Choose a problem fix category:</Text>
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

                    <Text style={[styles.subtitle, styles.centerText]}>Ongoing Orders</Text>
                    <FlatList
                        data={ongoingOrders}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => openOrderModal(item)} style={styles.orderItem}>
                                <Text style={styles.orderItemText}>
                                    Order number #{item.ID}
                                    {item.state && <Text style={styles.orderItemState}>, state: {item.state}, firm: </Text>}
                                    {item.OfferedService &&
                                        item.OfferedService.ServiceOfferer &&
                                        item.OfferedService.ServiceOfferer.firmName && (
                                            <Text style={styles.orderItemFirmName}>
                                                {item.OfferedService.ServiceOfferer.firmName}
                                            </Text>
                                        )}
                                </Text>
                            </TouchableOpacity>
                            // Render the details of the ongoing order here
                        )}
                        keyExtractor={item => item.ID.toString()}
                    />

                    {/* Modal to display order details */}
                    <Modal
                        visible={selectedOrder !== null}
                        animationType="slide"
                        onRequestClose={closeOrderModal}
                    >
                        {selectedOrder && (
                            <ScrollView>
                                <View style={styles.modalContainer}>
                                    <Text style={styles.modalTitle}>Order Details</Text>
                                    <Text style={styles.modalText}>Order Number: {selectedOrder.ID}</Text>
                                    <Text style={styles.modalText}>State: {selectedOrder.state}</Text>
                                    <Text style={styles.modalText}>Date: {selectedOrder.date}</Text>
                                    <Text style={styles.modalText}>Time: {selectedOrder.time}</Text>
                                    <Text style={styles.modalText}>Description: {selectedOrder.description}</Text>
                                    <Text style={styles.modalText}>Address: {selectedOrder.address}</Text>

                                    {selectedOrder.OfferedService && (
                                        <>
                                            <Text style={styles.modalSubTitle}>Offered Service</Text>
                                            <Text style={styles.modalText}>Price: {selectedOrder.OfferedService.price}</Text>

                                            {selectedOrder.OfferedService.ServiceOfferer && (
                                                <>
                                                    <Text style={styles.modalSubTitle}>Service Offerer</Text>
                                                    <Text style={styles.modalText}>Firm Name: {selectedOrder.OfferedService.ServiceOfferer.firmName}</Text>
                                                    <Text style={styles.modalText}>Firm City: {selectedOrder.OfferedService.ServiceOfferer.firmCity}</Text>
                                                    <Text style={styles.modalText}>Firm Address: {selectedOrder.OfferedService.ServiceOfferer.firmAddress}</Text>
                                                    <Text style={styles.modalText}>CUI: {selectedOrder.OfferedService.ServiceOfferer.CUI}</Text>
                                                    <Text style={styles.modalText}>CAEN: {selectedOrder.OfferedService.ServiceOfferer.CAEN}</Text>

                                                    {selectedOrder.OfferedService.ServiceOfferer.userInfo && (
                                                        <>
                                                            <Text style={styles.modalSubTitle}>Service Offerer's Info</Text>
                                                            <Text style={styles.modalText}>First Name: {selectedOrder.OfferedService.ServiceOfferer.userInfo.firstName}</Text>
                                                            <Text style={styles.modalText}>Last Name: {selectedOrder.OfferedService.ServiceOfferer.userInfo.lastName}</Text>
                                                            <Text style={styles.modalText}>Email: {selectedOrder.OfferedService.ServiceOfferer.userInfo.email}</Text>
                                                            <Text style={styles.modalText}>Phone Number: {selectedOrder.OfferedService.ServiceOfferer.userInfo.phoneNumber}</Text>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}

                                    {selectedOrder.Client && (
                                        <>
                                            <Text style={styles.modalSubTitle}>Client</Text>
                                            <Text style={styles.modalText}>Client ID: {selectedOrder.Client.ID}</Text>

                                            {selectedOrder.Client.userInfo && (
                                                <>
                                                    <Text style={styles.modalSubTitle}>Client's Info</Text>
                                                    <Text style={styles.modalText}>First Name: {selectedOrder.Client.userInfo.firstName}</Text>
                                                    <Text style={styles.modalText}>Last Name: {selectedOrder.Client.userInfo.lastName}</Text>
                                                    <Text style={styles.modalText}>Email: {selectedOrder.Client.userInfo.email}</Text>
                                                    <Text style={styles.modalText}>Phone Number: {selectedOrder.Client.userInfo.phoneNumber}</Text>
                                                </>
                                            )}
                                        </>
                                    )}
                                    {session.serviceOffererInfo !== null && (
                                        <View style={styles.buttonContainer}>
                                            {session.serviceOfferInfo !== null && (
                                                <>
                                                    <Button
                                                        style={[styles.modalActionButton, styles.modalPendingButton, selectedOrderStatus === 'pending' && styles.selectedButton]}
                                                        onPress={() => handleChangeStatus('pending')}
                                                        disabled={selectedOrderStatus === 'pending'}
                                                    >
                                                        <Text style={[styles.modalActionButtonText, styles.modalPendingButtonText]}>Set as pending</Text>
                                                    </Button>
                                                    <Button
                                                        style={[styles.modalActionButton, styles.modalInProgressButton, selectedOrderStatus === 'in progress' && styles.selectedButton]}
                                                        onPress={() => handleChangeStatus('in progress')}
                                                        disabled={selectedOrderStatus === 'in progress'}
                                                    >
                                                        <Text style={[styles.modalActionButtonText, styles.modalInProgressButtonText]}>Set in progress</Text>
                                                    </Button>
                                                    <Button
                                                        style={[styles.modalActionButton, styles.modalDoneButton, selectedOrderStatus === 'done' && styles.selectedButton]}
                                                        onPress={() => handleChangeStatus('done')}
                                                        disabled={selectedOrderStatus === 'done'}
                                                    >
                                                        <Text style={[styles.modalActionButtonText, styles.modalDoneButtonText]}>Set as done</Text>
                                                    </Button>
                                                </>
                                            )}
                                        </View>

                                    )}
                                    <Button style={styles.modalCloseButton} onPress={closeOrderModal}>
                                        <Text style={styles.modalCloseButtonText}>Close</Text>
                                    </Button>
                                </View>
                            </ScrollView>
                        )}
                    </Modal>


                </View>
            </ScrollView>
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
        marginBottom: 100,
    },
    subtitle: {
        color: '#43428b',
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
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    modalSubTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 8,
    },
    modalCloseButton: {
        backgroundColor: '#43428b',
        padding: 10,
        borderRadius: 5,
        width: 100,
        alignItems: 'center',
    },
    modalCloseButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    scrollContainer: {
        alignItems: 'center',
    },
    centerText: {
        textAlign: 'center',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    orderItem: {
        backgroundColor: '#f2f2f2',
        padding: '2%',
        marginBottom: 8,
        borderRadius: 8,
    },
    orderItemText: {
        fontSize: 16,
        fontWeight: '500',
    },
    orderItemState: {
        fontStyle: 'italic',
        marginLeft: 8,
    },
    orderItemFirmName: {
        color: '#43428b',
        marginTop: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 10,
    },
    selectedButton: {
        // backgroundColor: '#ccc', // Light gray background color
        // color: '#888', // Dark gray text color
        // padding: '2%',
        opacity: 0.3, // Reduced opacity to indicate disabled state
    },
    modalActionButton: {
        backgroundColor: '#43428b',
        color: '#fff',
        padding: '2%',
        borderRadius: 5,
        width: 100,
        alignItems: 'center',
        marginRight: 8,
    },
    modalActionButtonText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 14,
    },
    modalInProgressButton: {
        backgroundColor: '#80d4ff',
    },
    modalInProgressButtonText: {
        color: '#43428b',
    },
    modalPendingButton: {
        backgroundColor: '#ffbf80',
    },
    modalPendingButtonText: {
        color: '#43428b',
    },
    modalDoneButton: {
        backgroundColor: '#70db70',
    },
    modalDoneButtonText: {
        color: '#43428b',
    },

});

export default HomeScreen;
