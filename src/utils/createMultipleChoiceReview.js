import React from "react";
import {View} from "react-native";
import Choices from "../components/Choices";
import {createCard} from "./CardUtils";
import store from "../store";

let key = 0;
const getKey = () => {
	return key++;
};

const createMultipleChoiceQuestion = (word, choices, moveToNextQuestion) => {
	return (
		<View style={{flex: 1}} key={getKey()}>
			<Choices
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

const breakToVocabSets = data => {
	const day = 3600 * 24 * 1000;

	return data.filter(word => !!word.priority || (word.priority === 1 && word.reviewDate <= Date.now() + day))
		.reduce((accumulator, currentValue) => {
			switch (currentValue.priority) {
				case 1:
					accumulator[0].push(currentValue);
					return accumulator;
				case 2:
					accumulator[1].push(currentValue);
					return accumulator;
				case 3:
					accumulator[2].push(currentValue);
					return accumulator;
			}
		}, [[], [], []])
};

const chooseWordsToReview = (number, sets) => {
	const result = [];

	while (number) {
		const residue = number % 3;
		const word = sets[residue].pop();

		if (word) {
			result.push(word);
		} else {
			const [tempWord, set] = getWord(sets);

			sets.forEach(originSet => {
				if (originSet.slice().pop() &&
					originSet.slice().pop().word === set.slice().pop().word) {
					originSet.pop();
				}
			});
			result.push(tempWord);
		}

		number--;
	}

	return result;
};

const getWord = (sets) => {
	let length = 3;
	const clonedSet = sets.slice();

	if (!sets[0].length) {
		clonedSet.splice(0, 1);
		length--;
	}
	if (!sets[1].length) {
		clonedSet.splice(1 - (3 - length), 1);
		length--;
	}
	if (!sets[2].length) {
		clonedSet.splice(2 - (3 - length), 1);
		length--;
	}

	const randomSet = Math.floor(Math.random() * length);

	return [clonedSet[randomSet].slice().pop(), clonedSet[randomSet]];
};

export const createMultipleChoiceReview = (number, data, moveToNextQuestion) => {
	key = 0;

	// 3 dòng dưới tạm thời bỏ qua
	const sets = breakToVocabSets(data);
	chooseWordsToReview(number, sets); // nên tạo firebase function xử lí
	// const shuffledData = shuffle([...firstSet.slice(0, ), ...secondSet.slice(0, ), ...thirdSet.slice(0, )]);

	const shuffledData = shuffle(data);

	store.setState({
		vocab: shuffledData, // số từ muốn ôn tập
		mode: 'multipleChoice',
		totalPossibleGrade: data.length,

		userGrade: 0,
		multipleChoiceGrade: [],
	});

	return shuffledData.map((word, index) => {
		const clonedData = shuffledData.slice();
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
