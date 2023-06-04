import {View, Text} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {GameList} from "../../screens/GameList";
import SnakeGame from "../games/SnakeGame";
import GuessingGame from "../games/GuessingGame";
import DailySpin from "../games/DailySpin";
import MemoryGame from "../games/MemoryGame";

const gameStack = createStackNavigator();

export const Games = () => {
    return (
        <gameStack.Navigator
            screenOptions={{
                headerShown: true
            }}>
            <gameStack.Screen name="GameList" component={GameList} options={{
                headerShown: false,
            }} />
            <gameStack.Screen name="Snake" component={SnakeGame} />
            <gameStack.Screen name="Guessing" component={MemoryGame} />
            <gameStack.Screen name="DailySpin" component={DailySpin} />
        </gameStack.Navigator>
    )
}