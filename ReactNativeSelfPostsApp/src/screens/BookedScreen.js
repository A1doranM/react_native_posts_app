import React from "react";
import {View, StyleSheet, FlatList} from "react-native";
import {DATA} from "../data";
import {Post} from "../components/Post";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";

export const BookedScreen = ({navigation}) => {
    const goToPost = (post) => {
        navigation.navigate("Post",
            {
                postId: post.id,
                postDate: post.date,
                booked: post.booked,
            });
    };

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={DATA.filter(post => {
                    return post.booked
                })}
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

BookedScreen.navigationOptions = {
    headerTitle: "Favourites",
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