import {View, Text, StyleSheet, TouchableOpacity, Platform} from "react-native";
import React, {useEffect, useState} from "react";
import {useAuth} from "../utils/UseAuth";
import Colors from "../utils/Colors";
import WebNavbar from "../components/navbar/Web";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Setari = ({ navigation }) => {
    // @ts-ignore
    const { userRef } = useAuth();

    //const [permisiuneLocatie, setPermisiuneLocatie] = useState(localStorage.getItem(`locatie${userRef.current.id}`) === 'true');
    const [permisiuneLocatie, setPermisiuneLocatie] = useState(false);
    //const [permisiuneMesaje, setPermisiuneMesaje] = useState(localStorage.getItem(`mesaje${userRef.current.id}`) === 'true');
    const [permisiuneMesaje, setPermisiuneMesaje] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem(`locatie${userRef.current.id}`).then((value) => setPermisiuneLocatie(value === 'true'));
        AsyncStorage.getItem(`mesaje${userRef.current.id}`).then((value) => setPermisiuneMesaje(value === 'true'));
    }, []);

    function changePermisiune() {
        setPermisiuneLocatie(!permisiuneLocatie);
        AsyncStorage.setItem(`locatie${userRef.current.id}`, (permisiuneLocatie).toString()).then(() => alert('Change saved!'));
    }

    function changeMesaje() {
        setPermisiuneMesaje(!permisiuneMesaje);
        AsyncStorage.setItem(`mesaje${userRef.current.id}`, (permisiuneMesaje).toString()).then(() => alert('Change saved!'));
    }

    function handleLogout() {
        userRef.current = {};
        AsyncStorage.setItem(`userRef`, '').then(() => navigation.navigate('Login'));
    }

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
            display: 'flex',
            gap: 10,
            marginHorizontal: 50,
            marginTop: 10,
        },
        button: {
            alignItems: 'center',
            backgroundColor: permisiuneLocatie? 'blue': 'red',
            padding: 10,
            borderRadius: 5,
        },
        buttonMesaje: {
            alignItems: 'center',
            backgroundColor: permisiuneMesaje? 'blue': 'red',
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

    return (
        <View style={Platform.OS === 'web'? styles.containerWeb: styles.containerMobile}>
            <TouchableOpacity onPress={changePermisiune} style={styles.button}>
                <Text style={styles.buttonText}>{permisiuneLocatie? 'Refuza accesul la locatie': 'Permite accesul la locatie'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={changeMesaje} style={styles.buttonMesaje}>
                <Text style={styles.buttonText}>{permisiuneMesaje? 'Dezactiveaza mesajele incurajatoare': 'Activeaza mesajele incurajatoare'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};