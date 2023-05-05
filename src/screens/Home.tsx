import {User} from "../model/User";
import {View, Text, StyleSheet} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";

const Home = ({ navigation, route }) => {
    const user: User = route.params.user;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <Text style={styles.text}>Welcome {user.fullName}</Text>
            <Text style={styles.text}>Email: {user.email}</Text>
            <Text style={styles.text}><>Interese: {user.interese}</></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
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