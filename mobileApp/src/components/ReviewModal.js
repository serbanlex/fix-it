import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import * as ImagePicker from 'expo-image-picker';

import {AddIcon, CloseIcon, Icon} from "native-base";

const styles = {
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: '5%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 8,
    },
    modalTextBold: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    modalCallToAction: {
        fontSize: 18,
        marginBottom: 16,
        fontWeight: '500',
        color: '#43428b',
    },
    submitReviewButton: {
        backgroundColor: '#43428b',
        padding: '2%',
        borderRadius: 5,
        width: 100,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 16,
        marginBottom: 32,
    },
    submitReviewButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalNavbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '2%',
        paddingTop: '2%',
    },
    modalCloseButton: {
        backgroundColor: '#43428b',
        borderRadius: 100,
        alignSelf: 'flex-end',
        padding: '3%',
    },
    modalCloseButtonText: {
        color: '#fff',
        fontSize: 16,
        paddingHorizontal: '2%',
    },
    attachmentButton: {
        backgroundColor: '#9292f0',
        borderRadius: 5,
        flexDirection: 'row', // Use flexDirection 'row' to make the children sit next to each other
        alignItems: 'center', // Align items in the center vertically
        alignSelf: "flex-start", // Align self to the start of flex direction "row" (left)
        marginTop: "5%",
        paddingLeft: 10, // Add left padding to separate the icon and text
        width: "auto", // Make the button as wide as the text and icon
        padding: "2%",
        marginBottom: "2%",
    },
    removeAttachmentButton: {
        backgroundColor: '#f09292',
        borderRadius: 5,
        flexDirection: 'row', // Use flexDirection 'row' to make the children sit next to each other
        alignItems: 'center', // Align items in the center vertically
        alignSelf: "flex-start", // Align self to the start of flex direction "row" (left)
        paddingLeft: 10, // Add left padding to separate the icon and text
        width: "auto", // Make the button as wide as the text and icon
        padding: "2%",
        marginBottom: "2%",
    },
    attachmentButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },

};


const ReviewModal = ({orderReviewModalVisible, setReviewModalVisible, orderInReview}) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const initialAttachmentButtonText = "Attach Image";
    const [attachmentButtonText, setAttachmentButtonText] = useState(initialAttachmentButtonText);

    const handleImageUpload = () => {
        ImagePicker.requestMediaLibraryPermissionsAsync().then(r => {
            if (r.granted) {
                ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1
                }).then(result => {
                    setAttachmentButtonText("Change Attached Image");
                    if (!result.cancelled) {
                        setImageUrl(result.assets[0].uri);
                    }
                }).catch(error => {
                    console.log(error);
                });
            } else {
                Alert.alert("Permission to access camera roll is required!");
            }
        })

    };

    const handleModalClose = () => {
        setReviewModalVisible(false);
        setImageUrl(null);
        setComment('');
        setRating(0);
        setAttachmentButtonText(initialAttachmentButtonText);
    }

    const submitReview = () => {

        const reviewData = {
            rating,
            comment,
            imageUrl,
            clientID: orderInReview.Client.ID,
            orderID: orderInReview.ID,
        };

        // Call your API endpoint with reviewData
        console.log('Submitting review:', reviewData);


        // Show an alert that says it's successful, and close the modal
        Alert.alert('Review submitted successfully!', "You'll be redirected to your home page swiftly.", [
            {
                text: 'Great!',
                onPress: () => handleModalClose(),
            },
        ]);


    };

    return (
        <Modal
            visible={orderReviewModalVisible ? true : false}
            animationType="slide"
            onRequestClose={() => setReviewModalVisible(false)}
        >
            <ScrollView>
                    <View style={styles.modalNavbar}>
                        <Text style={styles.modalTitle}>Review Order</Text>
                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={() => handleModalClose()}
                        >
                            <Text style={styles.modalCloseButtonText}>x</Text>
                        </TouchableOpacity>
                    </View>

                    {orderInReview && (
                        <ScrollView>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalCallToAction}>
                                    Please review the order handled by{' '}
                                    {orderInReview.OfferedService.ServiceOfferer.userInfo.firstName}{' '}
                                    {orderInReview.OfferedService.ServiceOfferer.userInfo.lastName}
                                </Text>
                                <Text style={styles.modalText}>
                                    Order Number: {orderInReview.ID}
                                </Text>
                                <Text style={styles.modalText}>
                                    Service offerer's firm:{' '}
                                    {orderInReview.OfferedService.ServiceOfferer.firmName}
                                </Text>
                                <Text style={styles.modalText}>
                                    Service: {orderInReview.OfferedService.Service.name}
                                </Text>
                                <Text style={styles.modalText}>
                                    Date:{' '}
                                    {new Date(orderInReview.date).toLocaleDateString('ro-RO')}
                                </Text>
                                <Text style={styles.modalText}>Time: {orderInReview.time}</Text>
                                <Text style={styles.modalText}>
                                    Address: {orderInReview.address}
                                </Text>
                                <Text style={styles.modalTextBold}>Rate the service:</Text>
                                <AirbnbRating
                                    count={5}
                                    reviews={['Terrible', 'Bad', 'OK', 'Good', 'Excellent']}
                                    defaultRating={0}
                                    size={20}
                                    onFinishRating={(rating) => setRating(rating)}
                                />

                                <Text style={styles.modalTextBold}>Leave a comment:</Text>
                                <TextInput
                                    style={{ height: "10%", borderColor: 'gray', borderWidth: 1 , padding: 10}}
                                    onChangeText={(text) => setComment(text)}
                                    value={comment}
                                    placeholder="Your comment here"
                                />

                                <TouchableOpacity style={styles.attachmentButton} onPress={handleImageUpload}>
                                    <AddIcon style={{marginRight: 5, color: "black"}}/>
                                    <Text style={styles.attachmentButtonText}> {attachmentButtonText}</Text>
                                </TouchableOpacity>

                                {imageUrl && (
                                    <TouchableOpacity style={styles.removeAttachmentButton} onPress={() => setImageUrl(null)}>
                                        <CloseIcon style={{marginRight: 5, color: "black"}}/>
                                        <Text style={styles.attachmentButtonText}> Remove Attached Image</Text>
                                    </TouchableOpacity>
                                )}

                                {imageUrl && (
                                    <Image
                                        source={{ uri: imageUrl }}
                                        style={{ width: 200, height: 200 }}
                                    />
                                )}

                                <TouchableOpacity
                                    style={styles.submitReviewButton}
                                    onPress={submitReview}
                                >
                                    <Text style={styles.submitReviewButtonText}>Submit</Text>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    )}
            </ScrollView>
        </Modal>
    );

};

export default ReviewModal;
