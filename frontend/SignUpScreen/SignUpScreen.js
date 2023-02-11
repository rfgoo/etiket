import React, { useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Input from "../Input";
import Button from "../components/Button";

const InitialScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const onRegisterPressed = () => {
        console.warn("Register");
    }
    const onForgotPasswordPressed = () => {
        console.warn("Forgot Password");
    }

    const onSignInPressed = () => {
        console.warn("New Account");
    }

    const { height } = useWindowDimensions();
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>

                <Text style={styles.title}>Create Account</Text>
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

                <Button text="Register" onPress={onRegisterPressed} />
                <Text style={styles.text}>By registering, you confirm that you accept our <Text style={styles.link}>Terms of Use</Text> and <Text style={styles.link}>Privacy Policy</Text></Text>
                <Button text="Already have an account?" onPress={onSignInPressed} type="SECONDARY" />
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 10,
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
        margin: 10,
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