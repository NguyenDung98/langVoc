import React from 'react';
import {StyleSheet, View} from 'react-native';
import ProgressBar from "../components/ProgressBar";
import StatusBar from "../components/StatusBar";

import {ViewPager} from "rn-viewpager";
import {createOptionsReview} from "../utils/createOptionsReview";

import {data} from '../constants/index';
import store from "../store";

export default class MultipleChoiceReview extends React.Component {
	static navigationOptions = {
		header: null,
	};

	viewPager = null;

	_moveToNextQuestion = () => {
		const { userGrade, totalPossibleGrade } = store.getState();

		if (userGrade < totalPossibleGrade) {
			this.viewPager.setPage(userGrade);
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<StatusBar translucent backgroundColor={'#068E47'}/>
				<ProgressBar
					goBack={() => alert("hello")}
				/>
				<ViewPager
					ref={viewPager => this.viewPager = viewPager}
					style={styles.container}
					horizontalScroll={false}
				>
					{createOptionsReview(data, this._moveToNextQuestion)}
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
