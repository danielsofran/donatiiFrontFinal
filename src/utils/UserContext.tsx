import React, {createContext, useRef, useState} from 'react';
import {User} from "../model/User";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const userRef = useRef(new User);

    const updateUser = (newUser) => {
        setUser(newUser);
    };

    return (
        <UserContext.Provider value={{ userRef }}>
            {children}
        </UserContext.Provider>
);
};