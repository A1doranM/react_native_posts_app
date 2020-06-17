import React, {useState, useRef} from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
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
import {PhotoPicker} from "../components/PhotoPicker";

export const CreateScreen = ({navigation}) => {
    let [text, setText] = useState("");
    const imgRef = useRef();
    const dispatch = useDispatch();

    const saveHandler = () => {
        const post = {
            date: new Date().toJSON(),
            text: text,
            img: imgRef.current,
            booked: false,
        };
        dispatch(addPost(post));
        navigation.navigate("Main");
    };

    const photoPickHandler = (uri) => {
        imgRef.current = uri;
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
                        onChangeText={(txt) => {
                            setText(txt)
                        }}
                        multiline
                    />
                    <PhotoPicker onPick={photoPickHandler}/>
                    <Button
                        title="Create post"
                        color={THEME.MAIN_COLOR}
                        onPress={saveHandler}
                        disabled={!text}
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