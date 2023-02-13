import React, {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Logo from "../images/E.png"
import Input from "../Input";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";


const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const onSignInPressed = () => {
        console.warn("Sign In");
    }
    const onForgotPasswordPressed = () => {
        console.warn("Forgot Password");
    }

    const onNewAccountPressed = () => {
        navigation.navigate('SignUpScreen');
    }

    const {height} = useWindowDimensions();
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            <View style={styles.root}>
            <Image source={Logo} style={[styles.logo, {height: height * 0.5}]} resizeMode="contain" />

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

            <Button text="Sign In" onPress={onSignInPressed}/>
            <Button text="Forgot password?" onPress={onForgotPasswordPressed} type="TERTIARY"/>
            <Button text="Don't have an account?" onPress={onNewAccountPressed} type="SECONDARY"/>
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
    }
})

export default SignUpScreen