import React from 'react';
import {View, Button} from 'react-native';

export default class Home extends React.Component {
	render() {
		const { navigation: { navigate } } = this.props;

		return (
			<View style={{flex: 1, justifyContent: 'center'}}>
				<Button title={'Learning'} onPress={() => navigate('Learning')}/>
				<Button title={'MultipleChoiceReview'} onPress={() => navigate('MultipleChoiceReview')}/>
			</View>
		);
	}
}
