import {createFourthDeck} from "./createDeckLesson";
import store from "../store";

export const createDailyReview = (data) => {
	store.setState({
		userGrade: 0,
		totalPossibleGrade: data.length,
		decksLeft: data.length,
		vocab: data,
		lessonOver: false,
		currentDeck: 0,
		badDecks: [],
	});

	return data.map(vocab => createFourthDeck(vocab));
};
