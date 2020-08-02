import React, {Component} from "react";
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';
import * as Progress from "react-native-progress";

import {LIGHT_GREEN} from "../constants";
import store from "../store";

class ProgressBar extends Component {
	componentDidMount() {
		this.unsubcribe = store.onChange((prevState) => {
			const { userGrade, totalPossibleGrade } = store.getState();

			if (prevState.userGrade !== userGrade || prevState.totalPossibleGrade !== totalPossibleGrade) {
				this.forceUpdate();
			}
		})
	}

	componentWillUnmount() {
		this.unsubcribe();
	}

	render() {
		const {navigation} = this.props;
		const {exitBtn, progressContainer, container} = styles;
		const {userGrade, totalPossibleGrade} = store.getState();

		return (
			<View style={container}>
				<TouchableOpacity
					style={exitBtn}
					onPress={() => navigation.goBack()}
				>
					<Feather
						name="x-circle"
						size={25}
						color="#fff"
					/>
				</TouchableOpacity>
				<View style={progressContainer}>
					<Progress.Bar
						width={null}
						height={15}
						borderRadius={10}
						progress={userGrade / totalPossibleGrade}
						color={'#ffffff'}
						unfilledColor={'#06B058'}
						borderWidth={0}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 15,
		backgroundColor: LIGHT_GREEN,
		elevation: 1, // android
		// todo: ios
	},
	progressContainer: {
		flex: 1,
	},
	exitBtn: {
		marginRight: 10
	}
});

export default function (props) {
	const navigation = useNavigation();

	return <ProgressBar {...props} navigation={navigation}/>
};
