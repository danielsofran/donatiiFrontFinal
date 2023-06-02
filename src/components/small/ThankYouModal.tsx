import {Modal, View, StyleSheet, TouchableWithoutFeedback, Image, Platform, Dimensions} from "react-native";
import {useEffect, useState} from "react";

const ThankYouModal = ({ visible, onClose }) => {
    // State to manage the visibility of the modal
    const [modalVisible, setModalVisible] = useState(visible);

    useEffect(() => {
        if (visible) {
            console.log('visible');
            const timer = setTimeout(() => {
                setModalVisible(false);
                onClose();
                console.log('!visible');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [visible, onClose]);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={() => onClose()}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image style={styles.image} source={
                            Platform.OS === 'web'?
                            require('../../../assets/animations/Thanks.png'):
                            require('../../../assets/animations/ThanksMobile.png')
                        }/>
                        <Image style={styles.turtle} source={require('../../../assets/animations/meditating-turtle.gif')}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        zIndex: 77,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.66)',
    },
    modalContent: {
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 100,
    },
    image: {
        marginTop: Platform.OS === 'web'? 0: 20,
        width: Platform.OS === 'web'? window.innerWidth * 0.8: Dimensions.get('window').width,
        height: Platform.OS === 'web'? window.innerWidth * 0.1: Dimensions.get('window').width / 4,
        resizeMode: 'contain',
    },
    turtle: {
        height: 200,
        width: 200,
    }
});

export default ThankYouModal;