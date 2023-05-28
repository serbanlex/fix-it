import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OfferedService = ({ price, serviceOfferer, service }) => {
    console.log(serviceOfferer)
    return (
        <View style={styles.container}>
            <Text style={styles.price}>Price: ${price}</Text>
            <Text style={styles.offerer}>{serviceOfferer.userInfo.firstName} {serviceOfferer.userInfo.lastName}, {serviceOfferer.firmName}</Text>
            <Text style={styles.address}>Located at: {serviceOfferer.firmCity}, {serviceOfferer.firmAddress}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#8E8CE0',
        borderRadius: 8,
        marginVertical: 8,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        marginBottom: 8,
    },
    offerer: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    address: {
        fontSize: 14,
        marginBottom: 4,
    },
});

export default OfferedService;
