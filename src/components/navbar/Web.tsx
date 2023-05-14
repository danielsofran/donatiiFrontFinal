import React, {useState} from 'react'
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome";
import { useHover } from 'react-native-web-hooks';
import {useRoute} from "@react-navigation/native";

export default function WebNavbar({navigation, children}) {
    const cauzaRef = React.useRef(null);
    const isCauzaHovered = useHover(cauzaRef);

    const cauzeleMeleRef = React.useRef(null);
    const isCauzeleMeleRef = useHover(cauzeleMeleRef);

    const adaugaRef = React.useRef(null);
    const isAdaugaRef = useHover(adaugaRef);

    const profilRef = React.useRef(null);
    const isProfilRef = useHover(profilRef);

    const shopRef = React.useRef(null);
    const isShopRef = useHover(shopRef);

    const route = useRoute();
    const currentScreenName = route.name;

    const handleScreenPress = (screen) => {
        navigation.navigate(screen);
    };

    return (
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={() => handleScreenPress('Home')}>
                        <Icon style={{padding: 10}} name="home" size={30} color={route.name === 'Home'?'blue': "#000000AA"}/>
                    </TouchableOpacity>
                    <Text ref={cauzaRef}
                          style={[styles.navbarItem, route.name === 'Home' && styles.activeItem, {backgroundColor: isCauzaHovered ? "rgba(180,180,180,0.75)" : "transparent"}]}
                          onPress={() => handleScreenPress('Home')}>Cauze</Text>
                    <Text ref={cauzeleMeleRef}
                          style={[styles.navbarItem, route.name === 'Cauzele Mele' && styles.activeItem, {backgroundColor: isCauzeleMeleRef ? "rgba(180,180,180,0.75)" : "transparent"}]}
                          onPress={() => handleScreenPress('Cauzele Mele')}>Cauzele mele</Text>
                    <Text ref={adaugaRef}
                          style={[styles.navbarItem, route.name === 'Adauga' && styles.activeItem, {backgroundColor: isAdaugaRef ? "rgba(180,180,180,0.75)" : "transparent"}]}
                          onPress={() => handleScreenPress('Adauga')}>Adauga</Text>
                    <Text ref={shopRef}
                          style={[styles.navbarItem, route.name === 'Shop' && styles.activeItem, {backgroundColor: isShopRef ? "rgba(180,180,180,0.75)" : "transparent"}]}
                          onPress={() => handleScreenPress('Shop')}>Shop</Text>
                    <Text ref={profilRef}
                          style={[styles.navbarItem, route.name === 'Profil' && styles.activeItem, {backgroundColor: isProfilRef ? "rgba(180,180,180,0.75)" : "transparent"}]}
                          onPress={() => handleScreenPress('Profil')}>Profil</Text>
                    <TouchableOpacity onPress={() => handleScreenPress('Setari')}>
                        <Icon style={{padding: 10}} name="cog" size={30} color={route.name === 'Setari'?'blue': "#000000AA"}/>
                    </TouchableOpacity>
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
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        gap: 10,
    },
    navbarItem: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10,
    },
    activeItem: {
        color: 'blue'
    },
    content: {
        width: '100%',
    }
});