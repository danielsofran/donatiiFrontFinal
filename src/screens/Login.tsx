import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Colors from "../utils/enum/Colors";
import Register from "./Register";
import Loader from "../components/small/Loader";
import {isValidEmail} from "../utils/RegexEmail";
import {axiosInstance} from "../api/axiosInstance";
import {User} from "../model/User";
import {useAuth} from "../utils/context/UseAuth";
import {UserContext} from "../utils/context/UserContext";
import { Checkbox, Text as PaperText } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    const [checked, setChecked] = useState(false);

    // @ts-ignore
    const { setUser, isUserPresent, setIsUserPresent } = useContext(UserContext);

    const handleCheckboxToggle = () => {
        setChecked(!checked);
    };

    const hideDog = () => {
        setTimeout(() => setLoading(false), 0)
    }

    useEffect(() => {
        const getUserRef = async () => await AsyncStorage.getItem(`userRef`);

        getUserRef().then((userStored) => {
            if (userStored != '' && userStored != null) {
                let userLogin = new User();
                let user = JSON.parse(userStored);
                userLogin.email = user.email;
                userLogin.parola = user.parola;
                axiosInstance.post('/user/login', userLogin)
                    .then((response) => {
                        userLogin = new User().deserialize(response.data)
                        console.log(response.data)
                        console.log(userLogin)

                        // userRef.current = userLogin;
                        // updateUser();
                        setUser(userLogin);
                        navigation.navigate('Main');
                    })
                    .catch(error => {
                        setIsUserPresent(true)
                        console.log(error)
                        setErrortext(error.response.data)
                    });
                //navigation.navigate('Main');
            }
            else {
                setIsUserPresent(true);
            }
        });
    }, []);

    const handleLogin = () => {
        setErrortext('');
        if (!email && !password) {
            setErrortext('Please fill email and password');
        }
        else if (!email) {
            setErrortext('Please fill email');
        }
        else if (!isValidEmail(email)) {
            setErrortext('Email is not valid');
        }
        else if (!password) {
            setErrortext(' Please fill password');
        }
        else {
            setLoading(true);
            let userLogin = new User();
            userLogin.email = email;
            userLogin.parola = password;
            if(checked)
                AsyncStorage.setItem(`userRef`, JSON.stringify({
                    email: userLogin.email,
                    parola: userLogin.parola
                })).then(r => console.log(r));
            axiosInstance.post('/user/login', userLogin)
                .then((response) => {
                userLogin = new User().deserialize(response.data)
                console.log(response.data)
                console.log(userLogin)

                hideDog();
                setUser(userLogin);
                // userRef.current = userLogin;
                // updateUser();

                navigation.navigate('Main');
            }).catch(error => {
                console.log(error)
                //if(error.response.status === 400) {
                    setErrortext(error.response.data)
                    hideDog()
                //}
            });
        }
    };

    const handleCreate = () => {
        navigation.navigate('Register');
    };

    return (
        isUserPresent &&
        <View style={styles.container}>
            <Loader loading={loading} />
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, }}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={handleCheckboxToggle}
                    color={Colors.Blue} // Customize the checkbox color
                />
                <TouchableOpacity onPress={handleCheckboxToggle}>
                    <PaperText style={{ color: Colors.Blue }}>Keep me logged in</PaperText>
                </TouchableOpacity>
            </View>
            <Text style={styles.createAccountText}>
                Don't have an account?{' '}
                <Text style={styles.createAccountLink} onPress={handleCreate} selectable={false}>Create one</Text>
            </Text>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>
                        {errortext}
                    </Text>
                </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.White,
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        width: '80%',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: Colors.Gray,
        padding: 10,
        width: '80%',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    createAccountText: {
        marginTop: 20,
        fontSize: 16,
    },
    createAccountLink: {
        color: Colors.Blue,
        fontWeight: 'bold',
    },
    errorContainer: {
        height: 40,
    },
    errorText: {
        marginTop: 20,
        fontSize: 16,
        color: Colors.Red,
        fontWeight: 'bold',
    },

});


export default Login;
