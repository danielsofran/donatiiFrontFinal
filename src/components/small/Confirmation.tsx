import {Button, Modal, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {useState} from "react";

const ConfirmationModal = ({ visible, onAccept, onReject, title, text }) => {
    const [modalVisible, setModalVisible] = useState(visible);

    const handleAccept = () => {
        setModalVisible(false);
        onAccept();
    };

    const handleReject = () => {
        setModalVisible(false);
        onReject();
    };

    return (
        <Modal visible={modalVisible} animationType="fade" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{text}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
                            <Text style={styles.buttonText}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles= StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    message: {
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    acceptButton: {
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    rejectButton: {
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default ConfirmationModal;