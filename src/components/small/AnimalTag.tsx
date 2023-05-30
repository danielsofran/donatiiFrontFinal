import { StyleSheet, View, Text } from "react-native";
import Animal from "../../utils/enum/AnimalTagsEmojies";


export const AnimalTag = ({ animal }: { animal: string }) => {
    return (
        <View style={[styles.tag, {backgroundColor: Animal[animal].color}]}>
            <Text>{animal} </Text>
            <Text style={{ fontSize: 15 }}>{Animal[animal].emoji}</Text>
        </View>
    )
}

export const AnimalsTag = ({ animals }: { animals: string[] }) => {
    return (
        <View style={styles.container}>
            {animals.map((animal, index) => {
                return (
                    <AnimalTag key={index} animal={animal}></AnimalTag>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        minWidth: '50%',
        maxWidth: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginRight: 5,
        marginBottom: 5,
        marginLeft: 0,
        gap: 5,
    },
    tag : {
        flexDirection: 'row',
        marginHorizontal: 5,
        marginBottom: 5,
        fontSize: 8,
        borderRadius: 25,
        padding: 3,
        paddingLeft: 10,
        overflow: 'hidden',
    }
});