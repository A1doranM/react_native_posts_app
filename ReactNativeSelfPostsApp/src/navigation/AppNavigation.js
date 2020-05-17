import React from "react";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {Platform} from "react-native";
import {MainScreen} from "../screens/MainScreen";
import {PostScreen} from "../screens/PostScreen";
import {THEME} from "../theme";
import {Ionicons} from "@expo/vector-icons";
import {BookedScreen} from "../screens/BookedScreen";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import {createDrawerNavigator} from "react-navigation-drawer";
import {AboutScreen} from "../screens/AboutScreen";
import {CreateScreen} from "../screens/CreateScreen";

const navigatorOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? THEME.MAIN_COLOR : "#fff",
    },
    headerTintColor: Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR,
};

const PostNavigator = createStackNavigator({
    Main: MainScreen,
    Post: PostScreen,
}, {
    defaultNavigationOptions: navigatorOptions,
});

const BookedNavigator = createStackNavigator({
        Booked: BookedScreen,
        Post: PostScreen,
    },
    {
        initialRouteName: "Booked",
        defaultNavigationOptions: navigatorOptions,
    }
);

const bottomTabsConfig = {
    Post: {
        screen: PostNavigator,
        navigationOptions: {
            tabBarLabel: "All",
            tabBarIcon: (info) => <Ionicons name="ios-albums" size={25} color={info.tintColor}/>
        }
    },
    Booked: {
        screen: BookedNavigator,
        navigationOptions: {
            tabBarLabel: "Favourites",
            tabBarIcon: (info) => <Ionicons name="ios-star" size={25} color={info.tintColor}/>
        }
    }
};

const BottomNavigator = Platform.OS === "android" ? createMaterialBottomTabNavigator(bottomTabsConfig, {
        activeTintColor: "#fff",
        shifting: true,
        barStyle: {
            backgroundColor: THEME.MAIN_COLOR
        }
    })
    : createBottomTabNavigator(bottomTabsConfig, {
        tabBarOptions: {
            activeTintColor: THEME.MAIN_COLOR
        }
    });

const MainNavigator = createDrawerNavigator({
    PostTabs: {
      screen: BottomNavigator
    },
    About: {
        screen: AboutScreen
    },
    Create: {
        screen: CreateScreen
    }
});

export const AppNavigation = createAppContainer(MainNavigator);