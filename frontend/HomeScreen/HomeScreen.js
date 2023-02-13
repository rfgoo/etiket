import React, { useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Input from "../Input";
import Button from "../components/Button";

import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from "../Search";

function Home() {
    return (
      <View style={styles.root}>
        <Text>Home!</Text>
      </View>
    );
  }

const HomeScreen = () => {

    const navigation = createBottomTabNavigator();
    const Tab = createBottomTabNavigator();

    const { height } = useWindowDimensions();
    return (
        
        <Tab.Navigator screenOptions={{ headerShown: false, 
                                        tabBarStyle:{backgroundColor: "grey"}, 
                                        tabBarLabelStyle:{color: "white", fontFamily: 'Helvetica', fontSize: 15,},
                                        }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Search} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: "#1E1E1E"
    },
    tab: {
        backgroundColor: "grey"
    }
})

export default HomeScreen