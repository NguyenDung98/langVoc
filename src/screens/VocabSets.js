import React from 'react';
import {View, Image, Text, Dimensions, StyleSheet} from 'react-native';
import {MONSTERRAT_MEDIUM} from "../constants";

const {width} = Dimensions.get('screen');

export default class VocabSets extends React.Component {
	render() {
		return (
			<View
				style={styles.container}
			>
				<View>
					<Image
						source={{uri: 'https://images2.minutemediacdn.com/image/upload/c_crop,h_1188,w_2120,x_0,y_227/f_auto,q_auto,w_1100/v1554729678/shape/mentalfloss/58331-istock-479586616.jpg'}}
						style={styles.imageStyle}
					/>
					<View style={styles.textContainer}>
						<Text style={styles.textStyle}
						>Animal, Family and People</Text>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	imageStyle: {
		width: width - 20,
		aspectRatio: 1.4,
		borderRadius: 10,
	},
	textContainer: {
		...StyleSheet.absoluteFill,
		top: '85%',
		backgroundColor: 'white',
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		opacity: 0.9,
		width: width - 20,
		justifyContent: 'center',
	},
	textStyle: {
		fontSize: 15,
		fontFamily: MONSTERRAT_MEDIUM,
		marginLeft: 5,
		textAlign: 'center',
	}
});
