import React, {useContext, useEffect} from 'react';
import { View, useWindowDimensions, StyleSheet, ScrollView } from 'react-native';
import ShopItem from "../components/small/ShopItem";
import {UserContext} from "../utils/UserContext";
import {axiosInstance} from "../api/axiosInstance";
import {TagAnimal} from "../model/TagAnimal";
import {Costumizabil} from "../model/Costumizabil";

const Shop = () => {
    const [costumizabile, setCostumizabile] = React.useState([]);

    useEffect(() => {
        axiosInstance.get('/costumizabile').then((response) => {
            setCostumizabile(new Costumizabil().deserializeArray(response.data));
        }).catch(error => {
            console.log(error.response.data)
        });
    },[])

    // @ts-ignore
    const { userRef } = useContext(UserContext);

    return (
        <ScrollView>
            <View style={styles.container}>
                {costumizabile.map(item => (
                    <ShopItem key={item.id} item={item} user={userRef}/>
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
