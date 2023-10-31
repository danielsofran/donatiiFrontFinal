import React, {useContext, useEffect, useRef} from 'react';
import {ScrollView, StyleSheet, View, Image, Text, Platform} from 'react-native';
import ShopItem from "../components/small/ShopItem";
import {UserContext} from "../utils/context/UserContext";
import {axiosInstance} from "../api/axiosInstance";
import {Costumizabil} from "../model/Costumizabil";
import ImageLayer from "../components/small/ImageLayer";
import {Tip} from "../model/Enums";
import {LinearGradient} from "expo-linear-gradient";
import {MaterialIcons} from "@expo/vector-icons";
import {useAuth} from "../utils/context/UseAuth";

const Shop = () => {
    // @ts-ignore
    const { user } = useAuth();
    const [costumizabile, setCostumizabile] = React.useState(user.costumizabile);
    const [echipate, setEchipate] = React.useState(user.echipate);
    const [equippedItemId, setEquippedItemId] = React.useState(null);

    const prepareEchipate = () => {
        setEchipate([]);
        const animal = user.echipate.find(c => c.tip === 'Animal');
        const item = user.echipate.find(c => c.tip === 'Item');
        const background = user.echipate.find(c => c.tip === 'Background');
        const border = user.echipate.find(c => c.tip === 'Border');
        if(!background) {
            setEchipate((prevEchipate) => [...prevEchipate, { tip: 'Background', url: 'default' }]);
        }
        if(background) {
            setEchipate((prevEchipate) => [...prevEchipate, { tip: 'Background', url: background.url }]);
        }
        if(!animal) {
            setEchipate((prevEchipate) => [...prevEchipate, { tip: 'Animal', url: 'default' }]);
            return;
        }
        if(animal && item) {
            setEchipate((prevEchipate) => [...prevEchipate, { tip: 'ItemAnimal', url: animal.url + '-' + item.url }]);
        }
        else if(animal) {
            setEchipate((prevEchipate) => [...prevEchipate, { tip: 'Animal', url: animal.url }]);
        }
        else if(item) {
            setEchipate((prevEchipate) => [...prevEchipate, { tip: 'Item', url: item.url }]);
        }
        if(border) {
            setEchipate((prevEchipate) => [...prevEchipate, { tip: 'Border', url: border.url }]);
        }
    }

    useEffect(() => {
        axiosInstance.get('/costumizabile').then((response) => {
            setCostumizabile(new Costumizabil().deserializeArray(response.data));
        }).catch(error => {
            console.log(error.response.data)
        });
        console.log(user.echipate)

        // pregatire echipate

    },[]);

    useEffect(() => {
        console.log(user.coins, user.level)
    }, [user])

    return (
        <ScrollView style={{width: '100%', padding: 0, margin: 0}}>
            <Image style={styles.background} source={require('../../assets/WildBackground.jpg')}></Image>
            <View style={styles.header}>
                <LinearGradient colors={['rgba(118,210,196,0.67)', 'rgba(118,210,196,0.43)', 'transparent']} style={{position: 'absolute', left: 0, right: 0, top: 0, height: "100%"}}/>
                <View style={{
                    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: Platform.OS === 'web' ? 100 : 0,
                }}>
                    <View style={styles.leftView}>
                        <Text style={styles.leftText}>Coins: {user.coins}💰</Text>
                        <Text style={styles.leftText}>Level: {user.level}<MaterialIcons name="upgrade" size={styles.leftText.fontSize} color="aqua" /></Text>
                    </View>
                    <View>
                        <Text style={styles.prewiewText}>AVATAR</Text>
                        <ImageLayer images={echipate} size={300}/>
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                {costumizabile.map(item => (
                    <ShopItem key={item.id} item={item} call={prepareEchipate} setEquippedItemId={setEquippedItemId} equippedItemId={equippedItemId} />
                ))}
            </View>


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        padding: 0,
        margin: 0,
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    prewiewText: {
        fontFamily: 'Roboto',
        fontSize: 32,
        fontWeight: 'bold',
        color: 'whitesmoke',
        textAlign: 'center',
        textShadowColor: 'rgba(255,255,255,0.75)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 10,
        marginBottom: 7,
        zIndex: 5,
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 40,
        marginBottom: 20,
    },
    leftView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginRight: 20,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.29)',
        margin: 50,
        padding: 30,
        // position: 'absolute',
        // zIndex: 5,
        // top: 20,
        // right: 20,
    },
    leftText: {
        fontFamily: 'Roboto',
        fontSize: Platform.OS === 'web' ? 46 : 24,
        fontWeight: 'bold',
        color: 'whitesmoke',
        textShadowColor: 'rgba(255,255,255,0.75)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 10,
        marginBottom: 7,
    }
});

export default Shop;
