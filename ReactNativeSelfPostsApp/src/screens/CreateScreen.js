import React, {useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    Button,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {THEME} from "../theme";
import {useDispatch} from "react-redux";
import {addPost} from "../store/actions/post";

export const CreateScreen = ({navigation}) => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const saveHandler = () => {
        const post = {
            date: new Date().toJSON(),
            text: text,
            img: 'https://static.coindesk.com/wp-content/uploads/2019/01/shutterstock_1012724596-860x430.jpg',
            booked: false,
        };
        dispatch(addPost(post));
        navigation.navigate("Main");
    };

    return (
        <ScrollView>
            <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}
            >
                <View style={styles.wrapper}>
                    <Text style={styles.title}>Create new post.</Text>
                    <TextInput
                        style={styles.textarea}
                        placeholder="Write post text"
                        value={text}
                        onChange={setText}
                        multiline
                    />
                    <Image
                        style={{width: "100%", height: 200, marginBottom: 10}}
                        source={{
                            uri:
                                'https://static.coindesk.com/wp-content/uploads/2019/01/shutterstock_1012724596-860x430.jpg',
                        }}/>
                    <Button
                        title="Create post"
                        color={THEME.MAIN_COLOR}
                        onPress={saveHandler}
                    />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
};

CreateScreen.navigationOptions = ({navigation}) => {
    return {
        headerTitle: "Post creation",
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

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: "open-regular",
        marginVertical: 10
    },
    textarea: {
        padding: 10,
        marginBottom: 10,
    }
});