import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Image, ActivityIndicator} from 'react-native';
import * as FileSystem from 'expo-file-system';

const HeartsStream = (props) => {
    const [showComponent, setShowComponent] = useState(true);
    const [source, setSource] = useState({uri: '../../../assets/animations/hearts.gif', time: Date.now()})
    const seconds = 3;

    useEffect(() => {

        //FileSystem.uploadAsync('https://media.giphy.com/media/3o7aD2X9Y5W5XxUjSU/giphy.gif', './')
        const timeout = setTimeout(() => {
            setShowComponent(false);
            setSource({uri: source.uri, time: Date.now()})
        }, seconds * 1000); // unload component after 5 seconds
        return () => clearTimeout(timeout);
    }, []);

    if (!showComponent) {
        return null;
    }


    return (
        <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
                <Image
                    source={require('../../../assets/animations/hearts.gif')}
                    style={{ width: 200, height: 200 }}
                />
            </View>
        </View>
    );
};

export default HeartsStream;

const styles = StyleSheet.create({
    modalBackground: {
        position: 'absolute',
        right: 20,
        height: '100%',
        width: '40%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    activityIndicatorWrapper: {
        backgroundColor: 'transparent',
        height: 100,
        width: 100,
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