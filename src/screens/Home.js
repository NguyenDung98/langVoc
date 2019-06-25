import React from 'react';
import {View, Button} from 'react-native';

export default class Home extends React.Component {
	render() {
		const { navigation: { navigate } } = this.props;

		return (
			<View style={{flex: 1, justifyContent: 'space-evenly'}}>
				<Button title={'Learning'} onPress={() => navigate('Learning')}/>
				<Button title={'Daily Review'} onPress={() => navigate('DailyReview')}/>
				<Button title={'Multiple Choice Review'} onPress={() => navigate('MultipleChoiceReview')}/>
			</View>
		);
	}
}
