import React from "react";
import { View, Text} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const Navigation = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                //TODO: Fix this
                //<Stack.Screen name="InitialScreen" component={InitialScreen} />
                    
            </Stack.Navigator>
        </NavigationContainer>
        
    )
}

export default Navigation;