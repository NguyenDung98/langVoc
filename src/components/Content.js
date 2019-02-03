import React from "react";
import {ScrollView, StyleSheet} from "react-native";
import Card from "./Card";
import Learning from "./Learning";
import PropTypes from 'prop-types';
import {CardShape, WordShape} from '../utils';

export default function Content({cardForm, wordForm, guide}) {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.container}
            keyboardDismissMode={'none'}
            keyboardShouldPersistTaps={'always'}
        >
            <Card cardForm={cardForm}/>
            <Learning
                guide={guide}
                wordForm={wordForm}
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
    cardForm: CardShape.isRequired,
    wordForm: WordShape.isRequired,
    guide: PropTypes.string,
};

Content.defaultProps = {
    guide: ''
};