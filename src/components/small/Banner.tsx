import {Animated, Image, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";

const messages =
    ['Every little bit counts! Your donation, no matter how small, can make a huge difference in the life of an animal in need.',

    'By donating to animal organizations, you are not just helping one animal, but you are contributing to the well-being of entire species.',

    'The world needs more compassionate individuals like you who are willing to make a difference in the lives of animals through their generous donations.',

    'Animals rely on us to be their voice and protect them from harm. Your donation can help provide food, shelter, and medical care for animals in need.',

    'Imagine the joy and relief you can bring to an animal in need through your donation. Your generosity can help give them a second chance at life.',

    'Donating to animal organizations is a powerful way to demonstrate your compassion for all living beings and to make a positive impact in the world.',

    'With your support, we can work towards a future where animals are treated with the love and respect they deserve. Your donation can help make this a reality.',

    'Your donation today can help provide vital resources for animal shelters and rescue organizations, which are often overburdened and underfunded.',

    'The animals thank you for your kindness and generosity. Your donation can make a real difference in their lives and help them thrive.',

    'Together, we can make a difference in the world and help ensure that all animals are treated with compassion, kindness, and respect. Thank you for considering a donation to support this important cause.',
    ];

export const Banner = ({active}) => {
    const [visible, setVisible] = useState(active);
    const opacity = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(-100)).current;
    const color = useRef(new Animated.Value(0)).current;

    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 10));

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
        }).start();
        Animated.loop(
            Animated.sequence([
                Animated.timing(translateX, {
                    toValue: 100,
                    duration: 2500,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: -100,
                    duration: 2500,
                    useNativeDriver: true,
                }),
        ])).start();
        Animated.loop(
            Animated.sequence([
                Animated.timing(color, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: false,
                }),
                Animated.timing(color, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: false,
                }),
        ])).start();
    }, []);

    const interpolatedColor = color.interpolate({
        inputRange: [0, 1],
        outputRange: ['#7c0085', '#000685'],
    });

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={visible}
            onRequestClose={() => {
                console.log('close modal');
                setVisible(false);
            }}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <Animated.Text style={{
                        opacity: opacity,
                        transform: [{ translateX }],
                        color: interpolatedColor,
                        fontSize: 30,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        textShadowColor: '#ccc',
                        textShadowOffset: { width: 2, height: 2 },
                        textShadowRadius: 5,
                    }}>{messages[randomNumber]}</Animated.Text>
                    <TouchableOpacity onPress={() => setVisible(false)}>
                        <Text style={{
                            fontSize: 16,
                            marginTop: 10,
                        }}
                        >Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    activityIndicatorWrapper: {
        backgroundColor: 'transparent',
        height: 100,
        width: 300,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});