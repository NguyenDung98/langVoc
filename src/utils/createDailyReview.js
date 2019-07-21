import {createFourthDeck} from "./createDeckLesson";
import store from "../store";

export const createDailyReview = (data) => {
	store.setState({
		vocab: data, // số từ cần được ôn tập
		mode: 'reviewing',
		totalPossibleGrade: data.length,
		decksLeft: data.length,

		userGrade: 0,
		lessonOver: false,
		currentDeck: 0,
		badDecks: [],
	});

	return data.map(vocab => createFourthDeck(vocab));
};
