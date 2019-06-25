import { createStackNavigator, createAppContainer } from 'react-navigation';
import Learning from "../screens/Learning";
import Home from "../screens/Home";
import MultipleChoiceReview from "../screens/MultipleChoiceReview";
import DailyReview from "../screens/DailyReview";

export default createAppContainer(createStackNavigator({
	Home,
	Learning,
	DailyReview,
	MultipleChoiceReview,
}))
