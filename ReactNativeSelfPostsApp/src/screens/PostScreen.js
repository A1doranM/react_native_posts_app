import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    Alert,
    ScrollView
} from "react-native";
import {DATA} from "../data";
import {THEME} from "../theme";

export const PostScreen = ({navigation}) => {
    const postId = navigation.getParam("postId");
    const post = DATA.find(p => p.id === postId);

    const removeHandler = () => {
        Alert.alert(
            "Delete post",
            "Are you sure?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Remove", style: "destructive", onPress: () => {

                    }
                }
            ],
            {cancelable: false},
        )
    };

    return (
        <ScrollView>
            <Image source={{uri: post.img}} style={styles.image}/>
            <View style={styles.textWrap}>
                <Text style={styles.title}>{post.text}</Text>
            </View>
            <Button
                title="Delete"
                color={THEME.DANGER_COLOR}
                onPress={removeHandler}
            />
        </ScrollView>
    );
};

PostScreen.navigationOptions = ({navigation}) => {
    const postId = navigation.getParam("postId");
    const postDate = navigation.getParam("postDate");

    return {
        headerTitle: `Post ${postId}, ${new Date(postDate).toLocaleDateString()}`
    };

};

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 200
    },
    textWrap: {
        padding: 10
    },
    title: {
        fontFamily: "open-regular"
    }
});