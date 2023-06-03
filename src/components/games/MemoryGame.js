import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Entypo, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';

import Card from "../game_utils/Card";
import {GameOver} from "../game_utils/GameOver";

const MemoryGame = () => {
    const [cards, setCards] = useState(() => {
        let sources = {
            'fontawesome': FontAwesome,
            'entypo': Entypo,
            'ionicons': Ionicons,
            'materialicons': MaterialIcons,
            'materialcommunityicons': MaterialCommunityIcons
        };

        const initialCards = [
            {
                src: 'materialcommunityicons',
                name: 'penguin',
                color: 'black'
            },
            {
                src: 'materialcommunityicons',
                name: 'bird',
                color: 'purple'
            },
            {
                src: 'materialcommunityicons',
                name: 'dolphin',
                color: 'blue'
            },
            {
                src: 'materialcommunityicons',
                name: 'koala',
                color: 'gray'
            },
            {
                src: 'materialcommunityicons',
                name: 'panda',
                color: 'black'
            },
            {
                src: 'materialcommunityicons',
                name: 'teddy-bear',
                color: 'brown'
            },
            {
                src: 'materialcommunityicons',
                name: 'fish',
                color: 'blue'
            },
            {
                src: 'materialcommunityicons',
                name: 'dog-side',
                color: 'black'
            },
            {
                src: 'materialcommunityicons',
                name: 'cat',
                color: 'orange'
            },
            {
                src: 'materialcommunityicons',
                name: 'elephant',
                color: 'gray'
            },
            {
                src: 'materialcommunityicons',
                name: 'turtle',
                color: 'green'
            },
            {
                src: 'materialcommunityicons',
                name: 'paw',
                color: 'red'
            }
        ];

        let clone = JSON.parse(JSON.stringify(initialCards));

        let allCards = initialCards.concat(clone);
        allCards = allCards.map((obj) => {
            obj.id = Math.random().toString(36).substring(7);
            obj.src = sources[obj.src];
            obj.is_open = false;
            return obj;
        });

        // Shuffle the cards
        allCards.sort(() => Math.random() - 0.5);

        return allCards;
    });

    const [currentSelection, setCurrentSelection] = useState([]);
    const [selectedPairs, setSelectedPairs] = useState([]);
    const [score, setScore] = useState(0);

    const [showGameOver, setShowGameOver] = useState(false);

    const resetCards = () => {
        let resettedCards = cards.map((obj) => {
            obj.is_open = false;
            return obj;
        });

        resettedCards.sort(() => Math.random() - 0.5);

        setCurrentSelection([]);
        setSelectedPairs([]);
        setCards(resettedCards);
        setScore(0);
    };

    const renderRows = () => {
        let contents = getRowContents(cards);
        return contents.map((rowCards, index) => (
            <View key={index} style={styles.row}>
                {renderCards(rowCards)}
            </View>
        ));
    };

    const renderCards = (rowCards) => {
        return rowCards.map((card, index) => (
            <Card
                key={index}
                src={card.src}
                name={card.name}
                color={card.color}
                is_open={card.is_open}
                clickCard={clickCard.bind(null, card.id)}
            />
        ));
    };

    const clickCard = (id) => {
        let updatedCards = [...cards];
        let index = updatedCards.findIndex((card) => card.id === id);

        if (updatedCards[index].is_open || selectedPairs.includes(updatedCards[index].name)) {
            return;
        }

        let updatedCurrentSelection = [...currentSelection];
        let updatedScore = score;

        updatedCards[index].is_open = true;
        updatedCurrentSelection.push({
            index: index,
            name: updatedCards[index].name
        });

        if (updatedCurrentSelection.length === 2) {
            if (updatedCurrentSelection[0].name === updatedCurrentSelection[1].name) {
                updatedScore += 1;
                setSelectedPairs([...selectedPairs, updatedCards[index].name]);
            } else {
                updatedCards[updatedCurrentSelection[0].index].is_open = false;

                setTimeout(() => {
                    updatedCards[index].is_open = false;
                    setCards(updatedCards);
                }, 500);
            }

            updatedCurrentSelection = [];
        }

        setCurrentSelection(updatedCurrentSelection);
        setScore(updatedScore);
        setCards(updatedCards);
    };

    const getRowContents = (cards) => {
        let contents_r = [];
        let contents = [];
        let count = 0;

        cards.forEach((item) => {
            count += 1;
            contents.push(item);
            if (count === 4) {
                contents_r.push(contents);
                count = 0;
                contents = [];
            }
        });

        return contents_r;
    };

    useEffect(() => {
        if (score === 12) {
            // USER GETS 3 COINS
            setShowGameOver(true);
            setTimeout(() => {
                setShowGameOver(false);
            }, 3500);
        }
    }, [score]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.header_text}>Play this memory game and earn coins</Text>
            </View>
            <View style={styles.body}>
                {renderRows()}
                { showGameOver && <GameOver coins={3} onClose={() => setShowGameOver(false)}/>}
            </View>
            <View style={styles.score_container}>
                <Text style={styles.score}>Score: {score}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={resetCards}>
                <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff'
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    body: {
        flex: 18,
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 20
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0080ff',
        padding: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 20
    },
    score_container: {
        alignItems: 'center',
        marginBottom: 20,
    },
    score: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    header: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
        justifyContent: 'center',
        paddingVertical: 10,
        backgroundColor: '#f3f3f3'
    },
    header_text: {
        fontWeight: 'bold',
        fontSize: 26,
        textAlign: 'center'
    }
});

export default MemoryGame;