import React from "react";
import {View, StyleSheet, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import {lightGreen, monsterratMedium} from "../constants";

export default function Answer({placeholder}) {
    const {container, inputContainer, inputStyle, answerStyle, checkBtnContainer} = styles;

    return (
        <View style={container}>
            <View style={answerStyle}>
                <View style={inputContainer}>
                    <TextInput
                        placeholder={placeholder}
                        style={inputStyle}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => alert('hello')}
                    style={checkBtnContainer}
                >
                    <AntDesign
                        name="caretright"
                        size={35}
                        color={"#ff5a58"}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: 5
    },
    answerStyle: {
        flexDirection: 'row'
    },
    inputContainer: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderRadius: (width - 30) * 0.01,
        borderColor: lightGreen
    },
    inputStyle: {
        fontSize: 20,
        fontFamily: monsterratMedium
    },
    checkBtnContainer: {
        width: 50,
        height: 50,
        padding: 5,
        alignSelf: 'center'
    }
});