import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const OfferedService = ({ price, serviceOfferer, service, reviews }) => {
    if(reviews == null) {
        console.log("Reviews is null");
        return (
            <View style={styles.container}>
                <Text style={styles.price}>Price: ${price} </Text>
                <Text
                    style={styles.offerer}>{serviceOfferer.userInfo.firstName} {serviceOfferer.userInfo.lastName}, {serviceOfferer.firmName}</Text>
                <Text style={styles.address}>Located at: {serviceOfferer.firmCity}, {serviceOfferer.firmAddress}</Text>
            </View>
        );
    }

    const rating = reviews.length > 0 ? Math.round(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length) : 0;


    // based on the rating, have a different color for the stars: ✰ and ⭐
    const starsText = "★".repeat(rating) + "✰".repeat(5 - rating);

    const ratingText = reviews.length > 0 ? `Rating on service: ${starsText}️ (${rating}/5) \n(${reviews.length} reviews)` : "This service has no reviews yet.";

    const ratingComponent = reviews.length > 0 ? (
        <View>
            <Text style={styles.ratingText}>{ratingText}</Text>
        </View>
    ) : (
        <View>
            <Text style={styles.ratingTextNoReviews}>{ratingText}</Text>
        </View>
    );


    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Text style={styles.price}>Price: ${price}</Text>
                <Image source={{ uri: serviceOfferer.userInfo.imageUrl }} style={{ width: 50, height: 50, borderRadius: 100}} />
            </View>

            <Text style={styles.offerer}>{serviceOfferer.userInfo.firstName} {serviceOfferer.userInfo.lastName}, {serviceOfferer.firmName}</Text>
            <Text style={styles.address}>Located at: {serviceOfferer.firmCity}, {serviceOfferer.firmAddress}</Text>
            {ratingComponent}

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
    ratingText: {
        fontSize: 14,
        marginBottom: 4,
        fontWeight: '500',
    },
    ratingTextNoReviews: {
        fontSize: 14,
        marginBottom: 4,
        fontWeight: '400',
        fontStyle: 'italic',
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
