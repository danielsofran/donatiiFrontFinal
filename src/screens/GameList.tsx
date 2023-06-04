import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export const GameList = ({navigation}) => {

    return (
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate("Snake")}>
                    <View style={styles.game}>
                        <Text style={styles.gameTitle}>Snake</Text>
                        <Image source={require('../../assets/Icon-Snake.png')} style={styles.gameImage} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Guessing")}>
                    <View style={styles.game}>
                        <Text style={styles.gameTitle}>Memory</Text>
                        <Image source={require('../../assets/Icon-Mata.png')} style={styles.gameImage} />
                    </View>
                </TouchableOpacity>
                {Platform.OS !== 'web' && <TouchableOpacity onPress={() => navigation.navigate("DailySpin")}>
                    <View style={styles.game}>
                        <Text style={styles.gameTitle}>Spin</Text>
                        <Image source={require('../../assets/Icon-Ruleta.png')} style={styles.gameImage} />
                    </View>
                </TouchableOpacity>}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'darkslategray',
        textAlign: 'center',
        marginVertical: 12,
    },
    game: {
        margin: 16,
        paddingTop: 16,
        borderRadius: 20,
        width: 300,
        borderWidth: 5,
        backgroundColor: 'rgb(255,255,255)',
        borderColor: 'rgba(173,173,173,0.68)',
        alignItems: 'center',
        boxShadow: '0px 0px 20px rgba(184, 134, 11, 0.3)'
    },
    gameTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'darkslategray',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    },
    gameImage: {
        width: 250,
        height: 250,
        borderRadius: 20,
        margin: 10,
    }
});