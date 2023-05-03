import {View, Text} from "react-native";
import {axiosInstance} from "../api/axiosInstance";
import {useEffect} from "react";

export const ApiTest = () => {

    useEffect(() => {
        axiosInstance.get('/cauza/test', {
            headers: {
                // json
                'Content-Type': 'application/json',

            }
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.error(err);
            })
        // fetch('http://192.168.1.131:8080/cauza/test', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        //     },
        // }).then(res => res.json()).then(res => {
        //     console.log(res);
        // });
    }, []);

    return (
        <View>
            <Text>ApiTest</Text>
        </View>
    );
}