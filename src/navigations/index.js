import { createStackNavigator, createAppContainer } from 'react-navigation';
import Learning from "../screens/Learning";
import Home from "../screens/Home";
import MultipleChoiceReview from "../screens/MultipleChoiceReview";

export default createAppContainer(createStackNavigator({
	Home,
	Learning,
	MultipleChoiceReview,
}))
