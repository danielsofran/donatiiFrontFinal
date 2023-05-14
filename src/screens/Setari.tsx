import {View, Text, StyleSheet, TouchableOpacity, Platform} from "react-native";
import React, {useState} from "react";
import {useAuth} from "../utils/UseAuth";
import Colors from "../utils/Colors";
import WebNavbar from "../components/navbar/Web";

export const Setari = ({ navigation }) => {
    const [permisiuneLocatie, setPermisiuneLocatie] = useState(localStorage.getItem(`locatie{userRef.current.id}`) === 'true');

    // @ts-ignore
    const { userRef } = useAuth();

    const styles = StyleSheet.create({
        containerWeb: {
            marginHorizontal: 300,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-around',
            padding: 10,
            maxHeight: 200,
        },
        containerMobile: {

        },
        button: {
            alignItems: 'center',
            backgroundColor: permisiuneLocatie? 'blue': 'red',
            padding: 10,
            borderRadius: 5,
        },
        buttonText: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
        },
        logoutButton: {
            alignItems: 'center',
            backgroundColor: Colors.Gray,
            padding: 10,
            borderRadius: 5,
        },
        logoutButtonText: {
            color: 'black',
            fontWeight: 'bold',
            fontSize: 16,
        },
    });

    function changePermisiune() {
        setPermisiuneLocatie(!permisiuneLocatie);
        localStorage.setItem(`locatie{userRef.current.id}`, (!permisiuneLocatie).toString());
    }

    function handleLogout() {
        userRef.current = {};
        localStorage.setItem(`userRef`, '');
        navigation.navigate('Login');
    }

    return (
        <WebNavbar navigation={navigation}>
            <View style={Platform.OS === 'web'? styles.containerWeb: styles.containerMobile}>
                <TouchableOpacity onPress={changePermisiune} style={styles.button}>
                    <Text style={styles.buttonText}>{permisiuneLocatie? 'Refuza accesul la locatie': 'Permite accesul la locatie'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </WebNavbar>
    );
};