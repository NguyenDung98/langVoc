import React from "react";
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {lightGreen, monsterratItalic, monsterratMedium, monsterratRegular} from "../constants";
import PropTypes from "prop-types";

export default class Word extends React.Component {
    state = {
        volumBtnColor: lightGreen
    };

    static propTypes = {
        word: PropTypes.string.isRequired,
        meaning: PropTypes.string,
        spelling: PropTypes.string,
    };

    static defaultProps = {
        meaning: '',
        spelling: ''
    };

    _toggleBtnColor = isClicked => {
        if (isClicked) {
            this.setState({volumBtnColor: 'white'});
            return;
        }

        this.setState({volumBtnColor: lightGreen})
    };

    render() {
        const {word, spelling, meaning} = this.props;
        const {container, wordStyle, spellingStyle, meaningStyle, volumeBtnContainer} = styles;

        return (
            <View style={container}>
                <Text style={wordStyle}>{word}</Text>
                <Text style={spellingStyle}>{spelling}</Text>
                <Text style={meaningStyle}>{meaning}</Text>
                <TouchableHighlight
                    style={volumeBtnContainer}
                    onPress={() => alert("hello")}
                    onShowUnderlay={() => this._toggleBtnColor(true)}
                    onHideUnderlay={this._toggleBtnColor}
                    underlayColor={lightGreen}
                >
                    <Ionicons
                        name={'md-volume-high'}
                        size={30}
                        color={this.state.volumBtnColor}
                    />
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    wordStyle: {
        fontSize: 30,
        fontFamily: monsterratMedium,
        color: lightGreen
    },
    spellingStyle: {
        fontSize: 15,
        fontFamily: monsterratItalic,
        color: '#818181'
    },
    meaningStyle: {
        fontSize: 17,
        fontFamily: monsterratRegular,
    },
    volumeBtnContainer: {
        height: 45,
        width: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 55 * 0.5,
        borderWidth: 1,
        borderColor: lightGreen,
        padding: 5,
        marginTop: 5
    }
});