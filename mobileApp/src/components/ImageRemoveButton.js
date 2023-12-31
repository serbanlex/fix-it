import {AddIcon, CloseIcon} from "native-base";
import {Text, TouchableOpacity} from "react-native";

const styles = {
    attachmentButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f09292',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        width: "80%",
    },
    attachmentButtonText: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
    }
}

const ImageRemoveButton = ({ onPress, buttonText }) => {
    return (
        <TouchableOpacity style={styles.attachmentButton} onPress={onPress}>
            <CloseIcon style={{marginRight: 5, color: "black"}}/>
            <Text style={styles.attachmentButtonText}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

export default ImageRemoveButton;