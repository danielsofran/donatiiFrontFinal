import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import {createStackNavigator} from "@react-navigation/stack";
import Login from "./src/screens/Login";
import {NavigationContainer} from "@react-navigation/native";
import Register from "./src/screens/Register";
import Home from "./src/screens/Home";
import CauzaCreate from "./src/screens/CauzaCreate";
import ProfileConfig from "./src/screens/ProfileConfig";
import {UserProvider} from "./src/utils/UserContext";
import {Setari} from "./src/screens/Setari";
import CauzeleMele from "./src/screens/CauzeleMele";

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
                        <Stack.Screen name="Cauzele Mele" component={CauzeleMele} options={{headerShown: false}}></Stack.Screen>
                        <Stack.Screen name="Adauga" component={CauzaCreate} options={{headerShown: false}}></Stack.Screen>
                        <Stack.Screen name="Profil" component={ProfileConfig} options={{headerShown: false}}></Stack.Screen>
                        <Stack.Screen name="Setari" component={Setari} options={{headerShown: false}}></Stack.Screen>
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
