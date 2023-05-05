import {User} from "../model/User";
import {View, Text, StyleSheet} from "react-native";
import Colors from "../utils/Colors";
import {CauzeList} from "../components/CauzeList";
import {useEffect, useState} from "react";
import {axiosInstance} from "../api/axiosInstance";
import {Cauza, deserializeCauzaArray} from "../model/Cauza";

const Home = ({ navigation, route }) => {
    const user: User = route.params.user;
    const [cauze, setCauze] = useState<Cauza[]>([]);

    useEffect(() => {
        axiosInstance.get('/cauza/all').then((response) => {
            let cauze: Cauza[] = deserializeCauzaArray(response.data);
            console.log(cauze);
            setCauze(cauze);
        })
    }, [])

    return (
        <CauzeList cauze={cauze} user={user}/>
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