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

    useEffect(() => {
        console.log("CustomSidebarMenu");
    }, []);

    const { user } = useAuth();

    return (
        <ScrollView>
            {/*Top Large Image */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 30, marginTop: 60 }}>
                <ImageLayer images={user.echipate} size={200}/>
            </View>
            <ScrollView {...props}>
                <DrawerItemList {...props} />
            </ScrollView>
            <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey', marginBottom: 16 }}>
                🌐 www.WorldWildWeb.com 🐗
            </Text>
        </ScrollView>
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