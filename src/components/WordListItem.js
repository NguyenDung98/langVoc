import React from 'react';
import {
	LayoutAnimation,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	UIManager,
	View,
	TouchableNativeFeedback,
} from 'react-native';
import ListItem from "./ListItem";
import { Audio } from 'expo';

import {LIGHT_GREEN, MONSTERRAT_MEDIUM_ITALIC, MONSTERRAT_REGULAR} from "../constants";

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class WordListItem extends React.Component {
	state = {
		showDefinition: false,
		playingSound: false,
		volumeBtnContainerColor: 'white',
		volumeBtnColor: LIGHT_GREEN,
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
				volumeBtnColor: LIGHT_GREEN,
				volumeBtnContainerColor: 'white',
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
				volumeBtnColor: 'white',
				volumeBtnContainerColor: LIGHT_GREEN,
			}, async () => {
				await Audio.Sound.createAsync(audio, { shouldPlay: true }, this._onPlaybackStatusUpdate);
			});
		} catch (e) {
			console.log('Audio error')
		}
	};

	render() {
		const {word: {image, word, meaning, wordType, definition}} = this.props;
		const { showDefinition, playingSound, volumeBtnColor, volumeBtnContainerColor } = this.state;

		const dynamicBtn = {
			backgroundColor: volumeBtnContainerColor,
			borderColor: LIGHT_GREEN,
		};

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
						buttonIconSize={25}
						buttonType={TouchableNativeFeedback}
						buttonColor={volumeBtnColor}
						buttonProps={{
							underlayColor: 'transparent',
							disabled: playingSound,
						}}
						buttonStyle={[styles.volumeBtnContainer, dynamicBtn]}
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
	},
	volumeBtnContainer: {
		height: 40,
		width: 40,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 40 * 0.5,
		borderWidth: 1,
		marginTop: 5,
	}
});
