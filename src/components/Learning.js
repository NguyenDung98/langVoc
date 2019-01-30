import React from "react";
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import Guide from "./Guide";
import Word from "./Word";
import Answer from "./Answer";

export default function Learning({word, meaning, spelling, guide}) {
    return (
        <View style={styles.container}>
            <Guide
                content={guide}
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
    word: PropTypes.string,
    meaning: PropTypes.string,
    spelling: PropTypes.string,
    guide: PropTypes.string,
};

Learning.defaultProps = {
    word: '',
    meaning: '',
    spelling: '',
    guide: ''
};

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: 'white',
        padding: 15
    }
});