import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomCheckbox from "./small/CustomCheckbox";
import Colors from "../utils/Colors";
import Loader from "./small/Loader";
import Animal from "../utils/AnimalTagsEmojies";
import {isValidEmail} from "../utils/RegexEmail";

const ProfileConfig = ({user, interests}) => {
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState(user.parola);
    const [email, setEmail] = useState(user.email);
    const [fullname, setFullname] = useState(user.fullName);
    const [gender, setGender] = useState(user.gender);

    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    const handleInterestChange = (interest) => {
        //SCHIMBARE INTERESE
    };

    const handleSave = () => {
        if (!username) {
            setErrortext('Please fill username');
        }
        else if (!password) {
            setErrortext(' Please fill password');
        }
        else if (!email) {
            setErrortext('Please fill email');
        }
        else if (!isValidEmail(email)) {
            setErrortext('Email is not valid');
        }
        else if (!fullname) {
            setErrortext(' Please fill full name');
        }
        else {
            setLoading(true);
            // PROFILE UPDATE
        }
    };

    return (
        <View style={styles.background}>
            <Loader loading={loading} />
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.label}>Username:</Text>
                    <TextInput style={styles.input} value={username} onChangeText={setUsername} />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Password:</Text>
                    <TextInput style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
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
                        <Picker.Item label="Male" value="male" style={styles.pickerItem}/>
                        <Picker.Item label="Female" value="female" style={styles.pickerItem}/>
                        <Picker.Item label="Confidential" value="confidential" style={styles.pickerItem}/>
                    </Picker>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Interests:</Text>

                    {interests.map((interest) => (
                        <View key={interest.id} style={styles.checkboxContainer}>
                            <CustomCheckbox value={interest.value}
                                            onValueChange={() => handleInterestChange(interest.nume)} label={interest.nume + ' ' + Animal[interest.nume]} />
                        </View>
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

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

});

export default ProfileConfig;
