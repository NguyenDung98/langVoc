import React from "react";
import {StyleSheet, View, ColorPropType, Platform} from "react-native";
import {Constants} from "expo";

export default function StatusBar({backgroundColor}) {
    return (
        <View style={[{backgroundColor}, styles.statusBar]}/>
    )
}

const version = parseInt(Platform.Version, 10);

const styles = StyleSheet.create({
    statusBar: {
        height: Platform.OS === "android" || version < 11
            ? Constants.statusBarHeight
            : 0
    }
});

StatusBar.propTypes = {
    backgroundColor: ColorPropType.isRequired
};
