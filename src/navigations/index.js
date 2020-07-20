import { createStackNavigator, createAppContainer } from 'react-navigation';
import Learning from "../screens/Learning";
import VocabSetHome from "../screens/VocabSetHome";
import MultipleChoiceReview from "../screens/MultipleChoiceReview";
import DailyReview from "../screens/DailyReview";
import WordList from "../screens/WordList";
import VocabSets from "../screens/VocabSets";

export default createAppContainer(createStackNavigator({
	VocabSets,
	VocabSetHome,
	Learning,
	DailyReview,
	MultipleChoiceReview,
	WordList,
}))
