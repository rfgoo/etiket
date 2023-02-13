import React, { useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Input from "../Input";
import Button from "../components/Button";
import Logo from "../images/Home.png"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: "grey" },
      tabBarLabelStyle: { color: "white", fontFamily: 'Helvetica', fontSize: 15, }
    }}>
      <Tab.Screen name="Home" component={Home} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color="#1E1E1E" size={size} />
          ),
        }} />
      <Tab.Screen name="Search" component={Search} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="menu" color="#1E1E1E" size={size} />
          ),
        }} />
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