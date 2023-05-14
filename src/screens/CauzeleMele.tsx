import {User} from "../model/User";
import {View, Text, StyleSheet} from "react-native";
import Colors from "../utils/Colors";
import {CauzeList} from "../components/CauzeList";
import {useEffect, useState} from "react";
import {axiosInstance} from "../api/axiosInstance";
import {Cauza, deserializeCauzaArray} from "../model/Cauza";
import WebNavbar from "../components/navbar/Web";
import {useAuth} from "../utils/UseAuth";
import {Banner} from "../components/small/Banner";

const CauzeleMele = ({ navigation }) => {

    // @ts-ignore
    const { userRef } = useAuth();

    return (
        <WebNavbar navigation={navigation}>
            <CauzeList cauze={userRef.current.cauze} user={userRef.current}/>
        </WebNavbar>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

export default CauzeleMele;