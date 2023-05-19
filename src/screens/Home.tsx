import {User} from "../model/User";
import {View, Text, StyleSheet, Dimensions} from "react-native";
import Colors from "../utils/Colors";
import {CauzeList} from "../components/CauzeList";
import {useEffect, useState} from "react";
import {axiosInstance} from "../api/axiosInstance";
import {Cauza, deserializeCauzaArray} from "../model/Cauza";
import WebNavbar from "../components/navbar/Web";
import {useAuth} from "../utils/UseAuth";
import {Banner} from "../components/small/Banner";
import FilterMenu from "../components/small/FilterMenu";

const Home = ({ navigation}) => {
    const [cauze, setCauze] = useState<Cauza[]>([]);

    // @ts-ignore
    const { userRef } = useAuth();

    useEffect(() => {
        axiosInstance.get('/cauza').then((response) => {
            let cauze: Cauza[] = deserializeCauzaArray(response.data);
            console.log(cauze);
            setCauze(cauze);
        })
    }, [])

    return (
        <WebNavbar navigation={navigation}>
            <Banner active={true/*!(localStorage.getItem(`mesaje${userRef.current.id}`) === 'false')*/}></Banner>
            <FilterMenu callFunction={setCauze}></FilterMenu>
            {cauze.length > 0?
                <CauzeList cauze={cauze} user={userRef.current}/>:
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        marginTop: 50,
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#003ea1',
                        textAlign: 'center',
                    }}>
                        Nu exista cauze
                    </Text>
                </View>
            }
        </WebNavbar>
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