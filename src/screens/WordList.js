import React from 'react';
import {FlatList, StyleSheet, TextInput, View} from 'react-native';
import Constants from 'expo-constants';

import WordListItem from "../components/WordListItem";
import WordListHeader from "../components/WordListHeader";

import {DISABLED_COLOR, MONTSERRAT_MEDIUM} from "../constants";
import {Ionicons} from "@expo/vector-icons";

const keyExtractor = (_, index) => index.toString();

export default class WordList extends React.Component {
	static navigationOptions = {
		header: () => <WordListHeader />
	};

	_renderItem = ({item}) => {
		return (
			<WordListItem
				word={item}
			/>
		)
	};

	render() {
		return (
			<View style={{flex: 1}}>
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
				<FlatList
					keyExtractor={keyExtractor}
					data={this.props.route.params.data}
					renderItem={this._renderItem}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	inputContainer: {
		marginTop: Constants.statusBarHeight + 10,
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
		fontFamily: MONTSERRAT_MEDIUM,
		flex: 1,
		marginLeft: 5,
	},
});
