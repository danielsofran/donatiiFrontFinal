import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {axiosInstance} from "../../api/axiosInstance";

const ShopItem = ({ item, user }) => {
    const [isDisabled, setIsDisabled] = useState(user.current.level < item.levelMin || user.current.coins < item.costBani);
    const [isPurchased, setIsPurchased] = useState(user.current.costumizabile.find(c => c.id === item.id));
    const [isEquipped, setIsEquiped] = useState(user.current.echipate.find(c => c.id === item.id));

    const handleBuy = () => {
        if(isDisabled)
            return;

        if(!isPurchased) {
            console.log('BUY');
            setIsPurchased(true);
            axiosInstance.put(`/user/buy/${user.current.id}/${item.id}`).then((response) => {
                console.log(response.data);
                user.current.costumizabile.push(item);
            }).catch(error => {
                console.log(error.response.data)
            });
        }
        else {
            if(isEquipped) {
                console.log('UNEQUIPED');
                setIsEquiped(false);
                axiosInstance.put(`/user/disequip/${user.current.id}/${item.id}`).then((response) => {
                    console.log(response.data);
                    user.current.echipate = user.current.echipate.filter(c => c.id !== item.id);
                }).catch(error => {
                    console.log(error.response.data)
                });
            }
            else {
                console.log('EQUIPED');
                setIsEquiped(true);
                axiosInstance.put(`/user/equip/${user.current.id}/${item.id}`).then((response) => {
                    console.log(response.data);
                    user.current.echipate.push(item);
                }).catch(error => {
                    console.log(error.response.data)
                });
            }
        }
    };

    useEffect(() => {

    }, []);

    const styles = StyleSheet.create({
        container: {
            margin: 16,
            borderRadius: 16,
            height: 400,
            width: 300,
            borderWidth: 5,
            backgroundColor: 'rgba(210,196,177,0.48)',
            borderColor: 'rgba(173,173,173,0.68)',
            alignItems: 'center',
            boxShadow: '0px 0px 20px rgba(184, 134, 11, 0.3)'
        },
        box: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#D6A2E8',
            borderWidth: 2,
            borderColor: '#FFF',
        },
        image: {
            width: 250,
            height: 250,
            marginBottom: 8,
        },
        level: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8,
        },
        price: {
            fontSize: 16,
            color: '#888888',
        },
        buyButton: {
            margin: 16,
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: isPurchased?(isEquipped?'#e14040':'#47e144'):'#56a7ff',
            borderRadius: 8,
            opacity: isDisabled?0.3:1,
            width: '80%',
            alignItems: 'center',
        },
        buyButtonText: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
        },
    });

    return (
        <View style={styles.container}>
            <Image source={item.url} style={styles.image} />
            <Text style={styles.level}>Required level: {item.levelMin}</Text>
            <Text style={styles.price}>Price: {item.costBani}</Text>
            <TouchableOpacity style={styles.buyButton} onPress={handleBuy} disabled={isDisabled}>
                <Text style={styles.buyButtonText}>{isPurchased?(isEquipped?'Disequip':'Equip'):'Buy'}</Text>
            </TouchableOpacity>
        </View>

    );
};

export default ShopItem;
