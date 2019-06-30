import React from 'react';
import {FlatList, View} from 'react-native';
import WordListItem from "../components/WordListItem";
import {data} from "../constants";

const keyExtractor = (_, index) => index.toString();

export default class WordList extends React.Component {
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
				<FlatList
					keyExtractor={keyExtractor}
					data={data}
					renderItem={this._renderItem}
				/>
			</View>
		);
	}
}
