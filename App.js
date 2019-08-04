import React, {Component} from "react";
import {
	Text,
} from "react-native";

import Screens from './src/navigations';

import {Font} from "expo";
import {
	MONSTERRAT_ITALIC,
	MONSTERRAT_MEDIUM,
	MONSTERRAT_MEDIUM_ITALIC,
	MONSTERRAT_REGULAR,
	PACIFICO_REGULAR,
	DANCING_SCRIPT_BOLD,
} from "./src/constants";

export default class App extends Component {
	state = {
		fontLoaded: false,
	};

	async componentDidMount() {
		await Font.loadAsync({
			[MONSTERRAT_REGULAR]: require('./assets/fonts/Montserrat-Regular.ttf'),
			[MONSTERRAT_MEDIUM]: require('./assets/fonts/Montserrat-Medium.ttf'),
			[MONSTERRAT_MEDIUM_ITALIC]: require('./assets/fonts/Montserrat-MediumItalic.ttf'),
			[MONSTERRAT_ITALIC]: require('./assets/fonts/Montserrat-Italic.ttf'),
			[PACIFICO_REGULAR]: require('./assets/fonts/Pacifico-Regular.ttf'),
			[DANCING_SCRIPT_BOLD]: require('./assets/fonts/DancingScript-Bold.ttf'),
		});

		this.setState({fontLoaded: true});
	}

	render() {
		const { fontLoaded } = this.state;

		if (!fontLoaded) return <Text>Loading...</Text>;

		return <Screens/>;
	}
}
