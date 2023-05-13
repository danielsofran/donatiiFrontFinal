import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import {createStackNavigator} from "@react-navigation/stack";
import Login from "./src/screens/Login";
import {NavigationContainer} from "@react-navigation/native";
import Register from "./src/screens/Register";
import AnotherComponent from "./src/xtest/TestCauzaPreview";
import { ApiTest } from "./src/xtest/AxiosTest";
import Home from "./src/screens/Home";
import CauzaCreate from "./src/components/CauzaCreate";
import TestCauzaPreview from "./src/xtest/TestCauzaPreview";
import ProfileConfig from "./src/components/ProfileConfig";
import {UserProvider} from "./src/utils/UserContext";

const Stack = createStackNavigator();

export default function App() {
   return (
           <NavigationContainer>
               <UserProvider>
                    <Stack.Navigator>
                        {/*<Stack.Screen name={"Test"} component={TestCauzaPreview} options={{headerShown: false}}/>*/}
                        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                        <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
                        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                        <Stack.Screen name="Adauga" component={CauzaCreate}/>
                    </Stack.Navigator>
                </UserProvider>
           </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
