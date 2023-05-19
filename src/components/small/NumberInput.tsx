import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const NumberInput = ({ minvalue, maxvalue, onValueChange, initial }) => {
    const [value, setValue] = useState(initial.toString());
    const minValue = minvalue;
    const maxValue = maxvalue;

    const handleInputChange = (text) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        const numberValue = parseInt(numericValue, 10);
        if (!isNaN(numberValue)) {
            const constrainedValue = Math.max(Math.min(numberValue, maxValue), minValue);
            setValue(constrainedValue.toString());
            onValueChange(constrainedValue);
        } else {
            setValue('');
        }
    };

    return (
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={handleInputChange}
            keyboardType="numeric"
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: '70%',
        height: 24,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: 'black',
        fontSize: 16,
        paddingHorizontal: 8,
    },
});

export default NumberInput;
