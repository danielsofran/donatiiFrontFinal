import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {API_URL, axiosInstance} from "../../api/axiosInstance";
import {Costumizabil, CostumizabilState} from "../../model/Costumizabil";
import {UserContext} from "../../utils/context/UserContext";
import {useAuth} from "../../utils/context/UseAuth";
import {User} from "../../model/User";

const ShopItem = ({ item, call, setEquippedItemId, equippedItemId }) => {
    // @ts-ignore
    const { user, setUser } = useAuth();
    //
    const [isDisabled, setIsDisabled] = useState(user.level < item.levelMin || user.coins < item.costBani);
    const [isPurchased, setIsPurchased] = useState(user.costumizabile.find(c => c.id === item.id));
    const [isEquipped, setIsEquiped] = useState(user.echipate.find(c => c.id === item.id));

    useEffect(() => {
        setIsEquiped(user.echipate.find(c => c.id === item.id));
    }, [user, equippedItemId]);

    //
    // useEffect(() => {
    //     console.warn('useEffect ShopItem');
    //     setIsDisabled(userRef.current.level < item.levelMin || userRef.current.coins < item.costBani);
    //     setIsPurchased(userRef.current.costumizabile.find(c => c.id === item.id));
    //     setIsEquiped(userRef.current.echipate.find(c => c.id === item.id));
    // }, [userRef.current]);

    const handleBuy = () => {{
        if(isDisabled)
            return;

        if(!isPurchased) { // not purchased
            console.log('BUY');
            axiosInstance.put(`/user/buy/${user.id}/${item.id}`).then((response) => {
                console.log(response.data);
                setIsPurchased(true);
                user.costumizabile.push(item);
                user.coins -= item.costBani;
                setUser(User.copy(user));
            }).catch(error => {
                console.log(error.response.data)
            });
        }
        else if(isEquipped) {
            console.log('UNEQUIPED');
            axiosInstance.put(`/user/disequip/${user.id}/${item.id}`).then((response) => {
                //console.log(response.data);
                setIsEquiped(false);
                user.echipate = new Costumizabil().deserializeArray(response.data);
                call();
            }).catch(error => {
                console.log(error.response.data)
            });
        }
        else {
            axiosInstance.put(`/user/equip/${user.id}/${item.id}`)
                .then((response) => {
                    setIsEquiped(true);
                    user.echipate = new Costumizabil().deserializeArray(response.data);
                    call();
                    setEquippedItemId(item.id); // Set the equipped item ID
                })
                .catch(error => {
                    console.log(error.response.data);
                });
        }
        }
    };

    const styles = StyleSheet.create({
        container: {
            margin: 16,
            paddingTop: 16,
            borderRadius: 16,
            height: 400,
            width: 300,
            borderWidth: 5,
            backgroundColor: 'rgba(210,196,177,0.68)',
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
            borderRadius: 5,
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
            <Image source={{uri: `${API_URL}/item/${item.tip.toString()}/${item.url}`}} style={styles.image} />
            <Text style={styles.level}>Required level: {item.levelMin}</Text>
            <Text style={styles.price}>Price: {item.costBani}</Text>
            <TouchableOpacity style={styles.buyButton} onPress={handleBuy} disabled={isDisabled}>
                <Text style={styles.buyButtonText}>{isPurchased?(isEquipped?'Disequip':'Equip'):'Buy'}</Text>
            </TouchableOpacity>
        </View>

    );
};

export default ShopItem;
