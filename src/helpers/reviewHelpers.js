import store from "../store";

export const updateWordReviewCalendar = () => {
	const { vocab } = store.getState();

	store.setState({
		vocab: vocab.map(word => {
			return {
				...word,
				...getReviewCalendar(word),
			}
		})
	})
};

const getReviewCalendar = ({ reviewTimes, bad }) => {
	const day = 3600 * 24 * 1000;
	const week = day * 7;
	const month = day * 30;

	if (bad) {
		return {
			reviewTimes: reviewTimes - 1,
			reviewDate: Date.now() + day,
			bad: null,
		}
	}

	if (reviewTimes <= 5) {
		return {
			reviewTimes: reviewTimes + 1,
			reviewDate: Date.now() + day * (reviewTimes + 1),
		}
	} else if (reviewTimes <= 8) {
		return {
			reviewTimes: reviewTimes + 1,
			reviewDate: Date.now() + week * (reviewTimes + 1 - 5),
		}
	} else if (reviewTimes < 11) {
		return {
			reviewTimes: reviewTimes + 1,
			reviewDate: Date.now() + month * (reviewTimes + 1 - 8),
		}
	} else if (reviewTimes === 11){
		return {
			reviewDate: Date.now() + month * (reviewTimes - 8),
		}
	}
};
