import { StatusBar } from 'expo-status-bar';
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

const Stack = createStackNavigator();

export default function App() {
   return (
         <NavigationContainer>
            <Stack.Navigator>
                {/*<Stack.Screen name={"Test"} component={TestCauzaPreview} options={{headerShown: false}}/>*/}
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                <Stack.Screen name="Adauga" component={CauzaCreate}/>
            </Stack.Navigator>
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
