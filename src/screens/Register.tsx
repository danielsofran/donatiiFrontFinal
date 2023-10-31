import React, {useContext, useState} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from "../utils/enum/Colors";
import Login from "./Login";
import Loader from "../components/small/Loader";
import {isValidEmail} from "../utils/RegexEmail";
import {User} from "../model/User";
import {axiosInstance} from "../api/axiosInstance";
import { UserContext } from '../utils/context/UserContext';

const Register = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    // @ts-ignore
    const { setUser } = useContext(UserContext);

    const hideDog = () => {
        setTimeout(() => setLoading(false), 0)
    }

    const handleRegister = () => {
        if (!username) {
            setErrortext('Please fill username');
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
            let userRegister = new User();
            userRegister.username = username;
            userRegister.email = email;
            userRegister.parola = password;
            axiosInstance.post('/user/register', userRegister)
                .then((response) => {
                    userRegister = new User().deserialize(response.data)
                    console.log("User register: ", userRegister)

                    hideDog();
                    setUser(userRegister)
                    // userRef.current = userRegister;
                    // updateUser();
                    //localStorage.setItem(`userRef`, JSON.stringify({email: userRegister.email, parola: userRegister.parola}));
                    if(userRegister.id !== 0)
                        navigation.navigate('Main');
                }).catch(error => {
                console.log(error)
                //if(error.response.status === 400) {
                setErrortext('User with this email already exists')
                hideDog()
                //}
            });
        }
    };

    const handleAlreadyHaveOne = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Loader loading={loading} />
            <Text style={styles.title}>Sign up</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
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
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Create account</Text>
            </TouchableOpacity>
            <Text style={styles.alreadyRegisteredText}>
                Already have one?{' '}
                <Text style={styles.alreadyRegisteredLink} onPress={handleAlreadyHaveOne} selectable={false}>Login here</Text>
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
    alreadyRegisteredText: {
        marginTop: 20,
        fontSize: 16,
    },
    alreadyRegisteredLink: {
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


export default Register;