import {Cauza} from "../model/Cauza";
import CauzaPreview from "./CauzaPreview";
import {Platform, ScrollView, View, StyleSheet} from "react-native";
import {User} from "../model/User";
import {useEffect, useRef} from "react";

export const CauzeList = ({ cauze, user }: { cauze: Cauza[], user: User }) => {
    return (
        Platform.OS === 'web' ?
            <View style={styles.webcontainer}>
                {cauze.map((cauza) => (
                    <View key={cauza.id} style={styles.webitem}>
                        <CauzaPreview cauza={cauza} user={user} />
                    </View>
                ))}
            </View>
            :
            <ScrollView>
                {cauze.map((cauza) => (
                    <CauzaPreview key={cauza.id} cauza={cauza} user={user} />
                ))}
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    webcontainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        justifyContent: 'center',
        gap: 5,
    },
    webitem: {
        width: '47%',
    },
});