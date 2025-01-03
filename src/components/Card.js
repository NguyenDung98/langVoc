import React, {Component} from "react";
import {Text, TouchableWithoutFeedback, Dimensions, StyleSheet, View, Image} from 'react-native';
import {LIGHT_GREEN, MONSTERRAT_MEDIUM, MONSTERRAT_MEDIUM_ITALIC} from "../constants";
import {CardShape} from "../utils/CardUtils";
import PropTypes from 'prop-types';

class Card extends Component {
    state = {
        showImage: true,
    };

    static propTypes = {
        cardForm: CardShape.isRequired,
        hideDefinition: PropTypes.bool
    };

    static defaultProps = {
        hideDefinition: false
    };

    _toggleCard = () => {
        const {hideDefinition} = this.props;

        if (hideDefinition) return;

        this.setState(prevState => ({
            showImage: !prevState.showImage
        }))
    };

    _renderContent = () => {
        const {image, definition, wordType} = this.props.cardForm;
        const {
            imageStyle,
            textContainerStyle,
            wordTypeStyle,
	        definitionText
        } = styles;

        if (this.state.showImage) {
            return (
                <Image
                    source={image}
                    style={imageStyle}
                />
            )
        }

        return (
            <View style={textContainerStyle}>
                <Text style={wordTypeStyle}>
                    ({wordType})
                    <Text style={definitionText}>
                        {` ${definition}`}
                    </Text>
                </Text>
            </View>
        )
    };

    render() {
        const {container, cardContainer} = styles;

        return (
            <View style={container}>
                <TouchableWithoutFeedback onPress={this._toggleCard}>
                    <View style={cardContainer}>
                        {this._renderContent()}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 2,
        padding: 20,
        backgroundColor: '#d6d6d6',
    },
    cardContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: (width - 40) * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 190
    },
    imageStyle: {
        width: 150,
        height: 150,
        borderRadius: 150 * 0.05,
        borderWidth: 1,
        borderColor: LIGHT_GREEN
    },
    textContainerStyle: {
        flexDirection: 'row',
        maxWidth: '90%'
    },
    wordTypeStyle: {
        color: 'grey',
        fontFamily: MONSTERRAT_MEDIUM_ITALIC,
        textAlign: 'center',
        fontSize: 16
    },
    definitionText: {
        fontStyle: 'normal',
        fontFamily: MONSTERRAT_MEDIUM,
        color: 'black'
    }
});

export default Card;
