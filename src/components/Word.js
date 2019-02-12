import React from "react";
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Audio} from 'expo';
import {disabledColor, lightGreen, monsterratItalic, monsterratMedium, monsterratRegular} from "../constants";
import {WordShape} from "../utils/WordUtils";
import PropTypes from 'prop-types';

export default class Word extends React.Component {
    state = {
        volumeBtnColor: lightGreen,
        volumeBtnContainerColor: 'white',
        isPlaying: false
    };

    static propTypes = {
        wordForm: WordShape,
        disableBtn: PropTypes.bool,
    };

    static defaultProps = {
        disableBtn: false,
        wordForm: null
    };

    _onPlaybackStatusUpdate = ({didJustFinish}) => {
        if (didJustFinish) {
            this._hideUnderlay();
        }
    };

    _showUnderlay = () => {
        this.setState({
            isPlaying: true,
            volumeBtnColor: 'white',
            volumeBtnContainerColor: lightGreen,
        });
    };

    _hideUnderlay = () => {
        this.setState({
            volumeBtnColor: lightGreen,
            volumeBtnContainerColor: 'white',
            isPlaying: false
        });
    };

    _onAudioPlay = async () => {
        const {audio} = this.props.wordForm;

        if (!audio) return;

        try {
            this._showUnderlay();
            const {sound} = await Audio.Sound.createAsync(audio, {shouldPlay: true});
            sound.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
        } catch (e) {
            console.log('Audio error')
        }
    };

    render() {
        if (!this.props.wordForm) return null;

        const {isPlaying, volumeBtnColor, volumeBtnContainerColor} = this.state;
        const {wordForm: {word, spelling, meaning}, disableBtn} = this.props;
        const {container, wordStyle, spellingStyle, meaningStyle, volumeBtnContainer} = styles;

        const dynamicBtn = {
            backgroundColor: volumeBtnContainerColor,
            borderColor: disableBtn ? disabledColor : lightGreen,
        };

        return (
            <View style={container}>
                <Text style={wordStyle}>{word}</Text>
                <Text style={spellingStyle}>{spelling}</Text>
                <Text style={meaningStyle}>{meaning}</Text>
                <TouchableHighlight
                    style={[volumeBtnContainer, dynamicBtn]}
                    onPress={this._onAudioPlay}
                    underlayColor={'transparent'}
                    disabled={disableBtn || isPlaying}
                >
                    <Ionicons
                        name={'md-volume-high'}
                        size={30}
                        color={disableBtn ? disabledColor : volumeBtnColor}
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
        padding: 5,
        marginTop: 5
    }
});