import { useEffect, useState } from "react";
import {Dimensions, SafeAreaView, StyleSheet, View} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { SnakeColors } from "../game_utils/SnakeColors";
import { Direction, Coordinate, GestureEventType } from "../game_utils/SnakeTypes";
import Header from "../game_utils/Header";
import Score from "../game_utils/Score";
import Snake from "../game_utils/Snake";
import Food from "../game_utils/Food";
import {GameOver} from "../game_utils/GameOver";
import {axiosInstance} from "../../api/axiosInstance";
import {useAuth} from "../../utils/context/UseAuth";
import {User} from "../../model/User";

const checkEatsFood = (
    head: Coordinate,
    food: Coordinate,
    area: number
): boolean => {
    const distanceBetweenFoodAndSnakeX: number = Math.abs(head.x - food.x);
    const distanceBetweenFoodAndSnakeY: number = Math.abs(head.y - food.y);
    return (
        distanceBetweenFoodAndSnakeX < area && distanceBetweenFoodAndSnakeY < area
    );
};

export const checkGameOver = (
    snakeHead: Coordinate,
    boundaries: any
): boolean => {
    return (
        snakeHead.x < boundaries.xMin ||
        snakeHead.x > boundaries.xMax ||
        snakeHead.y < boundaries.yMin ||
        snakeHead.y > boundaries.yMax
    );
};

export const randomFoodPosition = (maxX: number, maxY: number): Coordinate => {
    return {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY),
    };
};

const GAME_BOUNDS = { xMin: 1, xMax: 0, yMin: 1, yMax: 0 };
const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

export default function SnakeGame(): JSX.Element {
    // @ts-ignore
    const {user, setUser} = useAuth();
    const [direction, setDirection] = useState<Direction>(Direction.Right);
    const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
    const [score, setScore] = useState<number>(0);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    const [showGameOver, setShowGameOver] = useState<boolean>(false);
    const [coins, setCoins] = useState<number>(0);

    useEffect(() => {
        if (!isGameOver) {
            const intervalId = setInterval(() => {
                !isPaused && moveSnake();
            }, MOVE_INTERVAL);
            return () => clearInterval(intervalId);
        }
    }, [snake, isGameOver, isPaused]);

    const updateGameBounds = (event) => {
        const { width, height } = event.nativeEvent.layout;
        const CELL_SIZE = 10;
        const numCellsX = Math.floor(width / CELL_SIZE);
        const numCellsY = Math.floor(height / CELL_SIZE);
        GAME_BOUNDS.xMax = numCellsX - 4;
        GAME_BOUNDS.yMax = numCellsY - 4;
    };

    const moveSnake = () => {
        const snakeHead = snake[0];
        const newHead = { ...snakeHead };

        // GAME OVER
        if (checkGameOver(snakeHead, GAME_BOUNDS)) {
            let coins = Math.floor(score / 100);

            axiosInstance.put(`user/resources/${user.id}/${coins}/0`).then((res) => {
                user.coins += coins;
                setUser(User.copy(user));
            }).catch((err) => {
                console.log(err);
            });

            setCoins(coins);
            setShowGameOver(true);
            setTimeout(() => {
                    setShowGameOver(false);
                }, 3500);
            setIsGameOver((prev) => !prev);
            return;
        }

        switch (direction) {
            case Direction.Up:
                newHead.y -= 1;
                break;
            case Direction.Down:
                newHead.y += 1;
                break;
            case Direction.Left:
                newHead.x -= 1;
                break;
            case Direction.Right:
                newHead.x += 1;
                break;
            default:
                break;
        }

        if (checkEatsFood(newHead, food, 2)) {
            setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
            setSnake([newHead, ...snake]);
            setScore(score + SCORE_INCREMENT);
        } else {
            setSnake([newHead, ...snake.slice(0, -1)]);
        }
    };

    const handleGesture = (event: GestureEventType) => {
        const { translationX, translationY } = event.nativeEvent;
        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0) {
                setDirection(Direction.Right);
            } else {
                setDirection(Direction.Left);
            }
        } else {
            if (translationY > 0) {
                setDirection(Direction.Down);
            } else {
                setDirection(Direction.Up);
            }
        }
    };

    const reloadGame = () => {
        setSnake(SNAKE_INITIAL_POSITION);
        setFood(FOOD_INITIAL_POSITION);
        setIsGameOver(false);
        setScore(0);
        setDirection(Direction.Right);
        setIsPaused(false);
    };

    const pauseGame = () => {
        setIsPaused(!isPaused);
    };

    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={styles.container}>
                <Header
                    reloadGame={reloadGame}
                    pauseGame={pauseGame}
                    isPaused={isPaused}
                >
                    <Score score={score} />
                </Header>
                <View style={styles.boundaries} onLayout={updateGameBounds}>
                    <Snake snake={snake} />
                    <Food x={food.x} y={food.y} />
                    { showGameOver && <GameOver coins={coins} onClose={() => setShowGameOver(false)}/>}
                </View>
            </SafeAreaView>
        </PanGestureHandler>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SnakeColors.primary,
    },
    boundaries: {
        flex: 1,
        borderColor: SnakeColors.primary,
        borderWidth: 12,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: SnakeColors.background,
    },
});