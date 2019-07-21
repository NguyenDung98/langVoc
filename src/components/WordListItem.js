import React from 'react';
import {
	LayoutAnimation,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	UIManager,
	View,
	TouchableOpacity
} from 'react-native';
import ListItem from "./ListItem";
import { Audio } from 'expo';

import {LIGHT_GREEN, MONSTERRAT_MEDIUM_ITALIC, MONSTERRAT_REGULAR} from "../constants";

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class WordListItem extends React.Component {
	state = {
		showDefinition: false,
		playingSound: false,
	};

	_toggleDefinition = () => {
		const { showDefinition } = this.state;

		LayoutAnimation.easeInEaseOut();
		this.setState({ showDefinition: !showDefinition });
	};

	_onPlaybackStatusUpdate = ({ didJustFinish }) => {
		if (didJustFinish) {
			this.setState({
				playingSound: false,
			})
		}
	};

	_playSound = () => {
		const { audio } = this.props.word;
		const { playingSound } = this.state;

		if (!audio || playingSound) return;

		try {
			this.setState({
				playingSound: true,
			}, async () => {
				await Audio.Sound.createAsync(audio, { shouldPlay: true }, this._onPlaybackStatusUpdate);
			});
		} catch (e) {
			console.log('Audio error')
		}
	};

	render() {
		const {word: {image, word, meaning, wordType, definition}} = this.props;
		const { showDefinition, playingSound } = this.state;

		return (
			<TouchableWithoutFeedback onPress={this._toggleDefinition}>
				<View style={styles.container}>
					<ListItem
						avatarIconWidth={60}
						imageStyle={{borderRadius: 30}}
						uri={image.uri}
						title={word}
						titleColor={LIGHT_GREEN}
						subTitle={meaning}
						subTitleColor={'grey'}
						buttonIconName={'md-volume-high'}
						buttonType={TouchableOpacity}
						buttonColor={LIGHT_GREEN}
						buttonProps={{
							disabled: playingSound,
						}}
						onButtonPress={this._playSound}
					/>
					{showDefinition && (
						<View style={styles.definitionContainer}>
							<Text style={styles.definitionText}>
								<Text style={styles.wordType}>({wordType})</Text> {definition}
							</Text>
						</View>
					)}
				</View>
			</TouchableWithoutFeedback>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		borderBottomColor: 'grey',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	definitionContainer: {
		paddingHorizontal: 20,
		marginBottom: 10,
	},
	definitionText: {
		fontFamily: MONSTERRAT_REGULAR,
		fontSize: 14,
	},
	wordType: {
		fontFamily: MONSTERRAT_MEDIUM_ITALIC,
		color: 'grey',
	}
});
