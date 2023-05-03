import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "../Login";
import Register from "../Register";
import TestCauzaPreview from "../../xtest/TestCauzaPreview";

const Stack = createStackNavigator();
const Autentification = () => {

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name={"TestCauzaPrewiew"} component={TestCauzaPreview} />
                {/*<Stack.Screen name="Login" component={Login} />*/}
                {/*<Stack.Screen name="Register" component={Register} />*/}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Autentification;