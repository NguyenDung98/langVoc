import React from "react";
import {View, StyleSheet, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {DISABLED_COLOR, LIGHT_GREEN, MONSTERRAT_MEDIUM, RED} from "../constants";
import store from "../store";

export default class Answer extends React.Component {
    state = {
        inputBorderColor: DISABLED_COLOR,
        submitBtnDisabled: true,
        answer: '',
    };

	input = null;

    _onInputFocus = () => {
        this.setState({inputBorderColor: LIGHT_GREEN});
    };

    _onInputBlur = () => {
        this.setState({inputBorderColor: DISABLED_COLOR})
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
	    const { mode, badDecks, currentDeck, totalPossibleGrade, vocab, userGrade, decksLeft } = store.getState();

	    this.input.blur();

	    if (answer.trim().toLowerCase() !== rightAnswer.toLowerCase()) {
		    store.setState({
			    vocab: mode === 'reviewing' ? vocab.map((word) => {
			    	if (word.id === rightAnswer.id) {
			    		return {
			    			...word,
						    bad: true,
					    }
				    }

			    	return word;
			    }) : vocab,
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
                            onSubmitEditing={this._submitAnswer}
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
                            color={submitBtnDisabled ? DISABLED_COLOR : RED}
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
        flex: 2,
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
        fontFamily: MONSTERRAT_MEDIUM
    },
    checkBtnContainer: {
        width: 50,
        height: 50,
        padding: 5,
        alignSelf: 'center'
    }
});
