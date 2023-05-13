import React from 'react'
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome";
import { useHover } from 'react-native-web-hooks';
import {UserProvider} from "../../utils/UserContext";
import {useAuth} from "../../utils/UseAuth";

export default function WebNavbar({navigation, children}) {
    const cauzaRef = React.useRef(null);
    const isCauzaHovered = useHover(cauzaRef);

    return (
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Icon style={{padding: 10}} name="home" size={30} color="#000000AA"/>
                    </TouchableOpacity>
                    <Text ref={cauzaRef}
                          style={[styles.navbarItem, {backgroundColor: isCauzaHovered ? "rgba(180,180,180,0.75)" : "transparent"}]}
                          onPress={() => navigation.navigate('Home')}>Cauze</Text>
                    <Text style={styles.navbarItem} onPress={() => navigation.navigate('Adauga')}>Adauga</Text>
                    <Text style={styles.navbarItem} onPress={() => navigation.navigate('Profil')}>Profil</Text>
                </View>
                <View style={styles.content}>
                    {children}
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: "100%",
    },
    navbar: {
        width: '100%',
        backgroundColor: 'rgba(192,192,192,0.72)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
    },
    navbarItem: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10,
    },
    content: {
        width: '100%',
        paddingHorizontal: "10%",
    }
});