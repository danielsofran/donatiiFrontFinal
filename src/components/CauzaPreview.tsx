import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Colors from "../utils/Colors";
import PictureNavigator from "./small/PictureNavigator";
import Progress from "./small/Progress";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Cauza, CauzaAdapost, CauzaPersonala} from "../model/Cauza";
import HeartsStream from "./small/HeartsStream";
import {AnimalsTag, AnimalTag} from "./small/AnimalTag";
import {LinearGradient} from "expo-linear-gradient";
import {User} from "../model/User";


const CauzaPreview = ({cauza, user} : {cauza: Cauza, user: User}) => {

    const [liked, setLiked] = useState(cauza.id in user.cauze);

    function handleLike() {
        setLiked(!liked);
        //SUSTINERE API
    }

    return (
    <LinearGradient colors={['rgba(27,0,255,0.29)', 'rgba(164,167,227,0.63)']}
        style={styles.container}>
        <View>
            <LinearGradient
                colors={['rgba(71,49,225,0.7)', 'rgba(100,82,217,0.45)', 'rgba(69,57,166,0.25)']}
                start={[0, 0]} end={[1, 1]}
                style={{overflow: 'hidden', marginBottom: 10, borderRadius: 20}}
            >
                <Text style={styles.title}>{cauza.titlu}</Text>
                <></>
            </LinearGradient>
            <View style={styles.titleLocation}>
                <View style={styles.listData}>
                {
                    cauza instanceof CauzaAdapost?
                        <Text style={styles.name_age_race}>🏡 {cauza.nume}</Text> :
                    <>
                        <Text style={styles.name_age_race}>Name: {cauza.numeAnimal}</Text>
                        <Text style={styles.name_age_race}>Age: {cauza.varstaAnimal} ani</Text>
                        <Text style={styles.name_age_race}>Race: {cauza.rasaAnimal}</Text>
                    </>
                }
                </View>
                <View style={{display: 'flex', flexDirection: "row", alignItems: 'center', gap: 10}}>
                {Platform.OS === 'web' && <Text style={{fontSize: 18}}>Location:</Text>}
                <View style={styles.locationContainer}>
                    <Text style={styles.location}> 📍{cauza.locatie}</Text>
                </View>
                </View>

            </View>

            <Text style={styles.description}>{cauza.descriere}</Text>
            <PictureNavigator pictures={cauza.poze}></PictureNavigator>
            <View style={{marginHorizontal: Platform.OS === 'web' ? 20 : 0 }}>
            <View style={{
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 5,
            }}>
                <Progress cauza={cauza}/>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                {cauza instanceof CauzaPersonala ?
                    <AnimalTag animal={cauza.tagAnimal.nume}/> :
                    <AnimalsTag animals={cauza.taguri.map(tag => tag.nume)}/>
                }
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 12, paddingRight: 2, paddingBottom: 0}}>
                        {cauza.nrSustinatori}
                    </Text>
                    <TouchableOpacity style={styles.like} onPress={handleLike}>
                        <MaterialCommunityIcons name={liked ? 'heart' : 'heart-outline'} size={30} color={liked ? 'red' : 'gray'} />
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            {liked && <HeartsStream loading={false}></HeartsStream>}
        </View>
    </LinearGradient>
    );
};

CauzaPreview.defaultProps = {
    age: '',
    race: '',
    tags: ['default'],
    sustained: false
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        //backgroundColor: 'rgba(69,57,166,0.25)',
        margin: 10,
        borderWidth: 0,
        borderColor: Colors.Black,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,

        shadowRadius: 10,
        shadowColor: Colors.Black,
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 0},
    },
    name_age_race: {
        paddingLeft: 30,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 18,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"
    },
    title: {
        //backgroundColor: 'rgba(69,57,166,0.4)',
        textAlign: 'center',
        fontSize: 20,
        paddingBottom: 10,
        paddingTop: 10,
        fontWeight: 'bold',
        //borderBottomStyle: 'solid',
    },
    titleLocation: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 5
    },
    listData: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    description: {
        paddingLeft: 10,
        paddingRight: 10,
        //textIndent: 20,
        fontSize: 14,
    },
    location: {
        fontSize: 16,
        color: '#7a7a7a',
        backgroundColor: 'rgba(255,255,255,0.3)',
        paddingLeft: 3,
        marginLeft: 'auto',
        marginRight: 10,
        paddingRight: 10,
        paddingVertical: 2,
        borderRadius: 25,
        marginTop: 5,
    },
    locationContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    like: {
        alignItems: 'flex-end',
        paddingRight: 10,
        paddingBottom: 5,
    }


});

export default CauzaPreview;
