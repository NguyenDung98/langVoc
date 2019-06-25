let state = {
	// lesson
	vocab: [],
	decksLength: 0,
	decksLeft: 0,
	badDecks: [],
	currentDeck: 0,
	currentWord: '',
	lessonOver: false,
	totalPossibleGrade: 1,
	userGrade: 0,

	userAnswer: false,
	showAnswerModal: false,
	// review
	multipleChoiceGrade: 0,
};

let listeners = [];

export default {
	getState() {
		return state;
	},
	setState(newState) {
		const oldState = {...state};
		state = {...state, ...newState};
		listeners.forEach(listener => listener(oldState))
	},
	onChange(newListener) {
		listeners.push(newListener);
		return () => {
			listeners = listeners.filter(listener => listener !== newListener)
		}
	},
};
