import React, {useEffect, useCallback} from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    Alert,
    ScrollView
} from "react-native";
import {THEME} from "../theme";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {useDispatch, useSelector} from "react-redux";
import {removePost, toggleBooked} from "../store/actions/post";

export const PostScreen = ({navigation}) => {
    const postId = navigation.getParam("postId");

    const dispatch = useDispatch();

    const post = useSelector(
        state => state.post.allPosts.find(p => p.id === postId)
    );

    const booked = useSelector(state =>
        state.post.bookedPosts.some(post => post.id === postId)
    );

    useEffect(() => {
        navigation.setParams({booked: post.booked});
    }, [booked]);

    const toggleHandler = useCallback(() => {
        dispatch(toggleBooked(post));
    }, [dispatch, post]);

    useEffect(() => {
        navigation.setParams({toggleHandler: toggleHandler})
    }, [toggleHandler]);

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
                        dispatch(removePost(postId));

                    }
                }
            ],
            {cancelable: false},
        )
    };

    if(!post){
        return navigation.navigate("Main");
    }

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
    const toggleHandler = navigation.getParam("toggleHandler");
    const iconName = booked ? "ios-star" : "ios-star-outline";

    return {
        headerTitle: `Post ${postId}, ${new Date(postDate).toLocaleDateString()}`,
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                    <Item title="Star post"
                          iconName={iconName}
                          onPress={toggleHandler}/>
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