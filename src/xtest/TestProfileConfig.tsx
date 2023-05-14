import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import {User} from "../model/User";
import ProfileConfig from "../screens/ProfileConfig";
import {TagAnimal} from "../model/TagAnimal";

function MyComponent() {
    const [textData, setTextData] = useState('');
    let user = new User();
    user.username = 'user1';
    user.email = 'user1@gmail.com';
    user.parola = 'parola';
    const interests = [
        {id:1, nume:'dogs', value: true},
        {id:2, nume:'cats', value: false},
        {id:3, nume:'turtles', value: true},
    ]

    useEffect(() => {
        fetch('https://644032b73dee5b763e31856c.mockapi.io/users')
            .then(response => response.json())
            .then(data => {
                const users = new User().deserializeArray(data);
                setTextData(users[0].email)
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <>
            <ProfileConfig user={user} interests={interests}/>
        </>
    );
}

export default MyComponent;