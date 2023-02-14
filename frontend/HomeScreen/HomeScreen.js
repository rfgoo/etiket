import React, { useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Input from "../Input";
import Button from "../components/Button";
import Logo from "../images/Home.png";
import Ticket from "../images/ticket.png"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from "../Favourites";
import Menu from "../Menu";

function Home() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
      <View style={styles.root}>
        <Image source={Ticket} style={[styles.logo]} resizeMode="contain" />
        <Text style={styles.text}></Text>
      </View>
    </ScrollView>

  );
}

const HomeScreen = () => {

  const navigation = createBottomTabNavigator();
  const Tab = createBottomTabNavigator();

  const { height } = useWindowDimensions();
  return (

    <Tab.Navigator screenOptions={{
      tabBarShowLabel: false,
      headerShown: false,
      tabBarStyle: { backgroundColor: "grey" },
      tabBarLabelStyle: { color: "white", fontFamily: 'Helvetica', fontSize: 15, }
    }}>
      <Tab.Screen name="Menu" component={Menu} options={{
        tabBarLabel: 'Menu',
        tabBarIcon: ({ focused, size }) => (
          <MaterialCommunityIcons name="menu" color="#1E1E1E" size={size} style={{ color: focused ? "#3C6CA4" : "1E1E1E" }} />
        ),
      }} />
      <Tab.Screen name="Home" component={Home} options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused, size }) => (
          <MaterialCommunityIcons name="home" color="#1E1E1E" size={size} style={{ color: focused ? "#3C6CA4" : "1E1E1E" }} />
        ),
      }} />
      <Tab.Screen name="Search" component={Search} options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused, size }) => (
          <MaterialCommunityIcons name="star" color="#1E1E1E" size={size} style={{ color: focused ? "#3C6CA4" : "1E1E1E" }} />
        ),
      }} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "#1E1E1E"
  },
  logo: {
    marginTop:-10,
    minHeight: 400,
    minWidth: 400,
  },
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#1E1E1E",
  },
  tab: {
    backgroundColor: "grey"
  },
  text: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    fontWeight: 'bold',
    color: "#3C6CA4"
  }
})

export default HomeScreen