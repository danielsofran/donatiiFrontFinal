import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform, Button, Alert, Animated, Modal, Image} from 'react-native';
import Colors from "../utils/enum/Colors";
import PictureNavigator from "./small/PictureNavigator";
import Progress from "./small/Progress";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Cauza, isCauzaAdapost, isCauzaPersonala} from "../model/Cauza";
import HeartsStream from "./small/HeartsStream";
import {AnimalsTag, AnimalTag} from "./small/AnimalTag";
import {LinearGradient} from "expo-linear-gradient";
import {axiosInstance} from "../api/axiosInstance";
import {useAuth} from "../utils/context/UseAuth";
import Icon from "react-native-vector-icons/FontAwesome";
import NumberInput from "./small/NumberInput";


const CauzaPreview = ({cauza, updatable=false} : {cauza: Cauza, updatable: boolean}) => {
    // @ts-ignore
    const { userRef } = useAuth();

    const [liked, setLiked] = useState(userRef.current.sustineri.includes(cauza.id));
    const [nrLikes, setNrLikes] = useState(cauza.nrSustinatori)
    const [showHearts, setShowHearts] = useState(false);

    const [isExpanded, setIsExpanded] = useState(false);

    const [sum, setSum] = useState(5);
    const [currency, setCurrency] = useState('RON');

    useRef(new Animated.Value(0)).current;

    function handleLike() {
        if(!liked)
            setShowHearts(true);
        setLiked(!liked);
        axiosInstance.put(`/user/like/${userRef.current.id}/${cauza.id}`).then((response) => {
            console.log(response.data)
            if(!!liked) {
                setNrLikes(nrLikes-1);
                userRef.current.sustineri = userRef.current.sustineri.filter((id) => id !== cauza.id);
            }
            else {
                setNrLikes(nrLikes+1)
                userRef.current.sustineri.push(cauza.id);
            }
        }).catch(error => {
            console.log(error.response.data)
        });
    }

    function handleDelete() {
        if(Platform.OS === 'web') {
            if (window.confirm('Are you sure you want to delete this case?')) {
                confirmedDelete();
            }
            return;
        }
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this case?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () =>
                    {
                        confirmedDelete();
                    }},
            ],
            { cancelable: false }
        );
    }

    function confirmedDelete() {
        axiosInstance.delete(`/cauza/${cauza.id}`).then((response) => {
            console.log(response.data)
        }).catch(error => {
            console.log(error.response.data)
        });
    }

    function handleDonate() {
        setIsExpanded(!isExpanded);
    }

    function donate() {
        axiosInstance.put(`/cauza/donate/${cauza.id}/${sum}/${currency}`).then((response) => {
            console.log(response.data);
            setIsExpanded(false);
        }).catch(error => {
            console.log(error.response.data);
            setIsExpanded(false);
        });
    }

    return (
        <View>
        <LinearGradient colors={['rgba(127, 127, 213, 0.5)', 'rgba(134, 168, 231, 0.5)', 'rgba(145, 234, 228, 0.5)']}
                        start={{ x: 0.5, y: 1 }}
                        end={{ x: 0.5, y: 0 }}
                        style={styles.container}>
            <View>
                <LinearGradient
                    colors={['rgba(127, 127, 213, 0.7)', 'rgba(134, 168, 231, 0.7)', 'rgba(145, 234, 228, 0.7)']}
                    start={[0, 0]} end={[1, 1]}
                    style={{overflow: 'hidden', marginBottom: 10, borderRadius: 20}}
                >
                    <Text style={styles.title}>{cauza.titlu}</Text>
                    <></>
                </LinearGradient>
                <View style={styles.titleLocation}>
                    <View style={styles.listData}>
                        {
                            isCauzaAdapost(cauza) ?
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
                        {isCauzaPersonala(cauza) ?
                            <AnimalTag animal={cauza.tagAnimal.nume}/> :
                            <AnimalsTag animals={cauza.taguri.map(tag => tag.nume)}/>
                        }
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize: 12, paddingRight: 2, paddingBottom: 0}}>
                                {nrLikes}
                            </Text>
                            <TouchableOpacity style={styles.like} onPress={handleLike}>
                                <MaterialCommunityIcons name={liked ? 'heart' : 'heart-outline'} size={30} color={liked ? 'red' : 'gray'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {showHearts && <HeartsStream loading={false}></HeartsStream>}
                {updatable &&
                    <TouchableOpacity style={styles.delete} onPress={handleDelete}>
                        <Icon name="trash" size={30} color="purple" />
                    </TouchableOpacity>
                }
            </View>
        </LinearGradient>
            {updatable ||
                <TouchableOpacity style={styles.donate} onPress={handleDonate}>
                    <View style={styles.button}>
                        <Icon name="gift" size={30} color="purple" />
                        <Text style={styles.donateText}> DONATE </Text>
                        <Icon name="gift" size={30} color="purple" />
                    </View>
                </TouchableOpacity>
            }
            {isExpanded &&
                <Modal transparent={true} animationType={'fade'} visible={isExpanded}>
                    <View style={styles.slidingView}>
                        <Image style={styles.background}
                               source={
                            Platform.OS === 'web' ?
                            require('../../assets/animals-background.jpg'):
                            require('../../assets/mobile-background.jpg')
                        }/>
                        <View style={styles.activityIndicatorWrapper}>
                            <Text style={styles.donateTitle}>Donate for {cauza.titlu}</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '60%',
                            }}>
                                <Text style={{fontSize: 18}}>Amount: </Text>
                                <NumberInput minvalue={1} maxvalue={1000} initial={5} onValueChange={setSum}></NumberInput>
                            </View>
                            <TouchableOpacity style={styles.donateButton} onPress={donate}>
                                <Text style={styles.donateButtonText}>Register Donation</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsExpanded(false)}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            }
        </View>
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
        marginBottom: 0,
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
        paddingHorizontal: 7,
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
    },
    delete: {
        opacity: 0.4,
        position: 'absolute',
        top: 8,
        left: 10,
    },
    donate: {
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.4,
    },
    donateText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'purple',
    },
    button: {
        backgroundColor: 'rgba(145,234,228,1)',
        padding: 5,
        paddingHorizontal: 15,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderRadius: 20,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    slidingView: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#A8E4FC',
    },
    activityIndicatorWrapper: {
        marginTop: -50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    donateTitle: {
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        color: Platform.OS === 'web'? '#696969': '#6868ff',
        marginBottom: 50,
    },
    donateButton: {
        backgroundColor: '#696969',
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    donateButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E6E6FA',
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    cancelButton: {
        backgroundColor: 'transparent',
        padding: 10,
        paddingHorizontal: 20,
    },
    cancelButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#696969',
    }

});

export default CauzaPreview;
