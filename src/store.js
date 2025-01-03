let state = {
	// lesson
	mode: '',
	vocab: [],
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
	multipleChoiceGrade: [],
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
