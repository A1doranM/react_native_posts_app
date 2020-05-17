import React from "react";
import {DATA} from "../data";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {PostList} from "../components/PostList";

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
       <PostList
           data={DATA}
           onOpen={goToPost}
       />
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
