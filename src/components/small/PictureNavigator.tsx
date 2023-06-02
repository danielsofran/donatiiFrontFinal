import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Image,
    Modal,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
    Platform
} from 'react-native';
import { Poza } from '../../model/Poza';
import { API_URL } from '../../api/axiosInstance';

interface Props {
    pictures: Poza[];
}

const PictureNavigator: React.FC<Props> = ({ pictures }) => {
    const [aspectRatios, setAspectRatios] = useState<Record<string, number>>({});
    const [selectedImage, setSelectedImage] = useState<Poza | null>(null);

    useEffect(() => {
        pictures.forEach((picture) => {
            Image.getSize(API_URL + picture.url, (width, height) => {
                setAspectRatios((prevAspectRatios) => ({
                    ...prevAspectRatios,
                    [picture.id]: width / height,
                }));
            });
        });
    }, [pictures]);

    const handleImageSelection = (picture: Poza) => {
        setSelectedImage(picture);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={pictures}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.pictureContainer}
                        onPress={() => handleImageSelection(item)}
                    >
                        <Image
                            source={{ uri: API_URL + item.url }}
                            style={{ height: 150, aspectRatio: aspectRatios[item.id] }}
                        />
                    </TouchableOpacity>
                )}
            />
            <Modal transparent={true} visible={selectedImage !== null} animationType="fade">
                <TouchableWithoutFeedback onPress={() => setSelectedImage(null)}>
                    <View style={styles.modalContainer}>
                        {selectedImage && (
                            <Image
                                source={{ uri: API_URL + selectedImage.url }}
                                style={{ width: Platform.OS === 'web'? 600: 400, aspectRatio: aspectRatios[selectedImage.id] }}
                            />
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    pictureContainer: {
        marginRight: 5,
        borderRadius: 5,
        overflow: 'hidden',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.5)',
    },
});

export default PictureNavigator;
