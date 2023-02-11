import React from "react";
import { View, Text, TextInput, StyleSheet} from "react-native";

const Input = ({value, setValue, placeholder, secureTextEntry}) => {
    return (
        <View style={styles.container}>
            <TextInput 
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                placeholderTextColor="grey"
                style={styles.input}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#343434',
        borderRadius: 20,
        width: '85%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 15,
    },
    input: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Helvetica'
    },
});

export default Input