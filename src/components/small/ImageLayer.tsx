import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import Colors from "../../utils/Colors";
import {API_URL} from "../../api/axiosInstance";

const ImageLayer = ({ images, size=200 }) => {
    return (
        <View style={{
            width: size,
            height: size,
            overflow: 'hidden',
            borderColor: Colors.Gray,
            borderWidth: 5,
        }}>
            {
                images.map((image, index) => {
                //console.log(`URL:${image.url}`);
                return (
                    <Image
                        key={index}
                        source={{uri: `${API_URL}/item/${image.tip.toString()}/${image.url}`}}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: size,
                            width: size
                        }}
                        onError={(error) => {
                            //console.log('Error loading image:', error);
                        }}
                    />
                );
            })}

        </View>
    );
};

export default ImageLayer;
