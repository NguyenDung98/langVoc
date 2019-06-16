import React, {Component} from "react";
import {
	StyleSheet,
	KeyboardAvoidingView,
	Text,
} from "react-native";
import ProgressBar from "./src/components/ProgressBar";
import StatusBar from "./src/components/StatusBar";
import {ViewPager} from 'rn-viewpager';

import {Font} from "expo";
import {monsterratItalic, monsterratMedium, monsterratMediumItalic, monsterratRegular, data} from "./src/constants";
import {createDeckLesson} from './src/utils';
import store from "./src/store";

export default class App extends Component {
	state = {
		fontLoaded: false,
	};

	viewPager = null;

	async componentDidMount() {
		await Font.loadAsync({
			[monsterratRegular]: require('./assets/fonts/Montserrat-Regular.ttf'),
			[monsterratMedium]: require('./assets/fonts/Montserrat-Medium.ttf'),
			[monsterratMediumItalic]: require('./assets/fonts/Montserrat-MediumItalic.ttf'),
			[monsterratItalic]: require('./assets/fonts/Montserrat-Italic.ttf')
		});

		this.setState({fontLoaded: true});
	}

	_moveToNextDeck = () => {
		const { currentDeck, decksLength, badDecks, lessonOver } = store.getState();
		let index = 0;

		if (currentDeck < decksLength - 1 && !lessonOver) {
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

			this.viewPager.setPage(index);
		}
	};

	render() {
		const {container} = styles;

		if (!this.state.fontLoaded) return <Text>Loading...</Text>;

		return (
			<KeyboardAvoidingView
				style={container}
				behavior={'padding'}
				enabled
			>
				<StatusBar translucent backgroundColor={'#068E47'}/>
				<ProgressBar
					progress={0.4}
					goBack={() => alert("hello")}
				/>
				<ViewPager
					ref={viewPager => this.viewPager = viewPager}
					style={container}
					horizontalScroll={false}
				>
					{createDeckLesson(data, this._moveToNextDeck)}
				</ViewPager>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
