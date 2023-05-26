import React, {useRef, useState} from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PictureNavigator from "./PictureNavigator";

const ImagePickerComponent = (props:{onImagesChange?: (imgs: any[]) => void}) => {
    const [images, setImages] = useState([]);
    const imageId = useRef(0);

    const pickImages = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
        });

        if (!result.canceled) {
            const newImages = [...images];
            result.assets.forEach((asset, index) => {
                // console.log(asset.uri);
                newImages.push({ id: imageId.current, imageUri: asset.uri });
                imageId.current++;
            });
            setImages(newImages);
            props?.onImagesChange?.(newImages)
        }
    };

    const handleDeleteImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
        props?.onImagesChange?.(newImages)
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.imageContainer}>
            <Image source={{ uri: item.imageUri }} style={styles.previewImage} />
            <TouchableOpacity onPress={() => handleDeleteImage(index)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImages} style={styles.button}>
                <Text style={styles.buttonText}>Choose Images</Text>
            </TouchableOpacity>
            <FlatList
                data={images}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                style={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginRight: 10,
    },
    list: {
        maxHeight: 100,
    },
    imageContainer: {
        position: 'relative',
        marginRight: 10,
    },
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: +10,
        width: 20,
        height: 20,
        backgroundColor: 'red',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default ImagePickerComponent;
