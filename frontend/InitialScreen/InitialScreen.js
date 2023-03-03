import React, { useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Logo from "../images/E.png"
import Input from "../Input";
import Button from "../components/Button";

import SelectDropdown from 'react-native-select-dropdown'

import { useNavigation } from "@react-navigation/native";


const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const type = ["Client", "Shop"];
    const [userType, setUserType] = useState("");

    const onSignInPressed = (email, password, type) => {
        let valid = false;
        fetch(`http://ip:3000/log_in/${email}/${password}/${type}`)
            .then(res => {
                if(res.status == "200"){
                   console.log(res.status);
                   valid = true;
                }
                return res.json();
            })
            .then(
                (result) => {
                    console.log(valid);
                    navigation.navigate('HomeScreen', {
                        clientId: result["id"]
                      });
                })
    }
    const onForgotPasswordPressed = () => {
        console.warn("Forgot Password");
    }

    const onNewAccountPressed = () => {
        navigation.navigate('SignUpScreen');
    }

    const { height } = useWindowDimensions();
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            <View style={styles.root}>
                <Image source={Logo} style={[styles.logo, { height: height * 0.5 }]} resizeMode="contain" />

                <Input
                    placeholder="Email"
                    value={email.toLowerCase()}
                    setValue={setEmail}
                />
                <Input
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={true}
                />

                <SelectDropdown
                    data={type}
                    defaultButtonText={'Select an Option'}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                        setUserType(selectedItem);
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

                <Button text="Sign In" onPress={() => onSignInPressed(email, password, userType)} />
                <Button text="Forgot password?" onPress={onForgotPasswordPressed} type="TERTIARY" />
                <Button text="Don't have an account?" onPress={onNewAccountPressed} type="SECONDARY" />
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: "#1E1E1E"
    },
    root: {
        alignItems: 'center',
        padding: 10,
    },
    logo: {
        width: '90%',
        maxWidth: 500,
        maxHeight: 350,
    },
    dropdown1BtnStyle: {
        flex: 1,
        maxHeight: 50,
        backgroundColor: 'grey',
        borderRadius: 50,
        width: '70%',
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
        marginVertical: 10,
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

export default SignUpScreen