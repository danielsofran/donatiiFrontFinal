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

const Home = () => {
    const [cauze, setCauze] = useState<Cauza[]>([]);

    // @ts-ignore
    const { userRef, allCases, myCases, updateUser } = useAuth();

    useEffect(() => {
        setCauze(allCases);
        axiosInstance.get('/cauza').then((response) => {
            let cauze: Cauza[] = deserializeCauzaArray(response.data);
            console.log(cauze);
            setCauze(cauze);
        })
    }, [])

    return (
        <>
            <Banner active={false/*!(localStorage.getItem(`mesaje${userRef.current.id}`) === 'false')*/}></Banner>
            <FilterMenu callFunction={setCauze} />
            <CauzeList cauze={cauze} user={userRef.current} updatable={false}/>
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