import React, {Component} from "react";
import {
	StyleSheet,
	KeyboardAvoidingView,
} from "react-native";
import StatusBar from "../components/StatusBar";
import ProgressBar from "../components/ProgressBar";
import {ViewPager} from "rn-viewpager";
import AnswerModal from "../components/AnswerModal";

import {data} from "../constants";
import {createDeckLesson} from "../utils";
import store from "../store";
import {updateWordReviewCalendar} from "../helpers";

export default class Learning extends Component {
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
			index = badDecks.slice().shift();
			store.setState({
				currentDeck: index,
				lessonOver: true,
				badDecks: badDecks.filter((_, i) => i !== index),
			});

			this.viewPager.setPageWithoutAnimation(index);
		} else {
			this._endLesson(true);
		}
	};

	_endLesson = (finished) => {
		const { navigation: {goBack, replace} } = this.props;

		if (finished) {
			updateWordReviewCalendar();
			alert(`Chúc mừng bạn đã hoàn thành bài học ^^`);
			replace('WordList')
		} else {
			alert('Bạn gõ sai quá nhiều, bắt đầu lại nhé!');
			goBack();
		}
	};

	render() {
		const { container } = styles;

		return (
			<KeyboardAvoidingView
				style={container}
				behavior={'padding'}
				enabled
			>
				<StatusBar translucent backgroundColor={'#068E47'}/>
				<ProgressBar
					goBack={() => alert("hello")}
				/>
				<ViewPager
					ref={viewPager => this.viewPager = viewPager}
					style={container}
					horizontalScroll={false}
					scrollEnabled={false}
				>
					{createDeckLesson(data)}
				</ViewPager>
				<AnswerModal
					moveToNextDeck={this._moveToNextDeck}
				/>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
