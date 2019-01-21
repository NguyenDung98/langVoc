import React, {Component} from "react";
import {
    StyleSheet,
    View
} from "react-native";
import ProgressBar from "./src/components/common/ProgressBar";
import {Constants} from "expo";

export default class App extends Component {
    render() {
        const {container, statusBar} = styles;

        return (
            <View style={container}>
                <View style={statusBar}/>
                <ProgressBar
                    progress={0.4}
                    goBack={() => alert("hello")}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusBar: {
        backgroundColor: '#068E47',
        height: Constants.statusBarHeight
    }
});