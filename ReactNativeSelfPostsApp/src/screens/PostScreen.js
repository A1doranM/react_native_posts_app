import React, {useEffect} from "react";
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
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";

export const PostScreen = ({navigation}) => {
    const postId = navigation.getParam("postId");
    const post = DATA.find(p => p.id === postId);

    // useEffect(() => {
    //     navigation.setParams({
    //         booked: post.booked,
    //     });
    // }, []);

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
    const booked = navigation.getParam("booked");
    const iconName = booked ? "iso-star" : "ios-star-outline";

    return {
        headerTitle: `Post ${postId}, ${new Date(postDate).toLocaleDateString()}`,
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                    <Item title="Star post"
                          iconName={iconName}
                          onPress={() => {
                              console.log("star");
                          }}/>
                </HeaderButtons>
            );
        },
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