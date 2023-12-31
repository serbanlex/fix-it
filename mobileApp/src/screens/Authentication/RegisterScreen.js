import React, { useState } from 'react';
import {StyleSheet, Text, View, ImageBackground, ScrollView, Alert, TouchableOpacity, Image} from 'react-native';
import {Button, CloseIcon} from 'native-base';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import GradientBackground from '../../components/GradientBackground2';
import { REACT_APP_API_URL } from '@env';
import ImageUploadButton from "../../components/ImageUploadButton";
import * as ImagePicker from "expo-image-picker";
import ImageRemoveButton from "../../components/ImageRemoveButton";

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;


const RegisterScreen = ({ route }) => {
  const navigation = useNavigation();
  const role = route.params.role;

  const [genericUserData, setGenericUserData] = useState('');
  const [attachmentButtonText, setAttachmentButtonText] = useState("Upload your profile picture");
  const [imageUrl, setImageUrl] = useState(null);

  const { control, handleSubmit, watch } = useForm();
  const pwd = watch('password');
  const handleImageUpload = () => {
    ImagePicker.requestMediaLibraryPermissionsAsync().then(r => {
      if (r.granted) {
        ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        }).then(result => {
          setAttachmentButtonText("Change Profile Picture");
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
  const onNextPressed = (data) => {
    let userData = {};
    if(imageUrl){
       userData = {
        ...data,
        imageUrl: imageUrl,
      };
    }
    else{
         userData = {
            ...data,
            imageUrl: "https://firebasestorage.googleapis.com/v0/b/fix-it-4efd5.appspot.com/o/images%2Fusers%2F39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg?alt=media&token=12d89c90-c039-4ef8-a26a-e908cdcc0890",
        };
    }

    setGenericUserData(userData);
    console.log("########", userData);
    navigation.navigate('RegisterOfferer', { data: userData });
  };

  const onRegisterPressed = async data => {
    try {
      const response = await fetch(`${REACT_APP_API_URL}/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        navigation.navigate('SuccessfulLogin');
      } else {
        console.log(response);
        const errorResponse = await response.json();
        console.log(errorResponse);
        Alert.alert('Registration Error', `Failed to register client. Reason: ${errorResponse.error}`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Registration Error', 'Failed to register client.');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <GradientBackground>
          <Button
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>{"<"} Back
            </Text>
          </Button>
          <Text style={styles.title}>Register</Text>

          <CustomInput
            name="firstName"
            control={control}
            placeholder="First Name"
            rules={{
              required: 'First Name is required',
              minLength: { value: 3, message: 'First Name must be at least 3 characters long' },
              maxLength: { value: 21, message: 'First Name must be at most 21 characters long' }
            }}
          />
          <CustomInput
            name="lastName"
            control={control}
            placeholder="Last Name"
            rules={{
              required: 'Last Name is required',
              minLength: { value: 3, message: 'Last Name must be at least 3 characters long' },
              maxLength: { value: 21, message: 'Last Name must be at most 21 characters long' }
            }}
          />
          <CustomInput
            name="email"
            control={control}
            placeholder="Email"
            rules={{
              required: 'Email is required',
              pattern: { value: EMAIL_REGEX, message: 'Invalid email address' }
            }}
          />
          <CustomInput
            name="phoneNumber"
            control={control}
            placeholder="Phone Number"
            rules={{ required: 'Phone Number is required' }}
          />
          <CustomInput
            name="password"
            control={control}
            placeholder="Password"
            secureTextEntry={true}
            rules={{
              required: 'Password is required',
              minLength: { value: 3, message: 'Password must be at least 3 characters long' },
            }}
          />
          <CustomInput
            name="password-repeat"
            control={control}
            placeholder="Repeat Password"
            secureTextEntry={true}
            rules={{
              validate: value =>
                value == pwd || 'Passwords do not match',
            }}
          />
          <ImageUploadButton onPress={handleImageUpload} buttonText={attachmentButtonText} />
          {imageUrl && (
              <>
                <ImageRemoveButton
                    onPress={() => {
                      setImageUrl(null);
                      setAttachmentButtonText("Upload your profile picture");
                    }}
                    buttonText={"Remove Profile Picture"}
                />
                <Image
                    source={{ uri: imageUrl }}
                    style={{ width: 200, height: 200 }}
                />
              </>
          )}

          {role === "serviceOfferer" && (
            <>
              <CustomButton text="Next" onPress={handleSubmit(onNextPressed)} />
            </>
          )}

          {role === "client" && (
            <>
              <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)} />
            </>
          )}

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
  backButton: {
    backgroundColor: '#fff',
    zIndex: 1,
    alignSelf: 'flex-start'
  },
  contentContainer: {
    flexGrow: 1,
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

});

export default RegisterScreen;
