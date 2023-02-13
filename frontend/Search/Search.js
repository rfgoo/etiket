import React, { useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Input from "../Input";
import Button from "../components/Button";

import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const Search = () => {

    const navigation = useNavigation();

    const { height } = useWindowDimensions();
    return (
        <View style={styles.root}>
            <Text>Search!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#1E1E1E"
    },
})

export default Search