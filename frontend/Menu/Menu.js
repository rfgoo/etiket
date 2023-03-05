import React, { useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, FlatList, SafeAreaView, StatusBar, Pressable } from "react-native";
import Input from "../Input";
import Button from "../components/Button";
import MapView from 'react-native-maps';
import { Marker, Callout, CalloutSubview } from 'react-native-maps';

import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


let i = 0;

const Menu = (props) => {

  var region = {
    latitude: 38.750887,
    longitude: -9.1542399,
    latitudeDelta: 0.0102,
    longitudeDelta: 0.0101,
  };

  // gets the ID of the client that signed in
  console.log("PROP: " + JSON.stringify(props.route["params"]["clientId"]));
  let id = parseInt(JSON.stringify(props.route["params"]["clientId"]));

  const [data, setData] = useState('');

  if (i == 0) {
    fetch(`http://192.168.1.5:3000/get_shops`)
      .then(res => {
        return res.json();
      })
      .then(
        (result) => {
          console.log(result);
          setData(result);
        })
    i++;
  }

  const navigation = useNavigation();

  const getTicket = (shopId) => {
    fetch("http://ip:3000/ticket", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "shop_id": shopId,
        "user_id": id
      })
    })
      .then(res => {
        console.log(res.status);
        return res.json();
      })
      .then(
        (result) => {
          console.log(result);
        })
    navigation.navigate("Home", {
      shopId: shopId,
      action: true
    });
  }

  const makeFavourite = (shopId) => {
    fetch("http://ip:3000/fav", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "shop_id": shopId,
        "user_id": id
      })
    })
      .then(res => {
        console.log(res.status);
        return res.json();
      })
      .then(
        (result) => {
          console.log(result);
        })
  }

{/*
  const Item = ({ shopName, shopId }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{shopName}</Text>
      <View style={styles.itemButton}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? 'rgb(107, 51, 137)'
                : '#3C6CA4'
            },
            styles.button
          ]}
          onPress={() => {
            fetch("http://192.168.1.5:3000/ticket", {
              method: "POST",
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "shop_id": shopId,
                "user_id": id
              })
            })
              .then(res => {
                console.log(res.status);
                return res.json();
              })
              .then(
                (result) => {
                  console.log(result);
                })
            navigation.navigate("Home", {
              shopId: shopId,
              action: true
            });
          }}>
          {({ pressed }) => (
            <Text style={styles.textButton}>Ticket</Text>
          )}
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? 'rgb(107, 51, 137)'
                : '#D6A534'
            },
            styles.button
          ]}
          onPress={() => {
            fetch("http://192.168.1.5:3000/fav", {
              method: "POST",
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "shop_id": shopId,
                "user_id": id
              })
            })
              .then(res => {
                console.log(res.status);
                return res.json();
              })
              .then(
                (result) => {
                  console.log(result);
                })
          }}>
          {({ pressed }) => (
            <Text style={styles.textButton}>Favourite</Text>
          )}
        </Pressable>
      </View>

    </View>
  );
*/}


  const { height } = useWindowDimensions();
  return (

    <SafeAreaView style={styles.container}>
      {/*
        <FlatList
        data={data}
        renderItem={({ item }) => <Item shopName={item.shop_name} shopId={item.id} />}
        keyExtractor={item => item.id}
      />
        */}
      <MapView style={styles.map} initialRegion={region} userInterfaceStyle={'dark'}>
        {/*Cantina Iste*/}
        <Marker
          coordinate={{ latitude: 38.7488860, longitude: -9.1542399 }}
          image={require('frontend/images/pinMap.png')}>
          <Callout style={styles.calloutStyle}>
            <View>
              <Text style={styles.calloutTitle}>Cantina do Iscte</Text>
              <Text style={styles.calloutDescription}><Text style={styles.color}>Current Number:</Text> N/A</Text>
              <Text style={styles.calloutDescription}><Text style={styles.color}>Average Waiting Time:</Text> N/A</Text>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? 'rgb(107, 51, 137)'
                      : '#D6A534'
                  },
                  styles.buttonStyle
                ]}
                onPress={() => {makeFavourite(1)}}>
                {({ pressed }) => (
                  <Text style={styles.textButtonStyle}>Favourite</Text>
                )}
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? 'rgb(107, 51, 137)'
                      : '#3C6CA4'
                  },
                  styles.buttonStyle
                ]}
                onPress={() => {getTicket(1)}}>
                {({ pressed }) => (
                  <Text style={styles.textButtonStyle}>Ticket</Text>
                )}
              </Pressable>
            </View>
          </Callout>
        </Marker>

        {/*Bar Iste*/}
        <Marker
          coordinate={{ latitude: 38.7484480, longitude: -9.1543505 }}
          image={require('frontend/images/pinMap.png')}>
          <Callout style={styles.calloutStyle}>
            <View>
              <Text style={styles.calloutTitle}>Bar do Iscte</Text>
              <Text style={styles.calloutDescription}><Text style={styles.color}>Current Number:</Text> N/A</Text>
              <Text style={styles.calloutDescription}><Text style={styles.color}>Average Waiting Time:</Text> N/A</Text>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? 'rgb(107, 51, 137)'
                      : '#D6A534'
                  },
                  styles.buttonStyle
                ]}
                onPress={() => {makeFavourite(2)}}>
                {({ pressed }) => (
                  <Text style={styles.textButtonStyle}>Favourite</Text>
                )}
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? 'rgb(107, 51, 137)'
                      : '#3C6CA4'
                  },
                  styles.buttonStyle
                ]}
                onPress={() => {getTicket(2)}}>
                {({ pressed }) => (
                  <Text style={styles.textButtonStyle}>Ticket</Text>
                )}
              </Pressable>
            </View>
          </Callout>
        </Marker>

        {/*Cantina FCUL*/}
        <Marker
          coordinate={{ latitude: 38.7558379, longitude: -9.1564068 }}
          image={require('frontend/images/pinMap.png')}>
          <Callout style={styles.calloutStyle}>
            <View>
              <Text style={styles.calloutTitle}>Bar do Iscte</Text>
              <Text style={styles.calloutDescription}><Text style={styles.color}>Current Number:</Text> N/A</Text>
              <Text style={styles.calloutDescription}><Text style={styles.color}>Average Waiting Time:</Text> N/A</Text>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? 'rgb(107, 51, 137)'
                      : '#D6A534'
                  },
                  styles.buttonStyle
                ]}
                onPress={() => {makeFavourite(3)}}>
                {({ pressed }) => (
                  <Text style={styles.textButtonStyle}>Favourite</Text>
                )}
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? 'rgb(107, 51, 137)'
                      : '#3C6CA4'
                  },
                  styles.buttonStyle
                ]}
                onPress={() => {getTicket(3)}}>
                {({ pressed }) => (
                  <Text style={styles.textButtonStyle}>Ticket</Text>
                )}
              </Pressable>
            </View>
          </Callout>
        </Marker>

        {/*Cantina FDUL*/}
        <Marker
          coordinate={{ latitude: 38.7519128, longitude: -9.1569053 }}
          image={require('frontend/images/pinMap.png')}>
          <Callout style={styles.calloutStyle}>
            <View>
              <Text style={styles.calloutTitle}>Bar do Iscte</Text>
              <Text style={styles.calloutDescription}><Text style={styles.color}>Current Number:</Text> N/A</Text>
              <Text style={styles.calloutDescription}><Text style={styles.color}>Average Waiting Time:</Text> N/A</Text>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? 'rgb(107, 51, 137)'
                      : '#D6A534'
                  },
                  styles.buttonStyle
                ]}
                onPress={() => {makeFavourite(4)}}>
                {({ pressed }) => (
                  <Text style={styles.textButtonStyle}>Favourite</Text>
                )}
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? 'rgb(107, 51, 137)'
                      : '#3C6CA4'
                  },
                  styles.buttonStyle
                ]}
                onPress={() => {getTicket(4)}}>
                {({ pressed }) => (
                  <Text style={styles.textButtonStyle}>Ticket</Text>
                )}
              </Pressable>
            </View>
          </Callout>
        </Marker>

      </MapView>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E",
    flex: 1,
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
  },
  item: {
    backgroundColor: 'gray',
    padding: 20,
    marginVertical: 8,
    borderRadius: 25,
    marginHorizontal: 16,
  },
  itemButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    flexDirection: "row"
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: 22,
    margin: 10,
    fontWeight: 'bold',
    color: "white",
  },
  button: {
    width: '50%',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    margin: 5
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Helvetica'
  },
  map: {
    width: '100%',
    height: '100%',
    top: 0
  },
  calloutTitle: {
    fontSize: 15,
    marginBottom: 5,
    marginLeft: 15,
    fontWeight: "bold",
    fontFamily: "Helvetica",
    color: '#3C6CA4',
  },
  calloutDescription: {
    fontSize: 12,
    marginLeft: 3,
    fontFamily: "Helvetica"
  },
  calloutStyle: {
    flex: -1,
    position: "absolute",
    width: 150,
    height: 150,

  },
  color: {
    color: '#3C6CA4',
  },
  buttonStyle: {
    borderRadius: 50,
    width: '80%',
    padding: 9,
    alignItems: 'center',
    margin: 5,
    marginLeft: 15,
    marginTop: 10
  },
  textButtonStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Helvetica'
  },
})

export default Menu