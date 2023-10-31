import React, {createContext, useEffect, useRef, useState} from 'react';
import {User} from "../../model/User";
import {axiosInstance} from "../../api/axiosInstance";
import {Cauza, deserializeCauzaArray} from "../../model/Cauza";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext({});
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [allCases, setAllCases] = useState([]);
    const [isUserPresent, setIsUserPresent] = useState(false);
    const [allowVoice, setAllowVoice] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        AsyncStorage.getItem(`voce`).then((value) => setAllowVoice(value === 'true'));
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, allCases, setAllCases, navigation, isUserPresent, setIsUserPresent, allowVoice, setAllowVoice }}>
            {children}
        </UserContext.Provider>
);
};