import React from "react";
import {View, StyleSheet, Text} from 'react-native';
import {monsterratRegular} from "../constants";
import PropTypes from 'prop-types';

export default function Guide({content}) {
    const {container, contentStyle} = styles;

    return (
        <View style={container}>
            <Text style={contentStyle}>
                {content}
            </Text>
        </View>
    )
}

Guide.propTypes = {
    content: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffd5ac',
        marginBottom: 10,
        padding: 10
    },
    contentStyle: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: monsterratRegular
    }
});