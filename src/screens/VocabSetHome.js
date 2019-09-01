import React from 'react';
import {StyleSheet, View, Text, Animated, Easing, Platform} from 'react-native';
import {Menu} from "../components/Menu";
import {DangerZone} from 'expo';
import {DANCING_SCRIPT_BOLD, MONSTERRAT_ITALIC, MONSTERRAT_REGULAR} from "../constants";

const {Lottie} = DangerZone;

const ANIMATION_CONFIG = {
	toValue: 1,
	duration: 800,
	easing: Easing.linear,
};
const THEME_ICON = Math.random() > 0.5 ? require('../../assets/vocab-main-theme')
	: require('../../assets/vocab-main-theme-1');

export default class VocabSetHome extends React.Component {
	// todo make a vocab set header component: avatar - title
	static navigationOptions = {
		title: 'Animal, Family and People',
		headerStyle: {
			elevation: 1,
		},
		headerTitleStyle: {
			fontFamily: MONSTERRAT_ITALIC,
			fontSize: 18,
		}
	};

	themeAnimation = new Animated.Value(0.35);
	wordListAnimation = new Animated.Value(0.4);
	learningAnimation = new Animated.Value(0);
	reviewingAnimation = new Animated.Value(1);
	multipleChoiceAnimation = new Animated.Value(0.5);

	componentDidMount() {
		Animated.loop(Animated.timing(this.themeAnimation, {
			toValue: 0.7,
			duration: 2000,
			easing: Easing.linear,
		}), {
			iterations: -1,
		}).start();
	}

	_navigateToWordList = () => {
		const {navigation: {navigate}} = this.props;

		Animated.timing(this.wordListAnimation, {
			...ANIMATION_CONFIG,
			duration: 300,
		}).start(({finished}) => {
			if (finished) {
				this.wordListAnimation.setValue(0.3);
				navigate('WordList');
			}
		});
	};

	_navigateToLearning = () => {
		const { navigation: { navigate } } = this.props;

		Animated.timing(this.learningAnimation, ANIMATION_CONFIG).start(({finished}) => {
			if (finished) {
				this.learningAnimation.setValue(0);
				navigate('Learning');
			}
		})
	};

	_navigateToReviewing = () => {
		const { navigation: { navigate } } = this.props;

		Animated.timing(this.reviewingAnimation, {
			...ANIMATION_CONFIG,
			toValue: 0,
		}).start(({finished}) => {
			if (finished) {
				this.reviewingAnimation.setValue(1);
				navigate('DailyReview');
			}
		})
	};

	_navigateToMultipleChoice = () => {
		const { navigation: { navigate } } = this.props;

		Animated.timing(this.multipleChoiceAnimation, {
			...ANIMATION_CONFIG,
			toValue: 0.7,
			duration: 1000,
		}).start(({finished}) => {
			if (finished) {
				this.multipleChoiceAnimation.setValue(0.5);
				navigate('MultipleChoiceReview');
			}
		})
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.themeContainer}>
					<Lottie
						progress={this.themeAnimation}
						source={THEME_ICON}
						style={styles.themeIcon}
					/>
					<View style={styles.themeTextContainer}>
						<Text style={styles.firstText}>
							Vocab
						</Text>
						<Text style={styles.secondText}> Learning</Text>
					</View>
				</View>
				<View>
					<Menu
						progress={this.wordListAnimation}
						onPress={this._navigateToWordList}
						iconSource={require('../../assets/view-list')}
						title={'Danh sách từ vựng'}
						iconStyle={{
							left: 30,
							bottom: Platform.OS === 'ios' ? 3 : 0,
						}}
						locations={[0, 0.21, 1]}
					/>
					<Menu
						progress={this.learningAnimation}
						onPress={this._navigateToLearning}
						iconSource={require('../../assets/learning')}
						title={'Bắt đầu học nào'}
						iconStyle={{
							width: 80,
							left: 27,
							bottom: Platform.OS === 'ios' ? -8 : -2,
						}}
						locations={[0, 0.51, 1]}
					/>
					<Menu
						progress={this.reviewingAnimation}
						onPress={this._navigateToReviewing}
						iconSource={require('../../assets/review')}
						title={'Ôn tập hằng ngày'}
						iconStyle={{
							bottom: Platform.OS === 'ios' ? 3 : 2,
							left: Platform.OS === 'ios' ? 25 : 30,
						}}
						locations={[0, 0.71, 1]}
					/>
					<Menu
						progress={this.multipleChoiceAnimation}
						onPress={this._navigateToMultipleChoice}
						iconSource={require('../../assets/multiple-choice')}
						title={'Chọn đáp án'}
						iconStyle={{
							width: 90,
							bottom: Platform.OS === 'ios' ? -18 : -12,
							left: 30,
						}}
						locations={[0, 0.91, 1]}
					/>
				</View>
			</View>
		);
	}
}

const styles= StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#fbfbfb'
	},
	themeContainer: {
		marginHorizontal: 30,
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15,
	},
	themeIcon: {
		width: 130,
		aspectRatio: 1,
		backgroundColor: 'transparent',
	},
	themeTextContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	firstText: {
		fontSize: 45,
		alignSelf: 'flex-start',
		fontFamily: DANCING_SCRIPT_BOLD
	},
	secondText: {
		fontSize: 45,
		fontFamily: DANCING_SCRIPT_BOLD,
		bottom: 10,
	},
});
