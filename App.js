import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import {createStackNavigator} from "@react-navigation/stack";
import Login from "./src/screens/Login";
import {NavigationContainer} from "@react-navigation/native";
import Register from "./src/screens/Register";
import AnotherComponent from "./src/xtest/TestCauzaPreview";
import { ApiTest } from "./src/xtest/AxiosTest";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          {/*<Stack.Screen name={"Test"} component={ApiTest} />*/}
          {<Stack.Screen name="Login" component={Login} />}
          {<Stack.Screen name="Register" component={Register} />}
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
