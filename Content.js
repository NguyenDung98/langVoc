import React from "react";
import {Image, ScrollView, StyleSheet} from "react-native";
import Card from "./src/components/Card";
import Learning from "./src/components/Learning";
import PropTypes from 'prop-types';

export default function Content({image, wordType, definition, word, meaning, spelling, guide}) {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.container}
            keyboardDismissMode={'none'}
            keyboardShouldPersistTaps={'always'}
        >
            <Card
                image={image}
                definition={definition}
                wordType={wordType}
            />
            <Learning
                guide={guide}
                word={word}
                spelling={spelling}
                meaning={meaning}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    }
});

Content.propTypes = {
    image: Image.propTypes.source.isRequired,
    wordType: PropTypes.string.isRequired,
    definition: PropTypes.string.isRequired,
    word: PropTypes.string,
    meaning: PropTypes.string,
    spelling: PropTypes.string,
    guide: PropTypes.string,
};

Content.defaultProps = {
    word: '',
    meaning: '',
    spelling: '',
    guide: ''
};