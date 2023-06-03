import {Dimensions, Image, Modal, Platform, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";

export const GameOver = ({coins, onClose}) => {
    return (
        <TouchableWithoutFeedback onPress={() => onClose()}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Modal transparent={true} animationType={'none'}>
                        <Image style={styles.image} source={require('../../../assets/animations/game-over.png')}></Image>
                        <Text style={styles.text}>You won {coins} coins</Text>
                    </Modal>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        width: '100%',
        height: '100%',
        zIndex: 77,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    image: {
        marginTop: Platform.OS === 'web'? window.innerHeight * 0.35: Dimensions.get('window').height * 0.35,
        width: Platform.OS === 'web'? window.innerWidth: Dimensions.get('window').width,
        height: Platform.OS === 'web'? window.innerWidth * 0.1: Dimensions.get('window').width / 4,
    },
    text: {
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#696969',
    }
});