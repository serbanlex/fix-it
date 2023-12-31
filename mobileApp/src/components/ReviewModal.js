import React, {useState} from 'react';
import {Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import * as ImagePicker from 'expo-image-picker';

import {AddIcon, CloseIcon} from "native-base";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {REACT_APP_API_URL} from '@env';


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


const ReviewModal = ({session, orderReviewModalVisible, setReviewModalVisible, orderInReview, setOngoingOrders}) => {
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
                    console.log(result);
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

    const closeModalAndRefreshOrders = () => {
        setReviewModalVisible(false);
        setImageUrl(null);
        setComment('');
        setRating(0);
        setAttachmentButtonText(initialAttachmentButtonText);
        fetch(`${REACT_APP_API_URL}/orders/client/${session.ID}`, { headers: { 'Cache-Control': 'no-cache' } })
            .then(response => {
                if (!response.ok) {
                    console.log("Something went wrong: " + JSON.stringify(response));
                    Alert.alert('Something went wrong', 'Failed to load ongoing orders.');
                    throw new Error("Failed to load ongoing orders. A network error may have occurred.")
                } else {
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


    const uploadImageToFirebase = async (uri, fileName) => {
        console.log("Trying to upload image to Firebase... (path: " + fileName + ")" + ", uri: " + uri);
        const storage = getStorage();
        const reference = ref(storage, 'images/reviews/' + fileName);

        const imageUrlLocalResponse = await fetch(uri);
        const blob = await imageUrlLocalResponse.blob();

        // Upload the Blob to Firebase Storage
        await uploadBytes(reference, blob).then(
            (snapshot) => {
                console.log('Image uploaded to Firebase successfully!');
            }
        ).catch((error) => {
            console.log("Error at the uploadbytes:", error);
            if (error.serverResponse) {
                console.log('Server Response:', error.serverResponse);
            }
            throw error;
            }
        )

        // Get the download URL
        const url = await getDownloadURL(reference);
        console.log('Image uploaded successfully! Download URL:', url);
        return url;


    };

    function getCurrentDateTimeString() {
        const currentDate = new Date();

        // Get year, month, day, hours, minutes, and seconds
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');

        // Construct the desired string
        return `${year}-${month}-${day}-${hours}:${minutes}:${seconds}`;
    }

    const submitReview = async () => {
        let uploadedImageUrl;
        if(imageUrl) {
            try{
                const pathInFirebase = orderInReview.ID + "#" + orderInReview.Client.ID + getCurrentDateTimeString() + ".jpg";
                uploadedImageUrl = await uploadImageToFirebase(imageUrl, pathInFirebase);
            }
            catch (error) {
                console.log(error);
                console.log("Error uploading image to Firebase:", error);
                Alert.alert("Your image could not be uploaded. Please try again later.");
                return;
            }
        }
        const reviewData = {
            rating: rating,
            comment: comment,
            imageUrl: uploadedImageUrl,
            clientID: orderInReview.Client.ID,
            orderID: orderInReview.ID,
        };
        // Call your API endpoint with reviewData
        console.log('Submitting review:', reviewData);

        await fetch(`${REACT_APP_API_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    throw new Error("Error uploading review: " + data.error);
                }
                console.log('Successfully uploaded review:', data);
                // Show an alert that says it's successful, and close the modal
                Alert.alert('Review submitted successfully!', "You'll be redirected to your home page swiftly.", [
                    {
                        text: 'Great!',
                        onPress: () => closeModalAndRefreshOrders(),
                    },
                ]);
            })
            .catch((error) => {
                console.error('Error uploading review:', error);
                Alert.alert(`Your review could not be uploaded. Reason: ${error}`);
            });
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
                                    defaultRating={0}
                                    size={20}
                                    onFinishRating={(rating) => setRating(rating)}
                                    selectedColor={'#9292f0'}
                                    showRating={false}
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
