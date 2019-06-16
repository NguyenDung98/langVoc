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

const createFirstDeck = ({ word, spelling, meaning, audio, image, wordType, definition }, moveToNextPage) => {
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
				moveToNextPage={moveToNextPage}
			/>
		</View>
	)
};

const createSecondDeck = ({ word, spelling, meaning, audio, image }, moveToNextPage) => {
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
				moveToNextPage={moveToNextPage}
			/>
		</View>
	)
};

const createThirdDeck = ({ word, meaning, audio, image }, moveToNextPage) => {
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
				moveToNextPage={moveToNextPage}
			/>
		</View>
	)
};

const createFourthDeck = ({ word, image }, moveToNextPage) => {
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
				moveToNextPage={moveToNextPage}
			/>
		</View>
	)
};

export const createDeckLesson = (vocab, moveToNextPage) => {
	const decks = [];
	const [firstWord, secondWord, thirdWord, fourthWord, fifthWord] = vocab;

	decks.push(createFirstDeck(firstWord, moveToNextPage));
	decks.push(createFirstDeck(secondWord, moveToNextPage));

	decks.push(createSecondDeck(firstWord, moveToNextPage));
	decks.push(createSecondDeck(secondWord, moveToNextPage));
	decks.push(createFirstDeck(thirdWord, moveToNextPage));
	decks.push(createFirstDeck(fourthWord, moveToNextPage));

	decks.push(createThirdDeck(firstWord, moveToNextPage));
	decks.push(createThirdDeck(secondWord, moveToNextPage));
	decks.push(createSecondDeck(thirdWord, moveToNextPage));
	decks.push(createSecondDeck(fourthWord, moveToNextPage));
	decks.push(createFirstDeck(fifthWord, moveToNextPage));

	decks.push(createSecondDeck(fifthWord, moveToNextPage));
	decks.push(createThirdDeck(thirdWord, moveToNextPage));
	decks.push(createThirdDeck(fourthWord, moveToNextPage));
	decks.push(createThirdDeck(fifthWord, moveToNextPage));

	decks.push(createFourthDeck(firstWord, moveToNextPage));
	decks.push(createFourthDeck(secondWord, moveToNextPage));
	decks.push(createFourthDeck(thirdWord, moveToNextPage));
	decks.push(createFourthDeck(fourthWord, moveToNextPage));
	decks.push(createFourthDeck(fifthWord, moveToNextPage));

	store.setState({
		decksLength: decks.length,
	});
	return decks;
};
