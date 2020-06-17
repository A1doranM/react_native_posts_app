import React, {useState} from "react";
import {View, Button, Image, StyleSheet} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import {Alert} from "react-native-web";

async function askForPermissions() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if(status !== "granted"){
      Alert.alert("Error", "Access denied");
      return false;
    }
    return true;
}

export const PhotoPicker = ({onPick}) => {
    const [image, setImage] = useState(null);

    const takePhoto = async () => {
        const hasPermissions = await askForPermissions();
        if(!hasPermissions){
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            quality: 1,
            allowsEditing: false,
            aspect: [16, 9],
        });

        setImage(image.uri);
        onPick(image.uri);
    };

    return (
        <View style={styles.wrapper}>
            <Button title="Make photo" onPress={takePhoto}/>
            {image && <Image style={styles.image} source={{uri: image}}/>}
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10
    },
    image: {
        width: "100%",
        height: 200,
        marginTop: 10,
    }
});