import React from "react";
import { View, Text, StyleSheet, Pressable} from "react-native";

const Button = ({onPress, text, type = "PRIMARY"}) => {
    return (
        <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
            <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '60%',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center'
    },

    container_PRIMARY: {
        backgroundColor: '#3C6CA4',
        marginVertical: 30,
    },
    container_SECONDARY: {
        width: '90%',
        padding: 40,
    },
    container_TERTIARY: {
        padding: 5,
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Helvetica'
    },
    text_SECONDARY: {
        fontSize: 18,
        textDecorationLine: 'underline'
    },
    text_TERTIARY: {
        color: 'grey',
        fontSize: 15,
    },
});

export default Button