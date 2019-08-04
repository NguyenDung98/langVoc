import React  from 'react';
import {StyleSheet, Text} from "react-native";
import Button from "./Button";
import {DangerZone} from 'expo';
import {MONSTERRAT_ITALIC} from "../constants";

const {Lottie} = DangerZone;

export class Menu extends React.Component {
	render() {
		const {
			progress,
			title,
			iconSource,
			onPress,
			iconStyle,
			containerStyle,
			locations,
		} = this.props;

		return (
			<Button
				showIcon={false}
				onPress={onPress}
				style={[styles.btnContainer, containerStyle]}
				useLinearGradient
				colors={['#ff4f57','#ff7e61', '#ff4f57']}
				locations={locations}
				start={[0, 0]}
				end={[1, 1]}
				buttonProps={{
					activeOpacity: 0.9,
				}}
			>
				<Lottie
					progress={progress}
					loop={false}
					style={[styles.iconStyle, iconStyle]}
					source={iconSource}
				/>
				<Text style={styles.textStyle}>{title}</Text>
			</Button>
		)
	}
}

const styles = StyleSheet.create({
	btnContainer: {
		height: 65,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 30,
		marginBottom: 20,
		borderRadius: 15,
		paddingLeft: 50,
	},
	iconStyle: {
		position: 'absolute',
		width: 60,
		aspectRatio: 1,
	},
	textStyle: {
		fontSize: 20,
		fontFamily: MONSTERRAT_ITALIC,
		color: 'white',
	},
});
