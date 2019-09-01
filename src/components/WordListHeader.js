import React from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import StatusBar from "./StatusBar";

import {DARK_GREEN, DISABLED_COLOR, MONSTERRAT_MEDIUM} from "../constants";
import {Ionicons} from "@expo/vector-icons";

export default class WordListHeader extends React.Component {
	render() {
		return (
			<View>
				<StatusBar backgroundColor={DARK_GREEN}/>
				<View style={styles.inputContainer}>
					<Ionicons
						name={'ios-search'}
						size={25}
						color={DISABLED_COLOR}
					/>
					<TextInput
						style={styles.inputStyle}
						placeholder={'Tìm kiếm từ vựng'}
					/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	inputContainer: {
		height: 50,
		borderWidth: 1,
		borderColor: DISABLED_COLOR,
		padding: 10,
		marginHorizontal: 10,
		marginVertical: 5,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	inputStyle: {
		fontSize: 15,
		fontFamily: MONSTERRAT_MEDIUM,
		flex: 1,
		marginLeft: 5,
	},
});
