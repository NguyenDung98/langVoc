import React, {Component} from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text
} from "react-native";
import ProgressBar from "./src/components/ProgressBar";
import {Font} from "expo";
import Card from "./src/components/Card";
import StatusBar from "./src/components/StatusBar";

export default class App extends Component {
    state = {
        fontLoaded: false,
    };

    async componentDidMount() {
        await Font.loadAsync({
            'monsterrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
            'monsterrat-medium': require('./assets/fonts/Montserrat-Medium.ttf'),
            'monsterrat-medium-italic': require('./assets/fonts/Montserrat-MediumItalic.ttf')
        });

        this.setState({fontLoaded: true})
    }

    render() {
        const {container} = styles;

        if (!this.state.fontLoaded) return <Text>Loading...</Text>;

        return (
            <SafeAreaView style={container}>
                <StatusBar backgroundColor={'#068E47'} />
                <ProgressBar
                    progress={0.4}
                    goBack={() => alert("hello")}
                />
                <Card
                    image={{uri: 'https://unsplash.it/600/600'}}
                    definition={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. eum id incidunt ipsa ipsam ipsum nihil, possimus repudiandae saepe soluta tempore voluptate.'}
                    wordType={'n'}
                />
                <View style={{flex: 3, backgroundColor: 'pink'}}>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});