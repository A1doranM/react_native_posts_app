import React, {useEffect} from "react";
import {Post} from "../components/Post";
import {useDispatch, useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {PostList} from "../components/PostList";
import {loadPosts} from "../store/actions/post";

export const MainScreen = ({navigation}) => {
    const goToPost = (post) => {
        navigation.navigate("Post",
            {
                postId: post.id,
                postDate: post.date,
                booked: post.booked,
            });
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadPosts());
    }, [dispatch]);

    const allPosts = useSelector(state => state.post.allPosts);

    return (
        <PostList data={allPosts} onOpen={goToPost}/>
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
                              navigation.push("Create");
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