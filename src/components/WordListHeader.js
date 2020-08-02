import React from 'react';
import {View} from "react-native";
import StatusBar from "./StatusBar";

import {DARK_GREEN} from "../constants";

export default function WordListHeader() {
	return (
		<View style={{flex: 1}}>
			<StatusBar backgroundColor={DARK_GREEN}/>
		</View>
	)
}
