import React from "react";
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import Guide from "./Guide";
import Word from "./Word";
import Answer from "./Answer";
import {WordShape} from "../utils/WordUtils";

export default function Learning({wordForm, guide, placeholder, disableBtn}) {
    return (
        <View style={styles.container}>
            <Guide
                content={guide}
            />
            <Word
                wordForm={wordForm}
                disableBtn={disableBtn}
            />
            <Answer
                placeholder={placeholder}
            />
        </View>
    )
}

Learning.propTypes = {
    wordForm: WordShape,
    guide: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    disableBtn: PropTypes.bool
};

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: 'white',
        padding: 15
    }
});