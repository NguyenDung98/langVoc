import React from "react";
import {ColorPropType, ViewPropTypes, StyleSheet, Text, View} from "react-native";
// import Slider from 'react-native-slider';
import PropTypes from "prop-types";
import {MONSTERRAT_ITALIC, MONSTERRAT_REGULAR} from "../constants";

export default function ListItemInfo({
   subTitle,
   title,
   subTitleSize,
   songSize,
   titleColor,
   subTitleColor,
   wrapperStyle,
   showProgress,
   progress,
}) {
	const {invisibleThumb, progressStyle} = styles;

	return (
		<View style={wrapperStyle}>
			<Text
				style={styles.title(songSize, titleColor)}
				numberOfLines={1}
				ellipsizeMode={'tail'}
			>
				{title}
			</Text>
			{!showProgress && subTitle && (
				<Text
					style={styles.subTitle(subTitleSize, subTitleColor)}
					numberOfLines={1}
					ellipsizeMode={'tail'}
				>
					{subTitle}
				</Text>
			)}
			{showProgress && (
				<View style={progressStyle}>
					{/*<Slider*/}
						{/*style={{width: '90%'}}*/}
						{/*disabled*/}
						{/*value={progress}*/}
						{/*maximumValue={100}*/}
						{/*thumbStyle={invisibleThumb}*/}
						{/*minimumTrackTintColor={colors.mainColor}*/}
					{/*/>*/}
					<Text> {progress}%</Text>
				</View>
			)}
		</View>
	);
}

ListItemInfo.propTypes = {
	subTitle: PropTypes.any,
	title: PropTypes.string,
	subTitleSize: PropTypes.number,
	wrapperStyle: ViewPropTypes.style,
	titleColor: ColorPropType,
	subTitleColor: ColorPropType,
	showProgress: PropTypes.bool,
	progress: PropTypes.number,
};

ListItemInfo.defaultProps = {
	subTitleSize: 13,
	songSize: 17,
	wrapperStyle: {},
	titleColor: 'black',
	showProgress: false,
	progress: 0,
};

const styles = StyleSheet.create({
	title: (titleSize, titleColor) => ({
		fontFamily: MONSTERRAT_REGULAR,
		fontSize: titleSize,
		color: titleColor,
	}),
	subTitle: (subTitleSize, subTitleColor) =>  ({
		fontFamily: MONSTERRAT_ITALIC,
		fontSize: subTitleSize,
		color: subTitleColor,
	}),
	progressStyle: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	invisibleThumb: {
		width: 0,
		height: 0,
	},
});
