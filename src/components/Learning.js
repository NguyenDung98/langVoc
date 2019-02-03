import React from "react";
import {Image, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import Guide from "./Guide";
import Word from "./Word";
import Answer from "./Answer";
import {WordShape} from "../utils/WordUtils";

export default function Learning({wordForm, guide}) {
    return (
        <View style={styles.container}>
            <Guide
                content={guide}
            />
            <Word wordForm={wordForm}/>
            <Answer
                placeholder={wordForm.word}
            />
        </View>
    )
}

Learning.propTypes = {
    wordForm: WordShape.isRequired,
    guide: PropTypes.string,
};

Learning.defaultProps = {
    guide: '',
};

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: 'white',
        padding: 15
    }
});