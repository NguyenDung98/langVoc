import React from 'react';
import {StyleSheet, View, Text, Animated, Easing} from 'react-native';
import Button from "../components/Button";
import {DangerZone} from 'expo';
import {LIGHT_GREEN, MONSTERRAT_ITALIC} from "../constants";

const {Lottie} = DangerZone;
const ANIMATION_CONFIG = {
	toValue: 1,
	duration: 200,
	easing: Easing.linear,
};


export default class Home extends React.Component {
	state = {
		wordListAnimation: new Animated.Value(0.3),
	};

	_navigateToWordList = () => {
		const {navigation: {navigate}} = this.props;
		const {wordListAnimation} = this.state;

		Animated.timing(wordListAnimation, ANIMATION_CONFIG).start(({finished}) => {
			if (finished) {
				navigate('WordList');
				wordListAnimation.setValue(0.3);
			}
		});
	};

	render() {
		const {navigation: {navigate}} = this.props;

		return (
			<View style={{flex: 1, justifyContent: 'space-evenly'}}>
				<Button
					showIcon={false}
					onPress={this._navigateToWordList}
					style={styles.btnContainer}
				>
					<Lottie
						progress={this.state.wordListAnimation}
						loop={false}
						style={styles.iconStyle}
						source={require('../../assets/view-list.json')}
					/>
					<Text style={styles.textStyle}>
						Danh sách từ vựng
					</Text>
				</Button>
				<Button
					title={'Learning'}
					onPress={() => navigate('Learning')}
					showIcon={false}
				/>
				<Button
					title={'Daily Review'}
					onPress={() => navigate('DailyReview')}
					showIcon={false}
				/>
				<Button
					title={'Multiple Choice Review'}
					onPress={() => navigate('MultipleChoiceReview')}
					showIcon={false}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	btnContainer: {
		height: 60,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: LIGHT_GREEN,
		marginHorizontal: 30,
		borderRadius: 10,
		paddingRight: 10,
	},
	iconStyle: {
		width: 50,
		height: 50,
		marginTop: 10,
	},
	textStyle: {
		fontSize: 20,
		fontFamily: MONSTERRAT_ITALIC
	},
});
