import { createStackNavigator, createAppContainer } from 'react-navigation';
import Learning from "../screens/Learning";
import VocabSetHome from "../screens/VocabSetHome";
import MultipleChoiceReview from "../screens/MultipleChoiceReview";
import DailyReview from "../screens/DailyReview";
import WordList from "../screens/WordList";

export default createAppContainer(createStackNavigator({
	VocabSetHome,
	Learning,
	DailyReview,
	MultipleChoiceReview,
	WordList,
}))
