import React, {useEffect} from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Image,
    Text,
    Linking, ScrollView,
} from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import ImageLayer from "../small/ImageLayer";
import {useAuth} from "../../utils/context/UseAuth";

const CustomSidebarMenu = (props) => {
    const [ecipate, setEchipate] = React.useState([]);

    useEffect(() => {
        console.log("CustomSidebarMenu");
    }, []);

    const prepareEchipate = () => {
        setEchipate([]);
        const animal = userRef.current.echipate.find(c => c.tip === 'Animal');
        const item = userRef.current.echipate.find(c => c.tip === 'Item');
        const background = userRef.current.echipate.find(c => c.tip === 'Background');
        const border = userRef.current.echipate.find(c => c.tip === 'Border');
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


    const { userRef } = useAuth();

    return (
        <SafeAreaView>
            {/*Top Large Image */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 30, marginTop: 60 }}>
                <ImageLayer images={userRef.current.echipate}/>
            </View>
            <ScrollView {...props}>
                <DrawerItemList {...props} />
            </ScrollView>
            <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
                🌐 www.WorldWildWeb.com 🐗
            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        alignSelf: 'center',
    },
    iconStyle: {
        width: 15,
        height: 15,
        marginHorizontal: 5,
    },
    customItem: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default CustomSidebarMenu;