import {Animated, Easing} from "react-native";

export const configureAnimations = (emotionScale, emotionRotate) => {
	const animation = [
		Animated.spring(emotionScale, {
			toValue: 1,
			bounciness: 20,
			delay: 100,
			useNativeDriver: true,
		}),
	];

	const happyAnimations = [
		...animation,
		Animated.timing(emotionRotate, {
			toValue: -1,
			duration: 100,
			easing: Easing.in(Easing.linear),
			useNativeDriver: true,
		}),
		Animated.timing(emotionRotate, {
			toValue: 1,
			duration: 200,
			easing: Easing.in(Easing.linear),
			useNativeDriver: true,
		}),
		Animated.timing(emotionRotate, {
			toValue: -1,
			duration: 200,
			easing: Easing.in(Easing.linear),
			useNativeDriver: true,
		}),
		Animated.timing(emotionRotate, {
			toValue: 1,
			duration: 200,
			easing: Easing.in(Easing.linear),
			useNativeDriver: true,
		}),
		Animated.timing(emotionRotate, {
			toValue: 0,
			duration: 100,
			easing: Easing.in(Easing.linear),
			useNativeDriver: true,
		})
	];

	return {
		sadAnimations: animation,
		happyAnimations,
	}
};
