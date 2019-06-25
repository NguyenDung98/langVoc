import React from "react";
import {View, StyleSheet, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {disabledColor, lightGreen, monsterratMedium, red} from "../constants";
import store from "../store";

export default class Answer extends React.Component {
    state = {
        inputBorderColor: disabledColor,
        submitBtnDisabled: true,
        answer: '',
    };

	input = null;

    _onInputFocus = () => {
        this.setState({inputBorderColor: lightGreen});
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

	_submitAnswer = () => {
	    const { rightAnswer } = this.props;
	    const { answer } = this.state;
	    const { badDecks, currentDeck, totalPossibleGrade, vocab, userGrade, decksLeft } = store.getState();

	    this.input.blur();

	    if (answer.trim().toLowerCase() !== rightAnswer.toLowerCase()) {
		    store.setState({
			    badDecks: [
				    ...badDecks,
				    currentDeck,
			    ],
                totalPossibleGrade: totalPossibleGrade + 1,
			    currentWord: rightAnswer,
			    showAnswerModal: true,
			    userAnswer: false,
		    });
        } else {
	    	const newUserGrade = (1 / vocab.length) * totalPossibleGrade;
	    	const leftOver = (totalPossibleGrade - (userGrade + newUserGrade * decksLeft)) / decksLeft;

		    store.setState({
                userGrade: userGrade + newUserGrade + leftOver,
			    decksLeft: decksLeft - 1,
		        currentWord: rightAnswer,
		        showAnswerModal: true,
		        userAnswer: true,
            })
        }

	    this.setState({
            answer: '',
		    submitBtnDisabled: true,
        });
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
                            ref={input => this.input = input}
	                        placeholder={placeholder}
                            style={inputStyle}
                            onFocus={this._onInputFocus}
                            onBlur={this._onInputBlur}
                            onChangeText={this._onChangeText}
                            value={answer}
                            autoCorrect={false}
                            autoCompleteType={'off'}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={this._submitAnswer}
                        style={checkBtnContainer}
                        disabled={submitBtnDisabled}
                    >
                        <AntDesign
                            name="caretright"
                            size={35}
                            color={submitBtnDisabled ? disabledColor : red}
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
