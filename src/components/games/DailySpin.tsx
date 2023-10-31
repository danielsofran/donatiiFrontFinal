import {ScrollView, StyleSheet, Text} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
    useDerivedValue,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import WalletView from "../game_utils/roulette/WalletView";
import SpinHeader from "../game_utils/roulette/SpinHeader";
import Wheel from "../game_utils/roulette/Wheel";
import {SCREEN_WIDTH} from "../game_utils/roulette/Screen";
import {useAuth} from "../../utils/context/UseAuth";
import {axiosInstance} from "../../api/axiosInstance";
import {validateAnimatedStyles} from "react-native-reanimated/lib/types/lib/reanimated2/hook/utils";
import {User} from "../../model/User";

const segments = [25, 15, 10, 5, 3, 0];
const cost = 10;

const DailySpin = () => {
    // @ts-ignore
    const {user, setUser} = useAuth();
    const insets = useSafeAreaInsets();
    const labelOpacity = useSharedValue(0);
    const [walletBalance, setWalletBalance] = useState(user.coins.toString());
    const amount = useSharedValue(Number(user.coins));

    const handleWheelEnd = (value: number) => {
        user.coins += value;
        axiosInstance.put(`user/resources/${user.id}/${value}/0`).then(() => {
            setUser(User.copy(user));
            setWalletBalance(amount.value + " + " + value.toString());
            labelOpacity.value = withTiming(1, {duration: 800});
            amount.value = withTiming(value + amount.value, {
                duration: 800,
            });
        });
    };

    const handleOnSpin = () => {
        //amount.value = 5;
        amount.value -= cost;
        user.coins -= cost;
        axiosInstance.put(`user/resources/${user.id}/${-cost}/0`).then(() => {
            setUser(User.copy(user));
            console.warn('Coins updated!')
            setWalletBalance("");
            labelOpacity.value = 0;
        });

    };

    const amountText = useDerivedValue(() => {
        return `${amount.value.toFixed(1)}`;
    }, []);

    return (
        <ScrollView>
            <LinearGradient
                style={[styles.container, { paddingTop: insets.top }]}
                colors={["#5C367D", "#00153B"]}
            >
                <SpinHeader />
                <Text style={styles.multiplyEarningsText}>Multiply your Coins</Text>
                <WalletView
                    opacity={labelOpacity}
                    amountText={amountText}
                    walletBalance={walletBalance}
                />
                <Wheel segments={segments} onEnd={handleWheelEnd} onSpin={handleOnSpin} />
            </LinearGradient>
        </ScrollView>
    );
};

export default DailySpin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: SCREEN_WIDTH / 1.4,
        alignSelf: "flex-start",
        alignItems: "center",
        paddingBottom: 20,
        paddingHorizontal: 16,
    },
    closeButton: {
        padding: 8,
        backgroundColor: "#454D77",
        borderRadius: 14,
        paddingBottom: 10,
    },
    topBarText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    divider: {
        backgroundColor: "#424677",
        width: SCREEN_WIDTH * 0.9,
        height: 1,
    },
    multiplyEarningsText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 10,
        marginBottom: 20,
    },
    walletView: {
        position: "relative",
        marginTop: 30,
    },
    walletLabel: {
        flexDirection: "row",
        justifyContent: "center",
        columnGap: 4,
        alignItems: "center",
        position: "absolute",
        top: -15,
        zIndex: 2,
        width: 100,
        left: (SCREEN_WIDTH / 2 - 100) / 2,
        borderRadius: 50,
        paddingHorizontal: 12,
        height: 35,
    },
    walletLabelText: {
        fontSize: 18,
        fontWeight: "500",
    },
    walletContent: {
        width: SCREEN_WIDTH / 2,
        height: 110,
        borderColor: "rgba(209, 177, 177,0.4)",
        borderWidth: 1,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    walletTextContainer: {
        rowGap: 8,
    },
    addedToWalletText: {
        color: "white",
    },
    walletAmountContainer: {
        flexDirection: "row",
        columnGap: 10,
        alignItems: "center",
    },
    walletAmountText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
});