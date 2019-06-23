import React from "react";
import {View} from "react-native";
import Content from "../components/Content";
import {createCard} from "./CardUtils";
import {createWord} from "./WordUtils";
import store from "../store";

let key = 0;
const getKey = () => {
	return key++;
};

const createFirstDeck = ({ word, spelling, meaning, audio, image, wordType, definition }) => {
	return (
		<View style={{flex: 1}} key={getKey()}>
			<Content
				guide={'Nhập từ vào ô bên dưới'}
				cardForm={createCard({
					image,
					wordType,
					definition,
				})}
				wordForm={createWord({
					word,
					spelling,
					meaning,
					audio,
				})}
				placeholder={'Nhập đáp án'}
				rightAnswer={word}
			/>
		</View>
	)
};

const createSecondDeck = ({ word, spelling, meaning, audio, image }) => {
	return (
		<View style={{flex: 1}} key={getKey()}>
			<Content
				guide={'Bạn đoán xem từ này là gì?'}
				cardForm={createCard({
					image,
				})}
				hideDefinition
				wordForm={createWord({
					word: '???',
					spelling,
					meaning,
					audio,
				})}
				placeholder={'Nhập đáp án'}
				rightAnswer={word}
			/>
		</View>
	)
};

const createThirdDeck = ({ word, meaning, audio, image }) => {
	return (
		<View style={{flex: 1}} key={getKey()}>
			<Content
				guide={'Bạn đoán xem từ này là gì?'}
				cardForm={createCard({
					image,
				})}
				hideDefinition
				wordForm={createWord({
					word: '???',
					meaning,
					audio,
				})}
				disableBtn
				placeholder={'Nhập đáp án'}
				rightAnswer={word}
			/>
		</View>
	)
};

const createFourthDeck = ({ word, image }) => {
	return (
		<View style={{flex: 1}} key={getKey()}>
			<Content
				guide={'Bạn đoán xem từ này là gì?'}
				cardForm={createCard({
					image,
				})}
				wordForm={createWord({
					word: '???',
				})}
				disableBtn
				hideDefinition
				placeholder={'Nhập đáp án'}
				rightAnswer={word}
			/>
		</View>
	)
};

export const createDeckLesson = (vocab) => {
	key = 0;
	const decks = [];
	const [firstWord, secondWord, thirdWord, fourthWord, fifthWord] = vocab;

	decks.push(createFirstDeck(firstWord));
	decks.push(createFirstDeck(secondWord));

	decks.push(createSecondDeck(firstWord));
	decks.push(createSecondDeck(secondWord));
	decks.push(createFirstDeck(thirdWord));
	decks.push(createFirstDeck(fourthWord));

	decks.push(createThirdDeck(firstWord));
	decks.push(createThirdDeck(secondWord));
	decks.push(createSecondDeck(thirdWord));
	decks.push(createSecondDeck(fourthWord));
	decks.push(createFirstDeck(fifthWord));

	decks.push(createSecondDeck(fifthWord));
	decks.push(createThirdDeck(thirdWord));
	decks.push(createThirdDeck(fourthWord));
	decks.push(createThirdDeck(fifthWord));

	decks.push(createFourthDeck(firstWord));
	decks.push(createFourthDeck(secondWord));
	decks.push(createFourthDeck(thirdWord));
	decks.push(createFourthDeck(fourthWord));
	decks.push(createFourthDeck(fifthWord));

	store.setState({
		vocab,
		decksLength: decks.length,
		totalPossibleGrade: decks.length,
		userGrade: 0,
	});
	return decks;
};
