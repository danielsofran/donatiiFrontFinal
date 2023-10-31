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
import {Games} from "./src/components/navbar/Games";
import Presentation from "./src/screens/Presentation";
import {FontAwesome} from "@expo/vector-icons";
import {Help} from "./src/screens/Help";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const getSymbol = (screen) => {
    switch (screen) {
        case 'Home': return '🏠';
        case 'CauzeleMele': return '🐾';
        case 'Adauga': return '➕';
        case 'Profile': return '👤';
        case 'Setari': return '⚙';
        case 'Shop': return '🛒';
        case 'Games': return '🎮';
        case 'About us': return '📖';
        case 'Help': return '❓';
    }
}

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

const questionMark = (navigation) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('HelpStack')}>
            <FontAwesome name={'question-circle-o'} size={36} color={'white'} style={{marginRight: 25}}/>
        </TouchableOpacity>
    );
}

/* region Stacks */
const HomeStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    title: getSymbol('Home')+' Home', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerRight: () => questionMark(navigation),
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
                    title: getSymbol('CauzeleMele')+' My Cases', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerRight: () => questionMark(navigation),
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
                    title: getSymbol('Adauga')+' Create a Case', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerRight: () => questionMark(navigation),
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
                    title: getSymbol('Shop')+' Shop', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerRight: () => questionMark(navigation),
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
                    title: getSymbol('Profile')+' Profile', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerRight: () => questionMark(navigation),
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

const GamesStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Games">
            <Stack.Screen
                name="Games"
                component={Games}
                options={{
                    title: getSymbol('Games')+'️ Games', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerRight: () => questionMark(navigation),
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
                    title: getSymbol('Setari')+'️ Settings', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerRight: () => questionMark(navigation),
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

const HelpStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Help">
            <Stack.Screen
                name="Help"
                component={Help}
                options={{
                    title: getSymbol('Help')+'️ Help', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    // headerRight: () => questionMark(navigation),
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

const AboutUsStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="About us">
            <Stack.Screen
                name="About us"
                component={Presentation}
                options={{
                    title: getSymbol('About us')+'️ Settings', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerRight: () => questionMark(navigation),
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
                options={{drawerLabel: getSymbol("Home")+" Home"}}/>
            <Drawer.Screen
                name="CauzeleMeleStack"
                component={CauzeleMeleStack}
                options={{drawerLabel: getSymbol("CauzeleMele")+" My Cases"}}/>
            <Drawer.Screen
                name="AdaugaStack"
                component={AdaugaStack}
                options={{drawerLabel: getSymbol("Adauga")+" Create a Case"}}/>
            <Drawer.Screen
                name="ShopStack"
                component={ShopStack}
                options={{drawerLabel: getSymbol("Shop")+" Shop"}}/>
            <Drawer.Screen
                name="GamesStack"
                component={GamesStack}
                options={{drawerLabel: getSymbol("Games")+"️ Games"}}/>
            <Drawer.Screen
                name="ProfilStack"
                component={ProfilStack}
                options={{drawerLabel: getSymbol("Profile")+" Profile"}}/>
            <Drawer.Screen
                name="SetariStack"
                component={SetariStack}
                options={{drawerLabel: getSymbol("Setari")+"️ Settings"}}/>
            <Drawer.Screen
                name="HelpStack"
                component={HelpStack}
                options={{drawerLabel: getSymbol("Help")+"️ Help"}}/>
            <Drawer.Screen
                name="AboutUsStack"
                component={AboutUsStack}
                options={{drawerLabel: getSymbol("About us")+"️ About us"}}/>
        </Drawer.Navigator>
    )
}