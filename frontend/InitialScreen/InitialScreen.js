import React, {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Logo from '/Users/duarte/Documents/Developer/etiket-1/frontend/images/E.png'
import Input from "../Input";
import Button from "../components/Button";

const InitialScreen = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const onSignInPressed = () => {
    console.warn("sign in");
}
const onForgotPasswordPressed = () => {
    console.warn("Forgot Password");
}

const onNewAccountPressed = () => {
    console.warn("New Account");
}

    const {height} = useWindowDimensions();
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
            <Image source={Logo} style={[styles.logo, {height: height * 0.5}]} resizeMode="contain" />

            <Input
                placeholder="email" 
                value={email}
                setValue={setEmail}
            />
            <Input 
                placeholder="password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
            />

            <Button text="Sign In" onPress={onSignInPressed}/>
            <Button text="Forgot password?" onPress={onForgotPasswordPressed} type="TERTIARY"/>
            <Button text="Don't have an account?" onPress={onNewAccountPressed} type="SECONDARY"/>
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
    }
})

export default InitialScreen