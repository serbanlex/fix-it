import React, { useEffect } from 'react';
import { StyleSheet, Text, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { REACT_APP_API_URL } from '@env';
import {Button} from "native-base";
import GradientBackground2 from "../../components/GradientBackground2";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";


const RegisterOffererScreen = ({ route }) => {
  const { control, handleSubmit, watch } = useForm();
  const genericUserData = route.params.data;
  const navigation = useNavigation();

    const uploadImageToFirebase = async (uri, fileName) => {
        console.log("Trying to upload image to Firebase... (path: " + fileName + ")" + ", uri: " + uri);
        const storage = getStorage();
        const reference = ref(storage, 'images/users/' + fileName);

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
      const onRegisterPressed = async data => {
        data = { ...genericUserData, ...data };
        delete data['password-repeat'];
        console.log(data)
        if (data.imageUrl) {
          const fileName = data.imageUrl.split('/').pop();
          data.imageUrl = await uploadImageToFirebase(data.imageUrl, fileName);
        }
        try {
          const response = await fetch(`${REACT_APP_API_URL}/serviceOfferers`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

          if (response.ok) {
            navigation.navigate('SuccessfulLogin');
          } else {
            const errorResponse = await response.json();
            console.log(errorResponse);
            Alert.alert('Registration Error', `Failed to register service offerer. Reason: ${errorResponse.error}`);
          }
        } catch (error) {
          console.error(error);
          Alert.alert('Registration Error', 'Failed to register service offerer.');
        }
      };


  return (
    <GradientBackground2 style={styles.container}>
        <Button
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>{"<"} Back
            </Text>
        </Button>
        <Text style={styles.title}>Some last details...</Text>
      <CustomInput
        name="firmName"
        control={control}
        placeholder="Firm Name"
        rules={{
          required: 'Firm name is required',
        }}
      />
      <CustomInput
        name="firmCity"
        control={control}
        placeholder="Firm City"
        rules={{
          required: 'Firm city is required',
        }}
      />
      <CustomInput
        name="firmAddress"
        control={control}
        placeholder="Firm Address"
        rules={{
          required: 'Firm address is required',
        }}
      />
      <CustomInput
        name="CUI"
        control={control}
        placeholder="CUI"
        rules={{
          required: 'CUI is required',
        }}
      />
      <CustomInput
        name="CAEN"
        control={control}
        placeholder="CAEN"
        rules={{
          required: 'CAEN is required',
        }}
      />


        <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)} />
    </GradientBackground2>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
    title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 36,
    },
    backButton: {
        backgroundColor: '#fff',
        zIndex: 1,
        alignSelf: 'flex-start'
    },
    buttonText: {
        color: '#43428b',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default RegisterOffererScreen;
