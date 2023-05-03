import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import ImagePickerComponent from "../components/small/PicturePicker";
import {CauzaAdapost, CauzaPersonala} from "../model/Cauza";
import CauzaPreview from "../components/CauzaPreview";
import Animal from "../utils/AnimalTagsEmojies";

const AnotherComponent = () => {
    const pictures = [
        { id: '1', imageUri: 'https://media.prosport.ro/okdJ9JxHdiYZ0GDv1z6YvQIPAb4=/1280x720/smart/filters:contrast(5):format(webp):quality(80)/https%3A%2F%2Fwww.prosport.ro%2Fwp-content%2Fuploads%2F2018%2F12%2F17791476%2F1-cristiano-ronaldo-real.jpg' },
        { id: '2', imageUri: 'https://picsum.photos/id/1025/300/300' },
        { id: '3', imageUri: 'https://picsum.photos/id/1035/300/300' },
        { id: '4', imageUri: 'https://picsum.photos/id/1045/300/300' },
    ];

    const cauza: CauzaAdapost = new CauzaAdapost()
    cauza.titlu = 'Cauza'
    cauza.descriere = 'asfasugfqwifq qwfbqwifqwfboq qwifhqwifqwi qwfihqwif'
    cauza.sumaMinima = 1000
    cauza.sumaStransa = 500
    cauza.locatie = 'Bucuresti'
    cauza.nume = 'Adapost'
    cauza.id = 1

    const cauzaPersonala: CauzaPersonala = new CauzaPersonala()
    cauzaPersonala.titlu = 'Cauza'
    cauzaPersonala.descriere = 'asfasugfqwifq qwfbqwifqwfboq qwifhqwifqwi qwfihqwif'
    cauzaPersonala.sumaMinima = 1000
    cauzaPersonala.sumaStransa = 500
    cauzaPersonala.locatie = 'Bucuresti'
    cauzaPersonala.numeAnimal = 'Rex'
    cauzaPersonala.varstaAnimal = 2
    cauzaPersonala.rasaAnimal = 'Caine'
    cauzaPersonala.id = 2

    return (
        <ScrollView>
            <CauzaPreview cauza={cauza} pictures={pictures} tags={['Cats', 'Dogs']} sustained={false} numberOfLikes={6}></CauzaPreview>
            <CauzaPreview cauza={cauzaPersonala} pictures={pictures} tags={['Turtles']} sustained={false} numberOfLikes={6}></CauzaPreview>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AnotherComponent;
