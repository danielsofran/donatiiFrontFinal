import {User} from "../model/User";
import {View, Text, StyleSheet} from "react-native";
import Colors from "../utils/Colors";
import {CauzeList} from "../components/CauzeList";
import React, {useEffect, useState} from "react";
import {axiosInstance} from "../api/axiosInstance";
import {Cauza, deserializeCauzaArray} from "../model/Cauza";
import WebNavbar from "../components/navbar/Web";
import {useAuth} from "../utils/UseAuth";
import {Banner} from "../components/small/Banner";
import {handlePress} from "react-native-paper/lib/typescript/src/components/RadioButton/utils";
import {purple50} from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";
import colors from "../utils/Colors";

const CauzeleMele = ({ navigation }) => {

    // @ts-ignore
    const { userRef } = useAuth();

    function goToAdauga() {
        navigation.navigate('Adauga');
    }

    return (
        <WebNavbar navigation={navigation}>
            {userRef.current.cauze.length > 0?
                <CauzeList cauze={userRef.current.cauze} user={userRef.current}/>:
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        marginTop: 50,
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#003ea1',
                        textAlign: 'center',
                    }}>
                        Nu aveti nicio cauza postata.{' '}
                        <Text style={{color: 'purple'}} onPress={goToAdauga} selectable={false}>Adaugati una?</Text>
                    </Text>
                </View>
            }
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