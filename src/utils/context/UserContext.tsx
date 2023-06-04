import React, {createContext, useRef, useState} from 'react';
import {User} from "../../model/User";
import {axiosInstance} from "../../api/axiosInstance";
import {Cauza, deserializeCauzaArray} from "../../model/Cauza";
import {useNavigation} from "@react-navigation/native";

export const UserContext = createContext({});
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [allCases, setAllCases] = useState([]);
    const userRef = useRef(new User);
    const navigation = useNavigation();

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
    };

    return (
        <UserContext.Provider value={{ user, setUser, allCases, setAllCases, navigation }}>
            {children}
        </UserContext.Provider>
);
};