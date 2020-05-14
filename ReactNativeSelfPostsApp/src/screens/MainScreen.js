import React from "react";
import {View, StyleSheet, FlatList} from "react-native";
import {DATA} from "../data";
import {Post} from "../components/Post";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";

export const MainScreen = ({navigation}) => {
    const goToPost = (post) => {
        navigation.navigate("Post",
            {
                postId: post.id,
                postDate: post.date,
            });
    };

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={DATA}
                keyExtractor={post => {
                    return post.id.toString();
                }}
                renderItem={({item}) => {
                    return (
                        <Post post={item} onOpen={goToPost}/>
                    );
                }}
            />
        </View>
    );
};

MainScreen.navigationOptions = {
    headerTitle: "My blog",
    headerRight: () => {
        return (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title="Take photo"
                      iconName="ios-camera"
                      onPress={() => {
                          console.log("photo");
                      }}/>
            </HeaderButtons>
        );
    },
    headerLeft: () => {
        return (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title="Toggle drawer"
                      iconName="ios-menu"
                      onPress={() => {
                          console.log("open menu");
                      }}/>
            </HeaderButtons>
        );
    },
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    }
});