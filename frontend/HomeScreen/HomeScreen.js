import React, { useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Pressable } from "react-native";
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
  const [index, setIndex] = useState(0);
  const onCancelPressed = () => {
    console.warn("Cancel");
    index = 1;
  }

  const onDelayPressed = () => {
    console.warn("Delay");
  }
  let textLog = 'N/A';
  if (index > 0) {
    textLog = index;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
      <View style={styles.root}>
        <Image source={Ticket} style={[styles.logo]} resizeMode="contain" />
        <View style={styles.onTicket}>
          <Text style={styles.ticketNumberText}>Nº N/A</Text>
          <View style={styles.onTicketSecondary}>
            <Text style={styles.ticketIndexText}>Nº Atual: {textLog}</Text>
            <Text style={styles.ticketTime}>Tempo de espera: N/A</Text>
          </View>

        </View>
        <Pressable
          onPress={() => {
            setIndex((current) => current + 1);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? 'rgb(107, 51, 137)'
                : '#3C6CA4'
            },
            styles.container
          ]}>
          {({ pressed }) => (
            <Text style={styles.textButton}>Cancel</Text>
          )}
        </Pressable>
        <Button text="Delay" onPress={() => onDelayPressed()} />
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
    marginTop: -10,
    minHeight: 400,
    minWidth: 400,
  },
  root: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    backgroundColor: "grey"
  },
  text: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    fontWeight: 'bold',
    color: "#3C6CA4",
  },
  onTicket: {
    position: 'absolute',
    top: 80,
  },
  ticketNumberText: {
    fontFamily: 'Helvetica',
    fontSize: 30,
    fontWeight: 'bold',
    color: "#3C6CA4"
  },
  ticketIndexText: {
    fontFamily: 'Helvetica',
    fontSize: 17,
    fontWeight: 'bold',
    color: "#3C6CA4",
    padding: 10
  },
  ticketTime: {
    fontFamily: 'Helvetica',
    fontSize: 17,
    fontWeight: 'bold',
    color: "#3C6CA4",
    padding: 10,
    alignContent: "center"
  },
  onTicketSecondary: {
    position: 'absolute',
    top: 100,
    minWidth: 200,
    marginLeft: -70
  },
  container: {
    width: '60%',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center'
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Helvetica'
  },
})

export default HomeScreen