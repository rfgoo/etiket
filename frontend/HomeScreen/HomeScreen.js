import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Pressable, TouchableOpacity, RefreshControl, ActivityIndicator, TouchableWithoutFeedback } from "react-native";
import Input from "../Input";
import Button from "../components/Button";
import Logo from "../images/Home.png";
import Ticket from "../images/ticket.png"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Menu from "../Menu";
import Favourites from "../Favourites";


function Home(props) {

  // gets the ID of the client that signed in
  console.log("PROP: " + JSON.stringify(props.route["params"]));
  info = JSON.stringify(props.route["params"]);
  let id = JSON.stringify(props.route["params"]["clientId"]);
  let shopId = JSON.stringify(props.route["params"]["shopId"]);
  let action = JSON.stringify(props.route["params"]["action"]);

  const [data, setData] = useState('');
  const [currentNumber, setCurrentNumber] = useState("N/A");
  const [ticketNumber, setTicketNumber] = useState("N/A");
  const [timeToTicket, setTimeToTicket] = useState("N/A");
  const [ticketId, setTicketId] = useState(0);

  const [refreshing, setRefreshing] = useState(true);
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    if (action) {
      fetch(`http://127.0.0.1:3000/get_tickets/${id}`)
        .then(res => {
          return res.json();
        })
        .then(
          (result) => {
            console.log(result);
            setCurrentNumber(JSON.stringify(result[id - 1]["current_number"]));
            setTicketNumber(JSON.stringify(result[id - 1]["number"]));
            setTimeToTicket(JSON.stringify(result[id - 1]["time"]));
            setTicketId(JSON.stringify(result[id - 1]["ticket_id"]));
            setRefreshing(false);
            setData(result);
          })
    }
    else {
      setRefreshing(false);
    }
  }

  const onDelayPressed = () => {
    console.warn("Delay");
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={loadUserData} />
    }>
      {refreshing ? <ActivityIndicator color="#3C6CA4" /> : null}
      <View style={styles.root}>
        <Image source={Ticket} style={[styles.logo]} resizeMode="contain" />
        <View style={styles.onTicket}>
          <Text style={styles.ticketNumberText}>Nº {ticketNumber}</Text>
          <View style={styles.onTicketSecondary}>
            <Text style={styles.ticketIndexText}>Current Number: {currentNumber}</Text>
            <Text style={styles.ticketTime}>Waiting Time: {timeToTicket} min</Text>
          </View>

        </View>
        <Pressable
          onPress={() => {
            setTicketNumber("N/A");
            setTimeToTicket("N/A");
            setCurrentNumber(currentNumber-1);
            fetch(`http://127.0.0.1:3000/remove_ticket/${ticketId}`)
              .then(res => {
                return res.json();
              })
              .then(
                (result) => {
                  console.log(result);
                })
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
            <Text style={styles.textButton}>Delay</Text>
          )}
        </Pressable>
      </View>
    </ScrollView>

  );
}

const HomeScreen = ({ route }) => {

  const navigation = createBottomTabNavigator();
  const Tab = createBottomTabNavigator();
  const { clientId } = route.params;
  console.log(JSON.stringify(clientId));

  const { height } = useWindowDimensions();
  return (

    <Tab.Navigator initialRouteName="Home" screenOptions={{
      tabBarShowLabel: false,
      headerShown: false,
      tabBarStyle: { backgroundColor: "grey" },
      tabBarLabelStyle: { color: "white", fontFamily: 'Helvetica', fontSize: 15, }
    }}>
      <Tab.Screen name="Menu" component={Menu} initialParams={{ clientId: clientId }} options={{
        tabBarLabel: 'Menu',
        tabBarIcon: ({ focused, size }) => (
          <MaterialCommunityIcons name="menu" color="#1E1E1E" size={size} style={{ color: focused ? "#3C6CA4" : "1E1E1E" }} />
        ),
      }} />
      <Tab.Screen name="Home" component={Home} initialParams={{ clientId: clientId }} options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused, size }) => (
          <MaterialCommunityIcons name="home" color="#1E1E1E" size={size} style={{ color: focused ? "#3C6CA4" : "1E1E1E" }} />
        ),
      }} />
      <Tab.Screen name="Favourites" component={Favourites} initialParams={{ clientId: clientId }} options={{
        tabBarLabel: 'Favourites',
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
    alignItems: 'center',
    marginVertical: 15
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Helvetica'
  },
})

export default HomeScreen