import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Pressable, TouchableOpacity, RefreshControl, ActivityIndicator, TouchableWithoutFeedback } from "react-native";
import Input from "../Input";
import Button from "../components/Button";
import Logo from "../images/Home.png";
import Ticket from "../images/ticket.png"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDropdown from 'react-native-select-dropdown'

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
  const delayTimes = ["10 min", "15 min", "20 min"];
  const [timeToDelay, setTimeToDelay] = useState("");

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
      fetch(`http://ip:3000/get_tickets/${id}`)
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
          .catch((error) => {
            // Handle any errors that occur
            console.error(error);
        });
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
            setCurrentNumber("N/A");
            fetch(`http://ip:3000/remove_ticket/${ticketId}`)
              .then(res => {
                return res.json();
              })
              .then(
                (result) => {
                  console.log(result);
                })
                .catch((error) => {
                  // Handle any errors that occur
                  console.error(error);
              });
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
            fetch(`http://ip:3000/delay/${ticketId}/${parseInt(timeToDelay.split(" ")[0])}`)
              .then(res => {
                return res.json();
              })
              .then(
                (result) => {
                  console.log("DELAY: "+ parseInt(timeToDelay.split(" ")[0]));
                  console.log("DELAY"+result);
                })
                .catch((error) => {
                  // Handle any errors that occur
                  console.error(error);
              });
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
        <SelectDropdown
                    data={delayTimes}
                    defaultButtonText={'Time'}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                        setTimeToDelay(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                />
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
    //fontFamily: 'Helvetica',
    fontSize: 20,
    fontWeight: 'bold',
    color: "#3C6CA4",
  },
  onTicket: {
    position: 'absolute',
    top: 80,
  },
  ticketNumberText: {
    //fontFamily: 'Helvetica',
    fontSize: 30,
    fontWeight: 'bold',
    color: "#3C6CA4"
  },
  ticketIndexText: {
    //fontFamily: 'Helvetica',
    fontSize: 17,
    fontWeight: 'bold',
    color: "#3C6CA4",
    padding: 10
  },
  ticketTime: {
    //fontFamily: 'Helvetica',
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
    //fontFamily: 'Helvetica'
  },
  dropdown1BtnStyle: {
        flex: 1,
        maxHeight: 50,
        backgroundColor: 'grey',
        borderRadius: 50,
        width: '40%',
      },
    dropdown1BtnTxtStyle: { 
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Helvetica',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    dropdown1DropdownStyle: { 
        backgroundColor: '#grey',
        marginVertical: -20,
        height: 200,
    },
    dropdown1RowStyle: { 
        backgroundColor: 'white',
        margin: 2,
        borderBottomColor: 'grey',
        borderRadius: 50, 
        marginVertical: 10,
    },
    dropdown1RowTxtStyle: {
        fontFamily: 'Helvetica',
        fontSize: 18,
        textAlign: 'center' 
    },
})

export default HomeScreen