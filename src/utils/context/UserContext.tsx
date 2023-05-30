import React, {createContext, useRef, useState} from 'react';
import {User} from "../../model/User";
import {useAuth} from "./UseAuth";
import {axiosInstance} from "../../api/axiosInstance";
import {Cauza, deserializeCauzaArray} from "../../model/Cauza";

export const UserContext = createContext({});

const UserDataProvider = ({ children }) => {
    // @ts-ignore
    const { userRef } = useAuth();
    const [user, setUser] = useState(userRef.current);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [allCases, setAllCases] = useState([]);
    const [myCases, setMyCases] = useState([]);
    const userRef = useRef(new User);

    const updateUser = () => {
        console.log("updateUser\nMy cases:");
        console.log(userRef.current.cauze);
        setUser(userRef.current);
        axiosInstance.get('/cauza').then((response) => {
            let cauze: Cauza[] = deserializeCauzaArray(response.data);
            console.log("All cases:");
            console.log(cauze);
            setAllCases(cauze);
            //setMyCases(cauze.filter(cauza => cauza. === userRef.current.id));
        })
        setMyCases(userRef.current.cauze);
    };

    return (
        <UserContext.Provider value={{ userRef, user, allCases, myCases, updateUser }}>
            {children}
        </UserContext.Provider>
);
};