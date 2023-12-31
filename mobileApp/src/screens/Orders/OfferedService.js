import React, { useState } from 'react';
import {Text, View, Modal, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { REACT_APP_API_URL } from '@env';


console.log(REACT_APP_API_URL)

function OfferedServiceScreen({ route }) {
    // contains the offered service + the reviews
    const offeredService = route.params.data;
    const service = offeredService.Service;
    const serviceOfferer = offeredService.ServiceOfferer;
    const reviews = offeredService.reviews;
    const [showReviews, setShowReviews] = useState(false);
    const navigation = useNavigation();

    const toggleReviews = () => {
        setShowReviews(!showReviews);
    };
    const goToOrderPage = async (data) => {
        navigation.navigate('OrderService', { data: data });
    }


    // Review component
    const Review = ({ review }) => {
        if(review == null) return (<View></View>);
        const [isModalVisible, setModalVisible] = useState(false);

        const toggleModal = () => {
            setModalVisible(!isModalVisible);
        };

        const starsText = "★".repeat(review.rating) + "✰".repeat(5 - review.rating);

        const ratingText = (reviews != null && reviews.length > 0) ? `Rating: ${starsText}️ (${review.rating}/5)` : "This service has no reviews yet.";

        const ratingComponent = (reviews != null && reviews.length > 0) ? (
            <View>
                <Text style={styles.ratingText}>{ratingText}</Text>
            </View>
        ) : (
            <View>
                <Text style={styles.ratingTextNoReviews}>{ratingText}</Text>
            </View>
        );

        return (
            <View style={styles.reviewContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Text style={styles.reviewText}>{review.Client.userInfo.firstName} {review.Client.userInfo.lastName} ({new Date(review.createdAt).toLocaleDateString('RO')})</Text>
                    <Image source={{ uri: review.Client.userInfo.imageUrl }} style={{ width: 50, height: 50, borderRadius: 100}} />
                </View>
                <Text style={styles.reviewText}>{ratingComponent}</Text>
                <Text>{review.comment}</Text>
                {/* Open modal on image click */}
                <TouchableOpacity onPress={toggleModal}>
                    <Image source={{ uri: review.imageUrl }} style={styles.reviewImage} />
                </TouchableOpacity>

                {/* Modal for larger image */}
                <Modal visible={isModalVisible} transparent={true} onRequestClose={toggleModal}>
                    <View style={styles.modalContainer}>
                        <Image source={{ uri: review.imageUrl }} style={styles.modalImage} />
                        <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    };
    try {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>{"<"} Back</Text>
                </TouchableOpacity>

                <View contentContainerStyle={styles.contentContainer}>
                    {/* Present offeredService data  in a summarized manner before the user presses "Order"*/}

                    <Text style={styles.title}>Details about the service offered by {serviceOfferer.userInfo.firstName} {serviceOfferer.userInfo.lastName} ({service.name.toLowerCase()}) </Text>
                    <Text style={styles.info}>Price: ${offeredService.price}</Text>
                    <Text style={styles.info}>Firm: {offeredService.ServiceOfferer.firmName}</Text>
                    <Text style={styles.info}>Address: {serviceOfferer.firmCity}, {offeredService.ServiceOfferer.firmAddress}</Text>


                    <TouchableOpacity
                        style={styles.callToAction}
                        onPress={() => goToOrderPage(offeredService)}>
                        <Text style={styles.callToActionText}>{"Order service"}</Text>
                    </TouchableOpacity>

                    {reviews != null && reviews.length > 0 ? (
                        <View>
                        <TouchableOpacity
                            style={styles.reviewToggleButton}
                            onPress={toggleReviews}>
                            <Text style={styles.reviewToggleButtonText}>{showReviews ? "Click to hide reviews" : "Click to show reviews"}</Text>
                        </TouchableOpacity>
                            {
                                showReviews ? (
                                    reviews.map((review, index) => (
                                        <Review key={index} review={review} />
                                    ))
                                ) : (<View></View>)
                            }
                        </View>

                    ) : (
                        <Text style={styles.special}>{serviceOfferer.userInfo.firstName} has no reviews for {service.name.toLowerCase()} yet. Give them a try! </Text>
                    )}


                    {/* Render Reviews */}


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
        padding: '10%'
    },
    backButton: {
        backgroundColor: '#00fff',
        zIndex: 1,
        paddingBottom: '5%',
    },
    buttonText: {
        color: '#43428b',
        fontWeight: 'bold',
        fontSize: 20,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: '5%',
        width: '100%',
    },
    reviewContainer: {
        padding: 16,
        backgroundColor: '#8E8CE0',
        borderRadius: 8,
        marginVertical: 8,
        borderWidth: 1,
        width: '100%',
    },
    info: {
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold',
    },
    special: {
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#8E8CE0',
        paddingTop: '15%',

    },
    reviewImage: {
        width: 200,
        height: 200,
        marginTop: 8,
    },
    reviewText: {
        fontSize: 14,
        marginBottom: 4,
        fontWeight: '500',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalImage: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    closeButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#43428b',
        fontWeight: 'bold',
        fontSize: 25
    },
    reviewToggleButton: {
        backgroundColor: '#fff',
        padding: 10,
        marginTop: '5%',
        marginBottom: '5%',
        width: '100%',

    },
    reviewToggleButtonText: {
        color: '#43428b',
        fontWeight: 'bold',
        fontSize: 20,
        borderWidth: 1,
        padding: "3%",
        borderRadius: 30,
        width: '100%',
        textAlign: 'center',

    },
    callToAction: {
        padding: 10,
        marginTop: '5%',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
    },
    callToActionText: {
        color: '#fff',
        backgroundColor: '#43428b',
        fontWeight: 'bold',
        fontSize: 20,
        borderWidth: 1,
        padding: "3%",
        borderRadius: 30,
        width: '100%',
        textAlign: 'center',

    },


});



export default OfferedServiceScreen;