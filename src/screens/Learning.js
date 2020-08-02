import React, {Component} from "react";
import {
	StyleSheet,
	KeyboardAvoidingView,
	Keyboard,
	Dimensions,
} from "react-native";
import StatusBar from "../components/StatusBar";
import ProgressBar from "../components/ProgressBar";
import ViewPager from "@react-native-community/viewpager";
import AnswerModal from "../components/AnswerModal";

import {createDeckLesson} from "../utils";
import store from "../store";
import {updateWordReviewCalendar} from "../helpers";

export default class Learning extends Component {
	static navigationOptions = {
		header: () => null,
	};

	viewHeight = Dimensions.get('screen').height;
	viewPager = null;

	componentDidMount() {
		this.keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			this._keyboardDidShow,
		);
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
	}

	_keyboardDidShow = () => {
		this.viewHeight = Dimensions.get('screen').height
	};

	_moveToNextDeck = () => {
		const { totalPossibleGrade, currentDeck, badDecks, lessonOver } = store.getState();
		let index = 0;

		if (totalPossibleGrade > 30) return this._endLesson(false);

		if (currentDeck < 19 && !lessonOver) { // 19 là số tổng số decks trong trường hợp lí tưởng
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
				badDecks: badDecks.filter(deck => deck !== index),
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
				keyboardVerticalOffset={-this.viewHeight}
				enabled
			>
				<StatusBar translucent backgroundColor={'#068E47'}/>
				<ProgressBar/>
				<ViewPager
					ref={viewPager => this.viewPager = viewPager}
					style={container}
					horizontalScroll={false}
					scrollEnabled={false}
				>
					{createDeckLesson(this.props.route.params.data)}
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
