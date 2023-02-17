import React, { useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, FlatList, SafeAreaView, StatusBar, Pressable } from "react-native";
import Input from "../Input";
import Button from "../components/Button";

import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.itemButton}>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgb(107, 51, 137)'
              : '#3C6CA4'
          },
          styles.button
        ]}>
        {({ pressed }) => (
          <Text style={styles.textButton}>Ticket</Text>
        )}
      </Pressable>
    </View>

  </View>
);

let i = 0;

const Favourites = () => {

  const [data, setData] = useState('');
  
  if (i == 0) {
    fetch(`http://ip/get_shops`)
      .then(res => {
        return res.json();
      })
      .then(
        (result) => {
          setData(result)
        })
    i++;
  }

  for (const property in data) {
    console.log(`${object[property]}`);

  }

  console.log(data.pluck(data, 'id'));

  const navigation = useNavigation();

  const { height } = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item title={item.data} />}
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
    padding: 5,
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

export default Favourites