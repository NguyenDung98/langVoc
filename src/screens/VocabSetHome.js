import React from 'react';
import {StyleSheet, View, Text, Animated, Easing, Platform} from 'react-native';
import {Menu} from "../components/Menu";
import LottieView from "lottie-react-native";
import {DANCING_SCRIPT_BOLD} from "../constants";
import VocabSetHomeHeader from "../components/VocabSetHomeHeader";

const ANIMATION_CONFIG = {
	toValue: 1,
	duration: 800,
	easing: Easing.linear,
	useNativeDriver: true,
};
const THEME_ICON = Math.random() > 0.5 ? require('../../assets/vocab-main-theme')
	: require('../../assets/vocab-main-theme-1');

export default class VocabSetHome extends React.Component {
	static navigationOptions = {
		header: () => <VocabSetHomeHeader />,
	};

	state = {
		canPress: true,
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
			useNativeDriver: true,
		}), {
			iterations: -1,
		}).start();
	}

	_navigateToWordList = () => {
		const {navigation: {navigate}} = this.props;
		this.setState({
			canPress: false,
		});

		Animated.timing(this.wordListAnimation, {
			...ANIMATION_CONFIG,
			duration: 300,
		}).start(({finished}) => {
			if (finished) {
				this.wordListAnimation.setValue(0.3);
				navigate('WordList');
				this.setState({
					canPress: true
				})
			}
		});
	};

	_navigateToLearning = () => {
		const { navigation: { navigate } } = this.props;
		this.setState({
			canPress: false,
		});

		Animated.timing(this.learningAnimation, ANIMATION_CONFIG).start(({finished}) => {
			if (finished) {
				this.learningAnimation.setValue(0);
				navigate('Learning');
				this.setState({
					canPress: true
				})
			}
		})
	};

	_navigateToReviewing = () => {
		const { navigation: { navigate } } = this.props;
		this.setState({
			canPress: false,
		});

		Animated.timing(this.reviewingAnimation, {
			...ANIMATION_CONFIG,
			toValue: 0,
		}).start(({finished}) => {
			if (finished) {
				this.reviewingAnimation.setValue(1);
				navigate('DailyReview');
				this.setState({
					canPress: true
				})
			}
		})
	};

	_navigateToMultipleChoice = () => {
		const { navigation: { navigate } } = this.props;
		this.setState({
			canPress: false,
		});

		Animated.timing(this.multipleChoiceAnimation, {
			...ANIMATION_CONFIG,
			toValue: 0.7,
			duration: 1000,
		}).start(({finished}) => {
			if (finished) {
				this.multipleChoiceAnimation.setValue(0.5);
				navigate('MultipleChoiceReview');
				this.setState({
					canPress: true
				})
			}
		})
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.themeContainer}>
					<LottieView
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
							left: 10,
							bottom: Platform.OS === 'ios' ? 3 : 0,
						}}
						locations={[0, 0.21, 1]}
						disabled={!this.state.canPress}
					/>
					<Menu
						progress={this.learningAnimation}
						onPress={this._navigateToLearning}
						iconSource={require('../../assets/learning')}
						title={'Bắt đầu học nào'}
						iconStyle={{
							width: 80,
							left: 10,
							bottom: Platform.OS === 'ios' ? -8 : -2,
						}}
						locations={[0, 0.51, 1]}
						disabled={!this.state.canPress}
					/>
					<Menu
						progress={this.reviewingAnimation}
						onPress={this._navigateToReviewing}
						iconSource={require('../../assets/review')}
						title={'Ôn tập hằng ngày'}
						iconStyle={{
							bottom: Platform.OS === 'ios' ? 3 : 2,
							left: Platform.OS === 'ios' ? 25 : 10,
						}}
						locations={[0, 0.71, 1]}
						disabled={!this.state.canPress}
					/>
					<Menu
						progress={this.multipleChoiceAnimation}
						onPress={this._navigateToMultipleChoice}
						iconSource={require('../../assets/multiple-choice')}
						title={'Chọn đáp án'}
						iconStyle={{
							width: 90,
							bottom: Platform.OS === 'ios' ? -18 : -8,
							left: 10,
						}}
						locations={[0, 0.91, 1]}
						disabled={!this.state.canPress}
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
