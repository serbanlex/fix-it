import {AddIcon} from "native-base";
import {Text, TouchableOpacity} from "react-native";

const styles = {
    attachmentButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#9292f0',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 20,
        width: "80%",
        marginTop: '2%',
        marginBottom: '2%'
    },
    attachmentButtonText: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
    }
}

const ImageUploadButton = ({ onPress, buttonText }) => {
    return (
        <TouchableOpacity style={styles.attachmentButton} onPress={onPress}>
            <AddIcon style={{marginRight: 5, color: "black"}}/>
            <Text style={styles.attachmentButtonText}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

export default ImageUploadButton;