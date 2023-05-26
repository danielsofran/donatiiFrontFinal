import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomCheckbox from "../components/small/CustomCheckbox";
import Colors from "../utils/Colors";
import Loader from "../components/small/Loader";
import Animal from "../utils/AnimalTagsEmojies";
import {isValidEmail} from "../utils/RegexEmail";
import {useAuth} from "../utils/UseAuth";
import {axiosInstance} from "../api/axiosInstance";
import {TagAnimal} from "../model/TagAnimal";
import {AnimalTag} from "../components/small/AnimalTag";
import WebNavbar from "../components/navbar/Web";

const ProfileConfig = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [gender, setGender] = useState();
    const [interests, setInterests] = useState([]);

    const [tags, setTags] = useState<TagAnimal[]>([]);
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [errorColor, setErrorColor] = useState('red');

    // @ts-ignore
    const { userRef } = useAuth();


    useEffect(() => {
        setUsername(userRef.current.username);
        setPassword(userRef.current.parola);
        setEmail(userRef.current.email);
        setFullname(userRef.current.fullName);
        setGender(userRef.current.gender);
        setInterests(userRef.current.interese);
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
            interests.push(interes);
        }
    };

    const handleSave = () => {
        if (!username) {
            setErrortext('Please fill username');
        }
        else if (!password) {
            setErrortext('Please fill password');
        }
        else if (!email) {
            setErrortext('Please fill email');
        }
        else if (!isValidEmail(email)) {
            setErrortext('Email is not valid');
        }
        else if (!fullname) {
            setErrorColor('red');
            setErrortext('Please fill full name');
        }
        else {
            setLoading(true);
            userRef.current.username = username;
            userRef.current.parola = password;
            userRef.current.email = email;
            userRef.current.fullName = fullname;
            //userRef.current.gender = gender;
            userRef.current.interese = interests;
            axiosInstance.put('/user/' + userRef.current.id, userRef.current).then((response) => {
                setLoading(false);
                setErrorColor('blue');
                setErrortext('Profile updated successfully');
                alert('Profile updated successfully');
                setLoading(false);
            }).catch(error => {
                console.log(error.response.data);
                alert('Error updating profile')
                setLoading(false);
            });

        }
    };

    return (
        <ScrollView style={styles.background}>
            <Loader loading={loading} />
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.label}>Username:</Text>
                    <TextInput style={styles.input} value={username} onChangeText={setUsername} />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput style={styles.input} keyboardType="email-address" value={email} onChangeText={setEmail} />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Full Name:</Text>
                    <TextInput style={styles.input} value={fullname} onChangeText={setFullname} />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Gender:</Text>
                    <Picker style={styles.picker}
                        selectedValue={gender}
                        onValueChange={(itemValue, itemIndex) =>
                            setGender(itemValue)
                        }>
                        <Picker.Item label="Male" value="Male" style={styles.pickerItem}/>
                        <Picker.Item label="Female" value="Female" style={styles.pickerItem}/>
                        <Picker.Item label="Confidential" value="Confidential" style={styles.pickerItem}/>
                    </Picker>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Interests:</Text>

                    {tags.map((tag) => (
                        <View key={tag.id} style={styles.checkboxContainer}>
                            <CustomCheckbox value={interests.includes(tag)}
                                            onValueChange={() => handleInterestChange(tag)}
                                            label={""} />
                            <AnimalTag animal={tag.nume} />
                        </View>
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.errorContainer}>
                <Text style={{
                    marginTop: 20,
                    fontSize: 16,
                    color: errorColor,
                    fontWeight: 'bold',
                }}>
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

});

export default ProfileConfig;
