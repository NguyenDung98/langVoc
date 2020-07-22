import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import StatusBar from "./StatusBar";
import Avatar from "./Avatar";
import {MONTSERRAT_MEDIUM} from "../constants";

export default function VocabSetHome() {
	return (
		<View style={styles.headerContainer}>
			<StatusBar backgroundColor={'#eee'}/>
			<View style={styles.headerContent}>
				<Avatar
					uri={'https://images2.minutemediacdn.com/image/upload/c_crop,h_1188,w_2120,x_0,y_227/f_auto,q_auto,w_1100/v1554729678/shape/mentalfloss/58331-istock-479586616.jpg'}
					width={50}
					imageStyle={{
						borderRadius: 25,
					}}
				/>
				<Text style={styles.textStyle}
				>Animal, Family and People</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		elevation: 1,
		marginLeft: 10
	},
	headerContent: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 60,
	},
	textStyle: {
		fontSize: 15,
		fontFamily: MONTSERRAT_MEDIUM,
		marginLeft: 5,
	}
});
