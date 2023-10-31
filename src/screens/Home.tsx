import {User} from "../model/User";
import {View, Text, StyleSheet} from "react-native";
import Colors from "../utils/enum/Colors";
import {CauzeList} from "../components/CauzeList";
import {useEffect, useState} from "react";
import {axiosInstance} from "../api/axiosInstance";
import {Cauza, deserializeCauzaArray} from "../model/Cauza";
import WebNavbar from "../components/navbar/Web";
import {useAuth} from "../utils/context/UseAuth";
import {Banner} from "../components/small/Banner";
import FilterMenu from "../components/small/FilterMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
    // const [cauze, setCauze] = useState<Cauza[]>([]);

    // @ts-ignore
    const { user, allCases, setAllCases } = useAuth();

    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem(`mesaje`).then((value) => {
            setShowBanner(value === 'true')
        });
        axiosInstance.get('/cauza').then((response) => {
            let cauze: Cauza[] = deserializeCauzaArray(response.data);
            console.log(cauze);
            setAllCases(cauze);
        })

    }, [])

    return (
        <>
            { showBanner && <Banner active={true}></Banner> }
            <FilterMenu callFunction={setAllCases} />
            <CauzeList cauze={allCases} user={user} updatable={false}/>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

export default Home;