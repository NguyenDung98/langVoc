import store from "../store";

export const updateWordMultipleChoice = () => {
	const { vocab, multipleChoiceGrade } = store.getState();

	store.setState({
		vocab: vocab.map((word, index) => {
			const updatedWord = {
				...word,
				totalPossibleGrade: word.totalPossibleGrade + 1,
				multipleChoiceGrade:
					multipleChoiceGrade[index] ? word.multipleChoiceGrade + 1 : word.multipleChoiceGrade,
			};

			return {
				...updatedWord,
				priority: checkPriorityCondition(updatedWord),
			}
		})
	});
};

const checkPriorityCondition = ({ reviewDate, totalPossibleGrade, multipleChoiceGrade }) => {
	if (totalPossibleGrade < 5) {
		return 1;
	} else if (totalPossibleGrade < 10) {
		return 2;
	} else if (multipleChoiceGrade / totalPossibleGrade < 0.8) {
		return 3;
	}

	return null;
};
