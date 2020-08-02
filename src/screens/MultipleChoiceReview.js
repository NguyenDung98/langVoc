import React from 'react';
import {StyleSheet, View} from 'react-native';
import ProgressBar from "../components/ProgressBar";
import StatusBar from "../components/StatusBar";

import ViewPager from "@react-native-community/viewpager";
import {createMultipleChoiceReview} from "../utils/";

import store from "../store";
import {updateWordMultipleChoice} from "../helpers";

export default class MultipleChoiceReview extends React.Component {
	static navigationOptions = {
		header: () => null,
	};

	viewPager = null;

	_moveToNextQuestion = () => {
		const { userGrade, totalPossibleGrade } = store.getState();

		if (userGrade < totalPossibleGrade) {
			return this.viewPager.setPage(userGrade);
		}

		this._endReview()
	};

	_endReview = () => {
		const { navigation: {replace} } = this.props;
		const { multipleChoiceGrade, totalPossibleGrade } = store.getState();

		updateWordMultipleChoice();
		alert(`Bạn đạt được  ${multipleChoiceGrade.filter(answer => answer).length} / ${totalPossibleGrade} điểm`);
		replace('WordList')
	};

	render() {
		return (
			<View style={styles.container}>
				<StatusBar translucent backgroundColor={'#068E47'}/>
				<ProgressBar/>
				<ViewPager
					ref={viewPager => this.viewPager = viewPager}
					style={styles.container}
					horizontalScroll={false}
					scrollEnabled={false}
				>
					{createMultipleChoiceReview(6, this.props.route.params.data, this._moveToNextQuestion)}
				</ViewPager>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
