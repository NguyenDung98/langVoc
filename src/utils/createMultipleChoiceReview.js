import React from "react";
import {View} from "react-native";
import Options from "../components/Options";
import {createCard} from "./CardUtils";
import store from "../store";

let key = 0;
const getKey = () => {
	return key++;
};

const createMultipleChoiceQuestion = (word, choices, moveToNextQuestion) => {
	return (
		<View style={{flex: 1}} key={getKey()}>
			<Options
				guide={'Bạn chọn 1 đáp án đúng nhé!'}
				cardForm={createCard({
					image: word.image,
				})}
				hideDefinition
				rightAnswer={word}
				options={choices}
				moveToNextQuestion={moveToNextQuestion}
			/>
		</View>
	)
};


const shuffle = (a) => {
	const arrCopy = a.slice();

	for (let i = arrCopy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
	}
	return arrCopy;
};

export const createMultipleChoiceReview = (data, moveToNextQuestion) => {
	key = 0;
	store.setState({
		totalPossibleGrade: data.length,
		userGrade: 0,
		multipleChoiceGrade: 0,
	});

	return data.map((word, index) => {
		const clonedData = [...data];
		clonedData.splice(index, 1);
		const otherChoices = [];

		for (let i = 0; i < 3; i++) {
			const randomNum = Math.floor(Math.random() * clonedData.length);

			otherChoices.push(clonedData[randomNum].word);
			clonedData.splice(randomNum, 1);
		}

		return createMultipleChoiceQuestion(
			word,
			shuffle([
				word.word,
				...otherChoices,
			]),
			moveToNextQuestion
		)
	})
};
