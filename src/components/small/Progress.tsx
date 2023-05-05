import React from "react";
import {Text, View} from "react-native";
import {Cauza} from "../../model/Cauza";

const Progress = ({ cauza } : {cauza: Cauza}) => {
    const current = cauza.sumaStransa; // Current progress
    const target = cauza.sumaMinima; // Target progress
    const unit = () => {
        return " "+cauza.moneda
    }
    const progress = current > target ? 100 : Math.floor((current / target) * 100); // Calculate the percentage of progress

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{fontSize: 18}}>{current>=target ? '✔️completed' : current + unit()}</Text>
                <Text style={{fontSize: 18}}>{'🎯' + target + unit()}</Text>
            </View>
            <View style={{ height: 10, backgroundColor: '#b2b2b2', borderRadius: 5, marginTop: 10 }}>
                <View style={current>=target?
                    { height: 10, backgroundColor: '#00bb00', borderRadius: 5, width: `${progress}%` }:
                    { height: 10, backgroundColor: '#0080ff', borderRadius: 5, width: `${progress}%` }} />
            </View>
        </View>
    );
};

export default Progress;
