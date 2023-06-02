import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomCheckbox = ({ label, value, onValueChange, unique=false }) => {
    const [checked, setChecked] = useState(value);

    const handlePress = () => {
        const newValue = !checked;
        setChecked(newValue);
        if (!unique) {
            onValueChange(newValue);
        } else {
            //if (newValue) {
                onValueChange(value);
            //}
        }
    };

    useEffect(() => {
        setChecked(value);
    }, [value]);

    return (
        <TouchableOpacity style={styles.checkboxContainer} onPress={handlePress}>
            <View style={[styles.checkbox, (unique?value:checked) && styles.checkedCheckbox]}>
                {(unique?value:checked) && <Icon name="check" size={16} color="white" />}
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
