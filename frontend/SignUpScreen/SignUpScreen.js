import React, { useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from "react-native";

import Input from "../Input";
import Button from "../components/Button";


import { useNavigation } from "@react-navigation/native";

const InitialScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const navigation = useNavigation();
    
    const onRegisterPressed = (name, email, password) => {
        fetch("http://ip/add", {
             method: "POST",
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({
                 "name": name,
                 "mail": email,
                 "passwd": password,
                 "client": true
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
    const onSignInPressed = () => {
        navigation.navigate('InitialScreen');
    }

    const { height } = useWindowDimensions();
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            <View style={styles.root}>

                <Text style={styles.title}>Create Account</Text>
                <Input
                    placeholder="Name"
                    value={name}
                    setValue={setName}
                />
                <Input
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                />
                <Input
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={true}
                />
                <Input
                    placeholder="Confirm password"
                    value={passwordConfirm}
                    setValue={setPasswordConfirm}
                    secureTextEntry={true}
                />
                <Button text="Register" onPress={() => onRegisterPressed(name, email, password)} />
                <Text style={styles.text}>By registering, you confirm that you accept our <Text style={styles.link}>Terms of Use</Text> and <Text style={styles.link}>Privacy Policy</Text></Text>
                <Button text="Already have an account?" onPress={onSignInPressed} type="SECONDARY" />
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
        padding: 20,
    },
    logo: {
        width: '90%',
        maxWidth: 500,
        maxHeight: 350,
    },
    title: {
        fontFamily: 'Helvetica',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        margin: 30,
    },
    text: {
        fontFamily: 'Helvetica',
        fontSize: 12,
        color: 'grey',
        margin: 30,
        width: '80%',
    },
    link: {
        fontFamily: 'Helvetica',
        fontSize: 12,
        color: '#DD4D44',
        margin: 10,
        width: '80%',
        textDecorationLine: 'underline'
    }
})

export default InitialScreen