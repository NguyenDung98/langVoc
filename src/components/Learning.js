import React from "react";
import {View, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import Guide from "./Guide";
import Word from "./Word";
import Answer from "./Answer";

export default function Learning({word, meaning, spelling}) {
    return (
        <View style={styles.container}>
            <Guide
                content={'Nhập từ vào ô bên dưới'}
            />
            <Word
                word={word}
                spelling={spelling}
                meaning={meaning}
            />
            <Answer
                placeholder={word}
            />
        </View>
    )
}

Learning.propTypes = {
    word: PropTypes.string.isRequired,
    meaning: PropTypes.string,
    spelling: PropTypes.string,
};

Learning.defaultProps = {
    meaning: '',
    spelling: ''
};

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: 'white',
        padding: 15
    }
});