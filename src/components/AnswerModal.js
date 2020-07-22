import React from "react";
import {View, Animated, StyleSheet, Modal, TouchableWithoutFeedback, Text} from 'react-native';
import Word from "./Word";
import Button from "./Button";

import {Audio} from 'expo-av';
import {FontAwesome, Entypo} from '@expo/vector-icons';

import correctSound from '../../assets/correct.mp3';
import incorrectSound from '../../assets/incorrect.mp3';
import store from "../store";
import {DARK_GREEN, LIGHT_GREEN, MONTSERRAT_MEDIUM, RED} from "../constants";
import {configureAnimations} from "../utils";

export default class AnswerModal extends React.Component {
	state = {
		wrongAnswer: false,
	};

	emotionScale = new Animated.Value(2);
	emotionRotate = new Animated.Value(0);

	componentDidMount() {
		this.unsubcribe = store.onChange((prevState) => {
			this._handleUpdateComponent(prevState);
		});
	}

	componentWillUnmount() {
		this.unsubcribe();
	}

	_handleUpdateComponent = (prevState) => {
		const { sadAnimations, happyAnimations } = configureAnimations(this.emotionScale, this.emotionRotate);
		const { userAnswer, showAnswerModal } = store.getState();

		if (showAnswerModal !== prevState.showAnswerModal) {
			if (showAnswerModal) {
				if (userAnswer) {
					this.setState({
						wrongAnswer: false,
					}, async () => {
						await Audio.Sound.createAsync(correctSound, { shouldPlay: true });
						Animated.sequence(happyAnimations).start();
					})
				} else {
					this.setState({
						wrongAnswer: true,
					}, async () => {
						await Audio.Sound.createAsync(incorrectSound, { shouldPlay: true });
						Animated.sequence(sadAnimations).start();
					})
				}
			}

			this.forceUpdate();
		}
	};

	_closeModal = () => {
		const { moveToNextDeck } = this.props;

		store.setState({
			showAnswerModal: false,
		});
		moveToNextDeck();
	};

	_getEmotionStyle = () => {
		const rotate = this.emotionRotate.interpolate({
			inputRange: [-1, 0, 1],
			outputRange: ['-30deg', '0deg', '30deg'],
		});

		return {
			transform: [{ rotate }, { scale: this.emotionScale }]
		}
	};

	render() {
		const { wrongAnswer } = this.state;
		const { currentWord, vocab, showAnswerModal } = store.getState();
		const currentVocab = vocab.find(({ word }) => word === currentWord);

		if (!currentVocab) return null;

		const { word, spelling, meaning, audio } = currentVocab;
		const { container, word: wordStyle, notifiedViewContainer, notifiedText, motionIcon } = styles;
		const backgroundColor = { backgroundColor: wrongAnswer ? RED : LIGHT_GREEN};

		return (
			<Modal
				visible={showAnswerModal}
				onRequestClose={this._closeModal}
				animationType={'fade'}
				transparent
			>
				<View style={{flex: 1}}>
					<TouchableWithoutFeedback onPress={this._closeModal}>
						<View style={container} />
					</TouchableWithoutFeedback>
					<View style={wordStyle}>
						<View style={[notifiedViewContainer, backgroundColor]}>
							<Text style={notifiedText}>
								{wrongAnswer ? 'Incorrect!!!' : 'Correct!!!'}
							</Text>
						</View>
						<Button
							name={wrongAnswer ? 'emoji-sad' : 'thumbs-o-up'}
							IconType={wrongAnswer ? Entypo : FontAwesome}
							color={wrongAnswer ? RED : DARK_GREEN}
							iconSize={35}
							style={[motionIcon, this._getEmotionStyle()]}
							animated
							buttonProps={{ disabled: true }}
						/>
						<Word
							wordForm={{ word, spelling, meaning, audio }}
							mainColor={wrongAnswer ? RED : LIGHT_GREEN}
						/>
					</View>
					<TouchableWithoutFeedback onPress={this._closeModal}>
						<View style={container} />
					</TouchableWithoutFeedback>
				</View>
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		height: '30%',
		width: '100%',
		backgroundColor: 'black',
		opacity: 0.4
	},
	word: {
		flex: 1,
		backgroundColor: 'white',
	},
	notifiedViewContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
	},
	notifiedText: {
		fontFamily: MONTSERRAT_MEDIUM,
		fontSize: 20,
		color: 'white',
	},
	motionIcon: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 5,
	}
});
