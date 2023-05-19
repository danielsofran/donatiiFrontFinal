import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView} from 'react-native';
import getLocation from "../../utils/GetLocation";
import NumberInput from "./NumberInput";
import {axiosInstance} from "../../api/axiosInstance";
import {TagAnimal} from "../../model/TagAnimal";
import CustomCheckbox from "./CustomCheckbox";
import {AnimalTag} from "./AnimalTag";
import colors from "../../utils/Colors";
import {Cauza, deserializeCauzaArray} from "../../model/Cauza";


const FilterMenu = ({ callFunction }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isOpenLocation, setIsOpenLocation] = useState(true);
    const [isOpenSum, setIsOpenSum] = useState(true);
    const [isOpenTags, setIsOpenTags] = useState(true);
    const [isOpenOthers, setIsOpenOthers] = useState(true);

    const [locatie, setLocatie] = useState('');
    const [sumaMin, setSumaMin] = useState(0);
    const [sumaMax, setSumaMax] = useState(1000000000);
    const [interests, setInterests] = useState([]);
    const [showCompleted, setShowCompleted] = useState(false);
    const [doarAdapost, setDoarAdaport] = useState(false);


    const [tags, setTags] = useState([]);

    useEffect(() => {
        axiosInstance.get('/tags').then((response) => {
            setTags(new TagAnimal().deserializeArray(response.data));
        }).catch(error => {
            console.log(error.response.data)
        });
    },[])

    function handleLocation() {
        getLocation().then((location) => {
            console.log(location);
            setLocatie(location);
        });
    }

    const handleInterestChange = (interes) => {
        if (interests.includes(interes)) {
            setInterests(interests.filter(item => item !== interes));
        } else {
            interests.push(interes);
        }
    };

    function handleFilter() {
        const params = {
            locatie: locatie,
            sumMin: sumaMin,
            sumMax: sumaMax,
            taguri: interests.map(interest => interest.id).join(','),
            rezolvate: showCompleted,
            adaposturi: doarAdapost,
        };

        axiosInstance.get('/cauza/filter',{ params: params }).then((response) => {
            let cauze: Cauza[] = deserializeCauzaArray(response.data);
            callFunction(cauze);
        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.openButton}>
                <Text style={styles.buttonText}>Filtrare</Text>
            </TouchableOpacity>
            {isOpen && (
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={styles.element}>
                        <TouchableOpacity onPress={() => setIsOpenLocation(!isOpenLocation)} style={[styles.button, {backgroundColor: 'rgba(62,39,231,0.68)'}]}>
                            <Text style={styles.buttonText}>Locatie</Text>
                        </TouchableOpacity>
                        <View style={styles.listContainer}>
                            {isOpenLocation && (
                                <View style={styles.list}>
                                    <TextInput style={styles.input} value={locatie} onChangeText={setLocatie} />
                                    <Text style={{
                                        fontSize: 14,
                                        color: 'green',
                                    }} onPress={handleLocation}>Locatia mea curenta</Text>
                                </View>
                            )}
                        </View>
                    </View>

                    <View style={styles.element}>
                        <TouchableOpacity onPress={() => setIsOpenSum(!isOpenSum)} style={[styles.button, {backgroundColor: 'rgba(55,32,236,0.56)'}]}>
                            <Text style={styles.buttonText}>Suma necesara</Text>
                        </TouchableOpacity>
                        <View style={styles.listContainer}>
                            {isOpenSum && (
                                <View style={styles.list}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        <Text>Minim: </Text>
                                        <NumberInput minvalue={0} maxvalue={sumaMax} onValueChange={setSumaMin} initial={0}/>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: 10,
                                    }}>
                                        <Text>Maxim: </Text>
                                        <NumberInput minvalue={sumaMin} maxvalue={1000000000} onValueChange={setSumaMax} initial={1000000000}/>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>

                    <View style={styles.element}>
                        <TouchableOpacity onPress={() => setIsOpenTags(!isOpenTags)} style={[styles.button, {backgroundColor: 'rgba(48,24,241,0.44)'}]}>
                            <Text style={styles.buttonText}>Taguri animale</Text>
                        </TouchableOpacity>
                        <View style={styles.listContainer}>
                            {isOpenTags && (
                                <View style={[styles.list, {alignItems: 'flex-start', height: 100}]}>
                                    <ScrollView
                                        style={{}}>
                                        {tags.map((tag) => (
                                            <View key={tag.id} style={styles.checkboxContainer}>
                                                <CustomCheckbox value={false}
                                                                onValueChange={() => handleInterestChange(tag)} label={""} />
                                                <AnimalTag animal={tag.nume} />
                                            </View>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}
                        </View>
                    </View>

                    <View style={styles.element}>
                        <TouchableOpacity onPress={() => setIsOpenOthers(!isOpenOthers)} style={[styles.button, {backgroundColor: 'rgba(40,15,246,0.32)'}]}>
                            <Text style={styles.buttonText}>Alte criterii</Text>
                        </TouchableOpacity>
                        <View style={styles.listContainer}>
                            {isOpenOthers && (
                                <View style={[styles.list, {alignItems: 'flex-start'}]}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        <CustomCheckbox value={false}
                                                        onValueChange={() => setShowCompleted(!showCompleted)} label={''}/>
                                        <Text style={{fontSize: 14, textAlign: 'center'}}>Ascunde cauzele rezolvate</Text>
                                    </View>

                                    <View style={{
                                        marginTop: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        <CustomCheckbox value={false}
                                                        onValueChange={() => setDoarAdaport(!doarAdapost)} label={''}/>
                                        <Text style={{fontSize: 14, textAlign: 'center'}}>Arata doar adaposturi</Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>

                    <TouchableOpacity onPress={handleFilter} style={[styles.button, {backgroundColor: 'rgba(27,0,255,0.3)', marginLeft: 10,}]}>
                        <Text style={styles.buttonText}>Cauta</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        zIndex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    openButton: {
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 200,
        borderRadius: 25,
        padding: 10,
        backgroundColor: 'rgba(80,60,225,0.88)',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 200,
        borderRadius: 25,
        padding: 10,
        backgroundColor: 'rgba(27,0,255,0.3)',
    },
    listContainer: {
        opacity: 0.8,
        position: 'absolute',
        top: '100%',
        width: '100%',
    },
    list: {
        borderRadius: 25,
        width: '100%',
        position: 'absolute',
        top: '100%',
        left: 0,
        backgroundColor: 'lightblue',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    element: {
        marginHorizontal: 10,
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: 'black',
        fontSize: 16,
        padding: 8,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginRight: 40,
    },
});

export default FilterMenu;
