import {ScrollView, Text, StyleSheet, View, TouchableOpacity, Platform} from "react-native";
import {useEffect, useRef, useState} from "react";
import * as Speech from 'expo-speech';
import {HelpTextsEN} from "../utils/enum/HelpTexts";
import Colors from "../utils/enum/Colors";
import {FontAwesome5, Foundation, Octicons} from "@expo/vector-icons";
import {useAuth} from "../utils/context/UseAuth";


export const Help = () => {
    // @ts-ignore
    const { allowVoice } = useAuth();
    const speechOptions = {
        language: 'en',
        pitch: 1,
        rate: 1,
        //voice: voices[3].identifier,
    };
    const HelpText = HelpTextsEN;

    const [helpTextIndex, setHelpTextIndex] = useState(0);

    useEffect(() => {
        if(allowVoice)
            Speech.speak(HelpText[helpTextIndex], speechOptions);
    }, [helpTextIndex])

    return (
        <View style={{height: '100%'}}>
            {/*<Text>Help</Text>*/}
            <View style={styles.centered}>
                <View style={styles.container}>
                    <Text style={styles.text}>{HelpText[helpTextIndex]}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    if(helpTextIndex > 0)
                        Speech.stop().finally(() => setHelpTextIndex(helpTextIndex - 1));
                }} >
                    <Text style={styles.buttonText} ><Foundation name="previous" size={styles.buttonText.fontSize + 4} color="black" /> Previous</Text>
                </TouchableOpacity>
                {allowVoice ?
                    <TouchableOpacity style={styles.button} onPress={() => {
                        Speech.stop();
                    }}>
                        <Text style={styles.buttonText}>
                            <FontAwesome5 name="volume-mute" size={styles.buttonText.fontSize + 4} color="black"/> Mute
                        </Text>
                    </TouchableOpacity> :
                    <TouchableOpacity style={styles.button} onPress={() => {
                        Speech.speak(HelpText[helpTextIndex], speechOptions);
                    }}>
                        <Text style={styles.buttonText}>
                            <Octicons name="unmute" size={styles.buttonText.fontSize+4} color="black" /> Unmute
                        </Text>
                    </TouchableOpacity>
                }

                <TouchableOpacity style={styles.button} onPress={() => {
                    if(helpTextIndex < HelpText.length - 1)
                        Speech.stop().finally(() => setHelpTextIndex(helpTextIndex + 1));
                }}>
                    <Text style={styles.buttonText}>Next <Foundation name="next" size={styles.buttonText.fontSize + 4} color="black" /></Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: Platform.OS === 'web' ? 100 : 10,
    },
    container: {
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        padding: 10,
    },
    button: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: Colors.Gray,
        padding: 10,
        width: Platform.OS === 'web' ? '20%' : '28%',
        marginTop: 20,
        borderRadius: 20,
    },
    buttonText: {
        fontSize: Platform.OS === 'web' ? 20 : 14,
        fontWeight: 'bold',
    },
    buttonContainer: {
        height: Platform.OS === 'web' ? 80 : 80,
        padding: 10,
        marginBottom: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});