import React from "react";
import {StyleSheet, View, ColorPropType} from "react-native";
import {Constants} from "expo";

export default function StatusBar({backgroundColor}) {
    return (
        <View style={[{backgroundColor}, styles.statusBar]}/>
    )
}

const styles = StyleSheet.create({
    statusBar: {
        height: Constants.statusBarHeight
    }
});

StatusBar.propTypes = {
    backgroundColor: ColorPropType.isRequired
};
