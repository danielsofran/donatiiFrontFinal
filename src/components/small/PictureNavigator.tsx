import React, {useState, useEffect} from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';

interface Picture {
    id: string;
    imageUri: string;
}

interface Props {
    pictures: Picture[];
}

const PictureNavigator: React.FC<Props> = ({ pictures }) => {
    const [aspectRatios, setAspectRatios] = useState<Record<string, number>>({});

    useEffect(() => {
        pictures.forEach((picture) => {
            Image.getSize(picture.imageUri, (width, height) => {
                setAspectRatios((prevAspectRatios) => ({
                    ...prevAspectRatios,
                    [picture.id]: width / height,
                }));
            });
        });
    }, [pictures]);

    return (
        <View style={styles.container}>
                <FlatList
                    data={pictures}
                    keyExtractor={item => item.id}
                    horizontal
                    renderItem={({ item }) => (
                        <View style={styles.pictureContainer}>
                            <Image source={{ uri: item.imageUri }} style={{height: 150, aspectRatio: aspectRatios[item.id]}}/>
                        </View>
                        )}
                >
                </FlatList>
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
});

export default PictureNavigator;
