import React, {Component} from "react";
import {
    StyleSheet,
    KeyboardAvoidingView,
    Text,
} from "react-native";
import ProgressBar from "./src/components/ProgressBar";
import {Font} from "expo";
import StatusBar from "./src/components/StatusBar";
import Content from "./Content";
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
            <KeyboardAvoidingView
                style={container}
                behavior={'padding'}
                enabled
            >
                <StatusBar backgroundColor={'#068E47'}/>
                <ProgressBar
                    progress={0.4}
                    goBack={() => alert("hello")}
                />
                <Content
                    guide={'Nhập từ vào ô bên dưới'}
                    image={{uri: 'https://unsplash.it/600/600'}}
                    word={'Actor'}
                    wordType={'n'}
                    spelling={'/ˈæk.tɚ/'}
                    meaning={'Diễn viên (nam)'}
                    definition={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. eum id incidunt ipsa ipsam ipsum nihil, possimus repudiandae saepe soluta tempore voluptate.'}
                />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});