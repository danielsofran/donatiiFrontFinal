import React, {useContext, useEffect, useRef} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import ShopItem from "../components/small/ShopItem";
import {UserContext} from "../utils/UserContext";
import {axiosInstance} from "../api/axiosInstance";
import {Costumizabil} from "../model/Costumizabil";
import ImageLayer from "../components/small/ImageLayer";
import {Tip} from "../model/Enums";

const Shop = () => {
    const [costumizabile, setCostumizabile] = React.useState([]);
    const [echipate, setEchipate] = React.useState([]);

    const prepareEchipate = () => {
        setEchipate([]);
        const animal = userRef.current.echipate.find(c => c.tip === 'Animal');
        const item = userRef.current.echipate.find(c => c.tip === 'Item');
        const background = userRef.current.echipate.find(c => c.tip === 'Background');
        const border = userRef.current.echipate.find(c => c.tip === 'Border');
        if(background) {
            setEchipate((prevEchipate) => [...prevEchipate, { tip: 'Background', url: background.url }]);
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
        console.log(userRef.current.echipate)
        prepareEchipate();

        // pregatire echipate

    },[])

    // @ts-ignore
    const { userRef } = useContext(UserContext);

    return (
        <ScrollView>
            <ImageLayer images={echipate}/>
            <View style={styles.container}>
                {costumizabile.map(item => (
                    <ShopItem key={item.id} item={item} user={userRef} call={setEchipate}/>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
});

export default Shop;
