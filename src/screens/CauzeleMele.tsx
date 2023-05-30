import {StyleSheet} from "react-native";
import Colors from "../utils/enum/Colors";
import {CauzeList} from "../components/CauzeList";
import {useAuth} from "../utils/context/UseAuth";

const CauzeleMele = ({ navigation }) => {

    // @ts-ignore
    const { userRef, user, myCases } = useAuth();

    return (
        <CauzeList cauze={myCases} user={user} updatable={true}/>
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

export default CauzeleMele;