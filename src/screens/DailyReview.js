import React from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import StatusBar from "../components/StatusBar";
import ProgressBar from "../components/ProgressBar";
import {ViewPager} from "rn-viewpager";
import {createDailyReview} from "../utils";
import {data} from "../constants";
import AnswerModal from "../components/AnswerModal";
import store from "../store";

export default class DailyReview extends React.Component {
	static navigationOptions = {
		header: null,
	};

	viewPager = null;

	_moveToNextDeck = () => {
		const { totalPossibleGrade, currentDeck, vocab, badDecks, lessonOver } = store.getState();
		let index = 0;

		if (totalPossibleGrade > 30) return this._endLesson(false);

		if (currentDeck < vocab.length - 1 && !lessonOver) {
			index = currentDeck + 1;
			store.setState({
				currentDeck: index,
			});

			this.viewPager.setPage(index);
		} else if (badDecks.length) {
			index = badDecks.shift();
			store.setState({
				currentDeck: index,
				lessonOver: true,
			});

			this.viewPager.setPageWithoutAnimation(index);
		} else {
			this._endLesson(true);
		}
	};

	_endLesson = (finished) => {
		const { navigation: {goBack, replace} } = this.props;

		if (finished) {
			alert(`Chúc mừng bạn đã hoàn thành bài học ^^`);
			replace('WordList')
		} else {
			alert('Bạn gõ sai quá nhiều, bắt đầu lại nhé!')
		}

		goBack();
	};

	render() {
		return (
			<KeyboardAvoidingView
				style={styles.container}
				behavior={'padding'}
				enabled
			>
				<StatusBar translucent backgroundColor={'#068E47'}/>
				<ProgressBar
					goBack={() => alert("hello")}
				/>
				<ViewPager
					ref={viewPager => this.viewPager = viewPager}
					style={styles.container}
					horizontalScroll={false}
				>
					{createDailyReview(data)}
				</ViewPager>
				<AnswerModal
					moveToNextDeck={this._moveToNextDeck}
				/>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
