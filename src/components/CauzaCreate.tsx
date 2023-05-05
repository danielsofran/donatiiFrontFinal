import React, {useEffect, useRef, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomCheckbox from "./small/CustomCheckbox";
import Colors from "../utils/Colors";
import Loader from "./small/Loader";
import {TagAnimal} from "../model/TagAnimal";
import Animal from "../utils/AnimalTagsEmojies";
import PicturePicker from "./small/PicturePicker";

const CauzaCreate = (props) => {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [sumTarget, setTarget] = useState(0);
    const [sumCurrent, setSumCurrent] = useState(0);
    const [tipCauza, setTipCauza] = useState("personal case");
    const [tags, setTags] = useState<TagAnimal[]>([]);
    const [images, setImages] = useState([]);

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [race, setRace] = useState("");

    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');


    useEffect(() => {

        let tag = new TagAnimal()
        tag.id = 0
        tag.nume='dogs';
        let tag2 = new TagAnimal()
        tag2.id = 1
        tag2.nume='cats';
        setTags([tag, tag2]);
        // Fetch for tags
    },[])
    const handleInterestChange = (interest) => {
        //SCHIMBARE INTERESE
    };

    const handlePicturesChange = (newPictures) => {
        setImages(newPictures);
    };

    const handleSave = () => {
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
            // PROFILE UPDATE
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
        <View style={styles.background}>
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
                            onValueChange={(itemValue, itemIndex) =>
                                setTipCauza(itemValue)
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
                            <CustomCheckbox value={false}
                                            onValueChange={() => handleInterestChange(tag)} label={tag.nume + ' ' + Animal[tag.nume]} />
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
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    container: {
        margin: 20,
        marginBottom: 0
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
