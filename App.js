import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Text,
} from "react-native";
import ProgressBar from "./src/components/ProgressBar";
import {Font} from "expo";
import Card from "./src/components/Card";
import StatusBar from "./src/components/StatusBar";
import Learning from "./src/components/Learning";
import {monsterratItalic, monsterratMedium, monsterratMediumItalic, monsterratRegular} from "./src/constants";

export default class App extends Component {
    state = {
        fontLoaded: false,
    };

    async componentDidMount() {
        await Font.loadAsync({
            [monsterratRegular]: require('./assets/fonts/Montserrat-Regular.ttf'),
            [monsterratMedium]: require('./assets/fonts/Montserrat-Medium.ttf'),
            [monsterratMediumItalic]: require('./assets/fonts/Montserrat-MediumItalic.ttf'),
            [monsterratItalic]: require('./assets/fonts/Montserrat-Italic.ttf')
        });

        this.setState({fontLoaded: true});
    }

    render() {
        const {container} = styles;

        if (!this.state.fontLoaded) return <Text>Loading...</Text>;

        return (
            <View style={container}>
                <StatusBar backgroundColor={'#068E47'}/>
                <ProgressBar
                    progress={0.4}
                    goBack={() => alert("hello")}
                />
                <Card
                    image={{uri: 'https://unsplash.it/600/600'}}
                    definition={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. eum id incidunt ipsa ipsam ipsum nihil, possimus repudiandae saepe soluta tempore voluptate.'}
                    wordType={'n'}
                />
                <Learning
                    word={'Actor'}
                    spelling={'/ˈæk.tɚ/'}
                    meaning={'Diễn viên (nam)'}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});