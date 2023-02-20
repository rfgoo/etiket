import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, FlatList, SafeAreaView, StatusBar, Pressable, RefreshControl, ActivityIndicator } from "react-native";
import Input from "../Input";
import Button from "../components/Button";

import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



let i = 0;
const Favourites = (props) => {

    //console.log("PROP: " + JSON.stringify(props.route));
    // gets the ID of the client that signed in
    console.log("PROP: " + JSON.stringify(props.route["params"]));
    const [data, setData] = useState('');
    let id = JSON.stringify(props.route["params"]["clientId"]);

    const [refreshing, setRefreshing] = useState(true);
    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = () => {
        fetch(`http://ip/get_fav/${id}`)
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    console.log(result);
                    setRefreshing(false);
                    setData(result);
                })
    }

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
                    ]}
                    onPress={() => {
                        //qq coisa
                    }}>
                    {({ pressed }) => (
                        <Text style={styles.textButton}>Ticket</Text>
                    )}
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? '#AB5858'
                                : '#B83143'
                        },
                        styles.button
                    ]}
                    onPress={() => {
                        //qq coisa
                    }}>
                    {({ pressed }) => (
                        <Text style={styles.textButton}>Remove</Text>
                    )}
                </Pressable>
            </View>

        </View>
    );

    const navigation = useNavigation();

    const { height } = useWindowDimensions();
    return (
        <SafeAreaView style={styles.container}>
            {refreshing ? <ActivityIndicator color="#3C6CA4"/> : null}
            <FlatList
                data={data}
                renderItem={({ item }) => <Item title={item.shop_name} />}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={loadUserData} />
                  }
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

export default Favourites