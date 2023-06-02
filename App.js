import React, {useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import {createStackNavigator} from "@react-navigation/stack";
import Login from "./src/screens/Login";
import {NavigationContainer} from "@react-navigation/native";
import Register from "./src/screens/Register";
import Home from "./src/screens/Home";
import CauzaCreate from "./src/screens/CauzaCreate";
import ProfileConfig from "./src/screens/ProfileConfig";
import {UserContext, UserProvider} from "./src/utils/context/UserContext";
import {Setari} from "./src/screens/Setari";
import CauzeleMele from "./src/screens/CauzeleMele";
import {Main} from "./Main";
import CauzaUpdate from "./src/screens/CauzaUpdate";
import colors from "./src/utils/enum/Colors";

const Stack = createStackNavigator();

export default function App() {

   return (
       <NavigationContainer>
           <UserProvider>
                <Stack.Navigator>
                    {/*<Stack.Screen name={"Test"} component={TestCauzaPreview} options={{headerShown: false}}/>*/}
                    <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                    <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
                    <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
                    <Stack.Screen name="Edit" component={CauzaUpdate} options={{headerShown: false}}/>
                </Stack.Navigator>
            </UserProvider>
       </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
