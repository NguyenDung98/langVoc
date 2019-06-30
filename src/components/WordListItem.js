import React from 'react';
import {
	LayoutAnimation,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableWithoutFeedback,
	UIManager,
	View
} from 'react-native';
import ListItem from "./ListItem";
import {LIGHT_GREEN, MONSTERRAT_MEDIUM_ITALIC, MONSTERRAT_REGULAR} from "../constants";

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class WordListItem extends React.Component {
	state = {
		showDefinition: false,
	};

	componentWillUpdate() {
		LayoutAnimation.easeInEaseOut();
	}

	_toggleDefinition = () => {
		const { showDefinition } = this.state;

		this.setState({ showDefinition: !showDefinition });
	};

	render() {
		const {word: {image, word, meaning, wordType, definition}} = this.props;
		const { showDefinition } = this.state;

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
						buttonType={TouchableHighlight}
						buttonColor={LIGHT_GREEN}
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
