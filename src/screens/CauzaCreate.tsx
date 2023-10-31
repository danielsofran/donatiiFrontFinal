import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomCheckbox from "../components/small/CustomCheckbox";
import Colors from "../utils/enum/Colors";
import Loader from "../components/small/Loader";
import {TagAnimal} from "../model/TagAnimal";
import PicturePicker from "../components/small/PicturePicker";
import { AnimalTag } from "../components/small/AnimalTag";
import {API_URL, axiosInstance} from "../api/axiosInstance";
import {CauzaAdapost, CauzaPersonala, deserializeCauza} from "../model/Cauza";
import {useAuth} from "../utils/context/UseAuth";
import {User} from "../model/User";

const CauzaCreate = ({ navigation }) => {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [sumTarget, setTarget] = useState(0);
    const [tipCauza, setTipCauza] = useState("personal case");
    const [tags, setTags] = useState<TagAnimal[]>([]);
    const [images, setImages] = useState([]);
    const [interests, setInterests] = useState([]);

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [race, setRace] = useState("");

    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    const [selectedTag, setSelectedTag] = useState(null);


    // @ts-ignore
    const { user, setUser, allCases, setAllCases } = useAuth();


    useEffect(() => {
        axiosInstance.get('/tags').then((response) => {
            setTags(new TagAnimal().deserializeArray(response.data));
        }).catch(error => {
            console.log(error.response.data)
        });
    },[])

    const handleInterestChange = (interes) => {
        if (interests.includes(interes)) {
            setInterests(interests.filter(item => item !== interes));
        } else {
            if(tipCauza === 'personal case') {
                setInterests([]);
                if (selectedTag === interes) {
                    setSelectedTag(null);
                } else {
                    setSelectedTag(interes);
                }
            }
            interests.push(interes);
        }
    };

    const handlePicturesChange = (newPictures) => {
        setImages(newPictures);
    };

    const handleSave = () => {
        if(tipCauza === 'personal case') {
            interests.push(selectedTag);
        }
        if (!title) {
            setErrortext('Please fill title');
        }
        else if (!location) {
            setErrortext(' Please fill location');
        }
        else if (!description) {
            setErrortext('Please fill description');
        }
        else if (!sumTarget) {
            setErrortext('Please fill sum target');
        }
        else if (!name) {
            setErrortext('Please fill name');
        }
        else {
            setLoading(true);
            let cauza;
            if(tipCauza === 'personal case') {
                cauza = new CauzaPersonala();
                cauza.descriere = description;
                cauza.titlu = title;
                cauza.locatie = location;
                cauza.sumaMinima = sumTarget;
                cauza.sumaStransa = 0;
                cauza.moneda = 'RON';
                cauza.tagAnimal = selectedTag;
                cauza.numeAnimal = name;
                cauza.varstaAnimal = age;
                cauza.rasaAnimal = race;
                cauza.poze = images;
            }
            else if(tipCauza === 'shelter case') {
                cauza = new CauzaAdapost();
                cauza.descriere = description;
                cauza.titlu = title;
                cauza.locatie = location;
                cauza.sumaMinima = sumTarget;
                cauza.sumaStransa = 0;
                cauza.moneda = 'RON';
                cauza.nume = name;
                cauza.taguri = interests;
                cauza.poze = images;
            }
            // console.log(JSON.stringify({ type: cauza.type === 'CauzaAdapost' ? 'adapost': 'personala', ...cauza }));

            axiosInstance.post('/cauza/' + user.id, cauza)
                .then((response) => {

                console.log('Cauza adaugata cu succes');
                cauza.id = response.data.id;
                if(cauza.poze.length === 0) {
                    axiosInstance.get('/cauza/' + cauza.id).then((response) => {
                        console.log('Cauza si poze adaugata cu succes');
                        let cauza = deserializeCauza(response.data)
                        console.log(cauza);
                        user.cauze.push(cauza);
                        setUser(User.copy(user));

                        console.warn("all cases")
                        console.warn(allCases, setAllCases)
                        setAllCases([...allCases, cauza]);
                        navigation.navigate('Home');
                    }).catch(error => {
                        console.error("get one cauza after image save, CauzaCreate")
                        console.error(error.response.data)
                    });
                }
                else {
                    const formData = new FormData();
                    Promise.all(
                        images.map((image) =>
                            fetch(image.imageUri)
                                .then(response => response.blob())
                                .then(blob => formData.append(`pictures`, blob, `${Date.now()}_${Math.random().toString(36).substring(2)}.jpg`))
                        )
                    ).then(() => {
                        fetch(API_URL + '/cauza/saveImages/' + cauza.id, {
                            method: 'POST',
                            headers: {
                                //'Content-Type': 'multipart/form-data',
                                'Accept': 'application/json'
                            },
                            body: formData
                        }).then((response) => {
                            console.warn(response)
                            console.log('Poze adaugate cu succes');

                            axiosInstance.get('/cauza/' + cauza.id).then((response) => {
                                console.log('Cauza si poze adaugata cu succes');
                                let cauza = deserializeCauza(response.data)
                                console.log(cauza);
                                user.cauze.push(cauza);
                                setUser(User.copy(user));

                                console.warn("all cases")
                                console.warn(allCases, setAllCases)
                                setAllCases([...allCases, cauza]);
                                navigation.navigate('Home');
                            }).catch(error => {
                                console.error("get one cauza after image save, CauzaCreate")
                                console.error(error.response.data)
                            });
                            //navigation.navigate('Home');
                        }).catch(error => {
                            console.error(error.response.data)
                        })

                    })
                }
                //CAUZA CREATA
            }).catch(error => {
                console.error(error.response.data)
            });
            setLoading(false);
        }
    };

    const cauzaPersonala =
        <>
            <View style={styles.row}>
                <Text style={styles.label}>Age:</Text>
                <TextInput style={styles.input} value={age.toString()}
                            onChangeText={(text) =>
                            {
                                text = text.replace(/[^0-9]/g, '');
                                if (text.length == 0) {
                                    text = '0';
                                }
                                setAge(parseInt(text));
                            }
                        }
                            keyboardType={"numeric"}/>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Race:</Text>
                <TextInput style={styles.input} value={race} onChangeText={setRace} />
            </View>
        </>

    return (
        <ScrollView style={styles.background}>
            <Loader loading={loading} />
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.label}>Title:</Text>
                    <TextInput style={styles.input} value={title} onChangeText={setTitle} />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Location:</Text>
                    <TextInput style={styles.input} value={location} onChangeText={setLocation} />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Description:</Text>
                    <TextInput style={styles.description} value={description} onChangeText={setDescription}
                               multiline={true} numberOfLines={4}/>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Case type:</Text>
                    <Picker style={styles.picker}
                            selectedValue={tipCauza}
                            onValueChange={(itemValue) => {
                                setTipCauza(itemValue);
                                setSelectedTag(null);
                                setInterests([]);
                            }
                            }>
                        <Picker.Item label="Personal case" value="personal case" style={styles.pickerItem}/>
                        <Picker.Item label="Shelter case" value="shelter case" style={styles.pickerItem}/>
                    </Picker>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} />
                </View>

                {
                    tipCauza === 'personal case' && cauzaPersonala
                }

                <View style={styles.row}>
                    <Text style={styles.label}>Tags:</Text>

                    {tags.map((tag) => (
                        <View key={tag.id} style={styles.checkboxContainer}>
                            {tipCauza === 'personal case'?
                                <CustomCheckbox value={selectedTag === tag}
                                                onValueChange={() => handleInterestChange(tag)} label={""}
                                                unique={true}
                                />:
                                <CustomCheckbox value={false}
                                                onValueChange={() => handleInterestChange(tag)} label={""}
                                                unique={false}/>
                            }
                            <AnimalTag animal={tag.nume} />
                        </View>
                    ))}
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Target sum:</Text>
                    <TextInput style={styles.input} value={sumTarget.toString()}
                               onChangeText={(text) =>
                               {
                                   text = text.replace(/[^0-9]/g, '');
                                   if (text.length == 0) {
                                       text = '0';
                                   }
                                   setTarget(parseInt(text));
                               }
                               }
                               keyboardType={"numeric"}/>
                </View>

                <View>
                    <PicturePicker onImagesChange={handlePicturesChange}/>
                </View>

                <View style={{margin: 20, marginBottom: 0}}>
                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    </View>

            </View>
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                    {errortext}
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    container: {
        margin: 20,
        marginBottom: 0,
        marginHorizontal: Platform.OS === 'web' ? '22%' : 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        marginRight: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: Colors.Gray,
        padding: 10,
        marginTop: 0,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    row: {
        marginBottom: 10,
    },
    checkboxLabel: {

    },
    picker: {
        height: 40,
        borderWidth: 1,
        padding: 10,
    },
    pickerItem: {
        fontSize: 20,
        height: 60,
        padding: 10,
    },
    errorContainer: {
        height: 40,
        alignItems: "center"
    },
    errorText: {
        marginTop: 20,
        fontSize: 16,
        color: Colors.Red,
        fontWeight: 'bold',
    },
    description: {
        height: 'auto',
        borderWidth: 1,
        padding: 10,
    }


});

export default CauzaCreate;
