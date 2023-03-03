import React, { useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, FlatList, SafeAreaView, StatusBar, Pressable } from "react-native";
import Input from "../Input";
import Button from "../components/Button";

import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


let i = 0;

const Menu = (props) => {

  // gets the ID of the client that signed in
  console.log("PROP: " + JSON.stringify(props.route["params"]["clientId"]));
  let id = parseInt(JSON.stringify(props.route["params"]["clientId"]));

  const [data, setData] = useState('');

  if (i == 0) {
    fetch(`http://ip:3000/get_shops`)
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
          }}>
          {({ pressed }) => (
            <Text style={styles.textButton}>Favourite</Text>
          )}
        </Pressable>
      </View>

    </View>
  );



  const { height } = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item shopName={item.shop_name} shopId={item.id} />}
        keyExtractor={item => item.id}
      />
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
})

export default Menu