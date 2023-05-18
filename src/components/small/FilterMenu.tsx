import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import getLocation from "../../utils/GetLocation";
import RangeSlider from 'react-native-range-slider';

const FilterMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenLocation, setIsOpenLocation] = useState(false);
    const [isOpenSum, setIsOpenSum] = useState(false);
    const [isOpenTags, setIsOpenTags] = useState(false);
    const [isOpenOthers, setIsOpenOthers] = useState(false);

    const [locatie, setLocatie] = useState('');
    const [suma, setSuma] = useState([]);
    const [tags, setTags] = useState([]);

    function handleLocation() {
        getLocation().then((location) => {
            console.log(location);
            setLocatie(location);
        });
    }

    function handleFilter() {
        console.log('Filter');
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
                                <View style={styles.list}>
                                    <Text>List 1 Item 1</Text>
                                    <Text>List 1 Item 2</Text>
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
                                <View style={styles.list}>
                                    <Text>List 1 Item 1</Text>
                                    <Text>List 1 Item 2</Text>
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
});

export default FilterMenu;