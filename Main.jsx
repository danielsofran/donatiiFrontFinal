import {createDrawerNavigator} from "@react-navigation/drawer";
import Home from "./src/screens/Home";
import CauzeleMele from "./src/screens/CauzeleMele";
import CauzaCreate from "./src/screens/CauzaCreate";
import ProfileConfig from "./src/screens/ProfileConfig";
import {Setari} from "./src/screens/Setari";
import React from "react";
import CustomSidebarMenu from "./src/components/navbar/CostumSidebarMenu";
import {Image, TouchableOpacity, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import Shop from "./src/screens/Shop";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const NavigationDrawerStructure = (props) => {
    //Structure for the navigatin Drawer
    const toggleDrawer = () => {
        //Props to open/close the drawer
        //console.log(props.navigationProps)
        props.navigationProps.toggleDrawer();
    };

    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={toggleDrawer}>
                {/*Donute Button Image */}
                <Image
                    source={{
                        uri:
                            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
                    }}
                    style={{ width: 25, height: 25, marginLeft: 5 }}
                />
            </TouchableOpacity>
        </View>
    );
};

/* region Stacks */
const HomeStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    title: '🏠 Home', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: 'rgba(127, 127, 213, 1)', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
}

const CauzeleMeleStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="CauzeleMele">
            <Stack.Screen
                name="CauzeleMele"
                component={CauzeleMele}
                options={{
                    title: 'My Cases', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: 'rgba(127, 127, 213, 1)', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
}

const AdaugaStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Adauga">
            <Stack.Screen
                name="Adauga"
                component={CauzaCreate}
                options={{
                    title: 'Create a Case', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: 'rgba(127, 127, 213, 1)', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
}

const ShopStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Shop">
            <Stack.Screen
                name="Shop"
                component={Shop}
                options={{
                    title: '🛒 Shop', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: 'rgba(127, 127, 213, 1)', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
}

const ProfilStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Profil">
            <Stack.Screen
                name="Profil"
                component={ProfileConfig}
                options={{
                    title: 'Profile', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: 'rgba(127, 127, 213, 1)', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
}

const SetariStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Setari">
            <Stack.Screen
                name="Setari"
                component={Setari}
                options={{
                    title: '⚙️ Settings', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: 'rgba(127, 127, 213, 1)', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
}
/* endregion */

export const Main = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                activeTintColor: 'rgba(127, 127, 213, 1)',
                itemStyle: { marginVertical: 5 },
                headerShown: false
            }}
            drawerContent={(props) => <CustomSidebarMenu {...props} />}
        >
            <Drawer.Screen
                name="HomeStack"
                component={HomeStack}
                options={{drawerLabel: "🏠 Home"}}/>
            <Drawer.Screen
                name="CauzeleMeleStack"
                component={CauzeleMeleStack}
                options={{drawerLabel: "🐾 My Cases"}}/>
            <Drawer.Screen
                name="AdaugaStack"
                component={AdaugaStack}
                options={{drawerLabel: "➕ Create a Case"}}/>
            <Drawer.Screen
                name="ShopStack"
                component={ShopStack}
                options={{drawerLabel: "🛒 Shop"}}/>
            <Drawer.Screen
                name="ProfilStack"
                component={ProfilStack}
                options={{drawerLabel: "👤 Profile"}}/>
            <Drawer.Screen
                name="SetariStack"
                component={SetariStack}
                options={{drawerLabel: "⚙️ Settings"}}/>
        </Drawer.Navigator>
    )
}