import React from "react";
import {DATA} from "../data";
import {Post} from "../components/Post";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {PostList} from "../components/PostList";

export const MainScreen = ({navigation}) => {
    const goToPost = (post) => {
        navigation.navigate("Post",
            {
                postId: post.id,
                postDate: post.date,
                booked: post.booked,
            });
    };

    return (
      <PostList data={DATA} onOpen={goToPost}/>
    );
};

MainScreen.navigationOptions = ({navigation}) => {
    return {
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
                             navigation.toggleDrawer();
                          }}/>
                </HeaderButtons>
            );
        },
    };
};