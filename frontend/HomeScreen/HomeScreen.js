import React, { useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Input from "../Input";
import Button from "../components/Button";

import { useNavigation } from "@react-navigation/native";


const HomeScreen = () => {

    const navigation = useNavigation();


    const onSignInPressed = () => {
    }

    const { height } = useWindowDimensions();
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            <View style={styles.root}>
                <Text>Hello World</Text>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: "#1E1E1E"
    },
    root: {
        alignItems: 'center',
        padding: 10,
    },
})

export default HomeScreen