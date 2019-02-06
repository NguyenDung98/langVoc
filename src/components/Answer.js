import React from "react";
import {View, StyleSheet, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {disabledColor, lightGreen, monsterratMedium} from "../constants";

export default class Answer extends React.Component {
    state = {
        inputBorderColor: disabledColor,
        submitBtnDisabled: true,
        answer: ''
    };

    _onInputFocus = () => {
        this.setState({inputBorderColor: lightGreen})
    };

    _onInputBlur = () => {
        this.setState({inputBorderColor: disabledColor})
    };

    _onChangeText = answer => {
        this.setState({
            answer,
            submitBtnDisabled: !answer
        })
    };

    render() {
        const {inputBorderColor, submitBtnDisabled, answer} = this.state;
        const {placeholder} = this.props;
        const {container, inputContainer, inputStyle, answerStyle, checkBtnContainer} = styles;

        return (
            <View style={container}>
                <View style={answerStyle}>
                    <View style={[inputContainer, {borderColor: inputBorderColor}]}>
                        <TextInput
                            placeholder={placeholder}
                            style={inputStyle}
                            onFocus={this._onInputFocus}
                            onBlur={this._onInputBlur}
                            onChangeText={this._onChangeText}
                            value={answer}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => alert('hello')}
                        style={checkBtnContainer}
                        disabled={submitBtnDisabled}
                    >
                        <AntDesign
                            name="caretright"
                            size={35}
                            color={submitBtnDisabled ? disabledColor : "#ff5a58"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: 5
    },
    answerStyle: {
        flexDirection: 'row'
    },
    inputContainer: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderRadius: (width - 30) * 0.01,
    },
    inputStyle: {
        fontSize: 20,
        fontFamily: monsterratMedium
    },
    checkBtnContainer: {
        width: 50,
        height: 50,
        padding: 5,
        alignSelf: 'center'
    }
});