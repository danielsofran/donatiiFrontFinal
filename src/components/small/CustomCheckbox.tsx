import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomCheckbox = ({ label, value, onValueChange }) => {
    const [checked, setChecked] = useState(value);

    const handlePress = () => {
        const newValue = !checked;
        setChecked(newValue);
        onValueChange(newValue);
    };

    return (
        <TouchableOpacity style={styles.checkboxContainer} onPress={handlePress}>
            <View style={[styles.checkbox, checked && styles.checkedCheckbox]}>
                {checked && <Icon name="check" size={16} color="white" />}
            </View>
            <Text>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#bbb',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        marginTop: 7.5,

    },
    checkedCheckbox: {
        backgroundColor: 'green',
        borderColor: 'green',
    },
});

export default CustomCheckbox;
