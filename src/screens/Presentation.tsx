import React from 'react';
import {View, Text, Linking, StyleSheet, Platform, TouchableOpacity} from 'react-native';

const PresentationPage = () => {
    const handleLink = (name: string) => {
        switch(name) {
            case 'Demian':
                Linking.openURL('https://www.linkedin.com/in/catalin-demian/');
                break;
            case 'Negrea':
                Linking.openURL('https://www.linkedin.com/in/negreaa/');
                break;
            case 'Sofran':
                Linking.openURL('https://www.linkedin.com/in/daniel-%C5%9Fofran/');
                break;
            case 'Suciu':
                Linking.openURL('https://www.linkedin.com/in/sergiu-eduard-suciu-340343227/');
                break;
            default:
                break;
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>And this is our {Platform.OS} application for Medii de proiectare si programare course</Text>
            <Text style={styles.description}>Hope you will enjoy it!</Text>
            <TouchableOpacity onPress={() => handleLink('Demian')}>
                <Text style={styles.persons}>👨🏼‍💻 <Text style={{fontStyle: 'italic', fontSize: 18}}>Demian Catalin, group 222</Text></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLink('Negrea')}>
                <Text style={styles.persons}>👨‍💻 <Text style={{fontStyle: 'italic', fontSize: 18}}>Negrea Andrei, group 225</Text></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLink('Sofran')}>
                <Text style={styles.persons}>👨🏻‍💻 <Text style={{fontStyle: 'italic', fontSize: 18}}>Sofran Daniel, group 227</Text></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLink('Suciu')}>
                <Text style={styles.persons}>👨🏽‍💻 <Text style={{fontStyle: 'italic', fontSize: 18}}>Suciu sergiu, group 225</Text></Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: 'rgba(127, 127, 213, 1)',
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'rgba(127, 127, 213, 1)',
        marginBottom: 20,
    },
    persons: {
        fontSize: 32,
        marginBottom: 20,
        textAlign: 'center',
        color: 'rgb(0,178,255)',
    },
});

export default PresentationPage;