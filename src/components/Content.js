import React from "react";
import {ScrollView, StyleSheet} from "react-native";
import Card from "./Card";
import Learning from "./Learning";
import PropTypes from 'prop-types';
import {CardShape, WordShape} from '../utils';
import {ViewPager} from "rn-viewpager";

export default class Content extends React.Component {
	static propTypes = {
		cardForm: CardShape.isRequired,
		hideDefinition: PropTypes.bool,
		wordForm: WordShape,
		guide: PropTypes.string,
		placeholder: PropTypes.string.isRequired,
		disableBtn: PropTypes.bool,
		rightAnswer: PropTypes.string,
	};

	render() {
		const {
			cardForm,
			wordForm,
			guide,
			hideDefinition,
			placeholder,
			disableBtn,
			rightAnswer,
		} = this.props;

		return (
			<ScrollView
				contentContainerStyle={styles.container}
				keyboardDismissMode={'none'}
				keyboardShouldPersistTaps={'handled'}
			>
				<Card
					cardForm={cardForm}
					hideDefinition={hideDefinition}
				/>
				<Learning
					guide={guide}
					wordForm={wordForm}
					placeholder={placeholder}
					disableBtn={disableBtn}
					rightAnswer={rightAnswer}
				/>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	}
});
