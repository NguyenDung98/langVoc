import React from "react";
import {StyleSheet, TouchableHighlight, ScrollView, View} from 'react-native';
import Card from "./Card";
import Guide from "./Guide";
import Button from "./Button";
import PropTypes from "prop-types";

import {Audio} from "expo";

import {disabledColor, lightGreen, monsterratRegular, red} from "../constants";
import {CardShape, WordShape} from "../utils";
import store from "../store";

import correctSound from "../../assets/correct.mp3";
import incorrectSound from '../../assets/incorrect.mp3';

export default class Options extends React.Component {
	static propTypes = {
		cardForm: CardShape.isRequired,
		rightAnswer: WordShape.isRequired,
		hideDefinition: PropTypes.bool,
		options: PropTypes.arrayOf(PropTypes.string),
		guide: PropTypes.string,
	};

	state = {
		rightAnswerBackgroundColor: 'transparent',
		rightAnswerBorderColor: disabledColor,
		textColor: 'black',
		showAnswerEffect: false,
		chosenAnswer: '',
	};

	_handleChooseAnswer = async (option) => {
		const { chosenAnswer } = this.state;
		const { userGrade } = store.getState();
		const { moveToNextQuestion, rightAnswer: {word} } = this.props;

		if (chosenAnswer) return;

		if (option.toLowerCase() === word.toLowerCase()) {
			this.setState({
				rightAnswerBackgroundColor: lightGreen,
				rightAnswerBorderColor: lightGreen,
				textColor: 'white',
				showAnswerEffect: true,
				chosenAnswer: option,
			});
			await Audio.Sound.createAsync(correctSound, { shouldPlay: true });
		} else {
			this.setState({
				rightAnswerBackgroundColor: red,
				rightAnswerBorderColor: red,
				textColor: 'white',
				showAnswerEffect: true,
				chosenAnswer: option,
			});
			await Audio.Sound.createAsync(incorrectSound, { shouldPlay: true });
		}

		store.setState({
			userGrade: userGrade + 1,
		});
		setTimeout(moveToNextQuestion, 1000);
	};

	render() {
		const { cardForm, hideDefinition, options, guide } = this.props;
		const { answerContainer, optionContainerStyle, optionStyle, optionTextStyle } = styles;
		const { rightAnswerBackgroundColor, rightAnswerBorderColor, textColor, showAnswerEffect, chosenAnswer } = this.state;

		const rightAnswerStyle = showAnswerEffect ? {
			backgroundColor: rightAnswerBackgroundColor,
			borderColor: rightAnswerBorderColor,
		} : {};
		const rightAnswerTextStyle = showAnswerEffect ? {
			color: textColor,
		} : {};

		return (
			<ScrollView contentContainerStyle={{flex: 1}}>
				<Card
					cardForm={cardForm}
					hideDefinition={hideDefinition}
				/>
				<View style={answerContainer}>
					<Guide content={guide}/>
					<View style={optionContainerStyle}>
						{options.map((option, index) => (
							<Button
								key={index}
								showIcon={false}
								title={option}
								ButtonType={TouchableHighlight}
								buttonProps={{
									underlayColor: 'transparent',
								}}
								style={[optionStyle, chosenAnswer === option ? rightAnswerStyle : {}]}
								textStyle={[optionTextStyle, chosenAnswer === option ? rightAnswerTextStyle : {}]}
								onPress={() => this._handleChooseAnswer(option)}
							/>
						))}
					</View>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	answerContainer: {
		flex: 3,
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
	optionContainerStyle: {
		flex: 1,
		justifyContent: 'space-evenly',
	},
	optionStyle: {
		borderWidth: 2,
		borderColor: disabledColor,
		borderRadius: 10,
		padding: 13,
	},
	optionTextStyle: {
		fontFamily: monsterratRegular,
		fontSize: 18,
		textAlign: 'center',
	},
});
