import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from "../utils/Colors";
import Register from "./Register";
import Loader from "../components/small/Loader";
import {isValidEmail} from "../utils/RegexEmail";
import {axiosInstance} from "../api/axiosInstance";
import {User} from "../model/User";
const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

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
            axiosInstance.post('/user/login', userLogin).then((response) => {
                userLogin = response.data
                console.log(response.data)
                console.log(userLogin.interese)

                setLoading(false);
                navigation.navigate('Home', {user: userLogin});
            });
        }
    };

    const handleCreate = () => {
        navigation.navigate('Register');
    };

    return (
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
