import React, { useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Input from "../Input";
import Button from "../components/Button";

import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const Favourites = () => {

    const navigation = useNavigation();

    const { height } = useWindowDimensions();
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            <View style={styles.root}>
                <Text style={styles.text}>Favourites</Text>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: "#1E1E1E"
    },
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#1E1E1E",
    },
    text: {
        fontFamily: 'Helvetica',
        fontSize: 20,
        fontWeight: 'bold',
        color: "#3C6CA4"
    }
})

export default Favourites