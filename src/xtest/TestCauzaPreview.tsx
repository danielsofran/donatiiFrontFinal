import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {CauzaAdapost, CauzaPersonala} from "../model/Cauza";
import CauzaPreview from "../components/CauzaPreview";
import {User} from "../model/User";
import {GenderType} from "../model/Enums";
import {TagAnimal} from "../model/TagAnimal";
import {CauzeList} from "../components/CauzeList";

const AnotherComponent = () => {
    const tagCaine: TagAnimal = new TagAnimal()
    tagCaine.id = 1
    tagCaine.nume = 'Dogs'

    const tagPisica: TagAnimal = new TagAnimal()
    tagPisica.id = 2
    tagPisica.nume = 'Cats'

    const cauza: CauzaAdapost = new CauzaAdapost()
    cauza.titlu = 'Cauza'
    cauza.descriere = 'asfasugfqwifq qwfbqwifqwfboq qwifhqwifqwi qwfihqwif'
    cauza.sumaMinima = 1000
    cauza.sumaStransa = 500
    cauza.locatie = 'Bucuresti'
    cauza.nume = 'Adapost'
    cauza.id = 1
    cauza.taguri = [tagCaine, tagPisica]

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
    cauzaPersonala.tagAnimal = tagCaine

    const user: User = new User()
    user.cauze = [cauza, cauzaPersonala]
    user.id = 1
    user.fullName = 'Ion Popescu'
    user.email = 'popescu.ion@gmail.com'
    user.coins = 1000
    user.gender = GenderType.Male
    user.interese = [tagCaine, tagPisica]
    user.sustineri = []

    return (
        // <ScrollView>
        //     <CauzaPreview cauza={cauza} user={user}/>
        //     <CauzaPreview cauza={cauzaPersonala} user={user}/>
        // </ScrollView>
        <CauzeList cauze={[cauza, cauzaPersonala,cauza, cauzaPersonala,cauza, cauzaPersonala,]} user={user}/>
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
