import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Learning from "../screens/Learning";
import VocabSetHome from "../screens/VocabSetHome";
import MultipleChoiceReview from "../screens/MultipleChoiceReview";
import DailyReview from "../screens/DailyReview";
import WordList from "../screens/WordList";
import VocabSets from "../screens/VocabSets";

const Stack = createStackNavigator();

export default function Navigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator headerMode={'screen'}>
				<Stack.Screen name="VocabSets" component={VocabSets} />
				<Stack.Screen
					name="VocabSetHome"
					component={VocabSetHome}
					options={VocabSetHome.navigationOptions}
				/>
				<Stack.Screen
					name="Learning"
					component={Learning}
					options={Learning.navigationOptions}
				/>
				<Stack.Screen
					name="DailyReview"
					component={DailyReview}
					options={DailyReview.navigationOptions}
				/>
				<Stack.Screen
					name="MultipleChoiceReview"
					component={MultipleChoiceReview}
					options={MultipleChoiceReview.navigationOptions}
				/>
				<Stack.Screen
					name="WordList"
					component={WordList}
					options={WordList.navigationOptions}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
