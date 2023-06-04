import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import Colors from "../../utils/enum/Colors";
import {API_URL} from "../../api/axiosInstance";
import {useAuth} from "../../utils/context/UseAuth";
import {Costumizabil} from "../../model/Costumizabil";

const ImageLayer = ({ images, size=200 } : {images: Costumizabil[], size: number|string}) => {

    // @ts-ignore
    const { user } = useAuth();
    const [echipate, setEchipate] = React.useState(user.echipate);

    useEffect(() => {
        setEchipate([]);
        const animal = user.echipate.find(c => c.tip === 'Animal');
        const item = user.echipate.find(c => c.tip === 'Item');
        const background = user.echipate.find(c => c.tip === 'Background');
        const border = user.echipate.find(c => c.tip === 'Border');
        if(!background) {
            setEchipate((prevEchipate) => [...prevEchipate, { tip: 'Background', url: 'default' }]);
        }
        if(background) {
            setEchipate((prevEchipate) => [...prevEchipate, { tip: 'Background', url: background.url }]);
        }
        if(!animal) {
            setEchipate((prevEchipate) => [...prevEchipate, { tip: 'Animal', url: 'default' }]);
            return;
        }
        if(animal && item) {
            setEchipate((prevEchipate) => [...prevEchipate, { tip: 'ItemAnimal', url: animal.url + '-' + item.url }]);
        }
        else if(animal) {
            setEchipate((prevEchipate) => [...prevEchipate, { tip: 'Animal', url: animal.url }]);
        }
        else if(item) {
            setEchipate((prevEchipate) => [...prevEchipate, { tip: 'Item', url: item.url }]);
        }
        if(border) {
            setEchipate((prevEchipate) => [...prevEchipate, { tip: 'Border', url: border.url }]);
        }
    }, [user.echipate]);

    return (
        <View style={{
            width: size,
            height: size,
            overflow: 'hidden',
            borderColor: Colors.Gray,
            borderWidth: 5,
            borderRadius: 50,
        }}>
            {
                echipate.map((image, index) => {
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
