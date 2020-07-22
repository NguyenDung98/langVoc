import React from "react";
import {View, StyleSheet, ColorPropType, Text, TouchableHighlight} from 'react-native';
import Button from "./Button";

import {Ionicons} from '@expo/vector-icons';
import {Audio} from 'expo-av';

import {DISABLED_COLOR, MONTSERRAT_ITALIC, MONTSERRAT_MEDIUM, MONTSERRAT_REGULAR} from "../constants";
import {WordShape} from "../utils/WordUtils";
import PropTypes from 'prop-types';

export default class Word extends React.Component {
    static propTypes = {
        wordForm: WordShape,
        disableBtn: PropTypes.bool,
        mainColor: ColorPropType.isRequired,
    };

    static defaultProps = {
        disableBtn: false,
        wordForm: null,
    };

	state = {
		volumeBtnContainerColor: 'white',
		volumeBtnColor: this.props.mainColor,
		isPlaying: false
	};

	_onPlaybackStatusUpdate = ({didJustFinish}) => {
        if (didJustFinish) {
            this._hideUnderlay();
        }
    };

    _showUnderlay = () => {
        const { mainColor } = this.props;

        this.setState({
            isPlaying: true,
            volumeBtnColor: 'white',
            volumeBtnContainerColor: mainColor,
        });
    };

    _hideUnderlay = () => {
	    const { mainColor } = this.props;

	    this.setState({
            volumeBtnColor: mainColor,
            volumeBtnContainerColor: 'white',
            isPlaying: false
        });
    };

    _onAudioPlay = async () => {
        const {audio} = this.props.wordForm;

        if (!audio) return;

        try {
            this._showUnderlay();
            await Audio.Sound.createAsync(audio, { shouldPlay: true }, this._onPlaybackStatusUpdate);
        } catch (e) {
            console.log('Audio error')
        }
    };

    render() {
        if (!this.props.wordForm) return null;

        const {isPlaying, volumeBtnColor, volumeBtnContainerColor} = this.state;
        const {wordForm: {word, spelling, meaning}, disableBtn, mainColor} = this.props;
        const {container, wordStyle, spellingStyle, meaningStyle, volumeBtnContainer} = styles;

        const dynamicBtn = {
            backgroundColor: volumeBtnContainerColor,
            borderColor: disableBtn ? DISABLED_COLOR : mainColor,
        };

        return (
            <View style={container}>
                <Text style={[wordStyle, { color: mainColor }]}>{word}</Text>
                <Text style={spellingStyle}>{spelling}</Text>
                <Text style={meaningStyle}>{meaning}</Text>
                <Button
                    style={[volumeBtnContainer, dynamicBtn]}
                    onPress={this._onAudioPlay}
                    buttonProps={{
                        underlayColor: 'transparent',
                        disabled: disableBtn || isPlaying,
                    }}
                    name={'md-volume-high'}
                    iconSize={30}
                    color={disableBtn ? DISABLED_COLOR : volumeBtnColor}
                    IconType={Ionicons}
                    ButtonType={TouchableHighlight}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
	    flex: 3,
	    alignItems: 'center',
	    justifyContent: 'space-evenly',
	    marginBottom: 10,
    },
    wordStyle: {
        fontSize: 30,
        fontFamily: MONTSERRAT_MEDIUM,
    },
    spellingStyle: {
        fontSize: 15,
        fontFamily: MONTSERRAT_ITALIC,
        color: '#818181'
    },
    meaningStyle: {
        fontSize: 17,
        fontFamily: MONTSERRAT_REGULAR,
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
