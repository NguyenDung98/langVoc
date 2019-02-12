import React from "react";
import {ScrollView, StyleSheet} from "react-native";
import Card from "./Card";
import Learning from "./Learning";
import PropTypes from 'prop-types';
import {CardShape, WordShape} from '../utils';

export default function Content({cardForm, wordForm, guide, hideDefinition, placeholder, disableBtn}) {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.container}
            keyboardDismissMode={'none'}
            keyboardShouldPersistTaps={'handled'}
        >
            <Card
                cardForm={cardForm}
                hideDefinition={hideDefinition}
            />
            <Learning
                guide={guide}
                wordForm={wordForm}
                placeholder={placeholder}
                disableBtn={disableBtn}
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
    hideDefinition: PropTypes.bool,
    wordForm: WordShape,
    guide: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    disableBtn: PropTypes.bool
};