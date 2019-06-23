import React, {Component} from "react";
import {
	Text,
} from "react-native";

import Screens from './src/navigations';

import {Font} from "expo";
import {monsterratItalic, monsterratMedium, monsterratMediumItalic, monsterratRegular} from "./src/constants";

export default class App extends Component {
	state = {
		fontLoaded: false,
	};

	async componentDidMount() {
		await Font.loadAsync({
			[monsterratRegular]: require('./assets/fonts/Montserrat-Regular.ttf'),
			[monsterratMedium]: require('./assets/fonts/Montserrat-Medium.ttf'),
			[monsterratMediumItalic]: require('./assets/fonts/Montserrat-MediumItalic.ttf'),
			[monsterratItalic]: require('./assets/fonts/Montserrat-Italic.ttf')
		});

		this.setState({fontLoaded: true});
	}

	render() {
		const { fontLoaded } = this.state;

		if (!fontLoaded) return <Text>Loading...</Text>;

		return <Screens/>;
	}
}
