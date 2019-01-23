import React, {Component} from "react";
import {Text, TouchableWithoutFeedback, Dimensions, StyleSheet, View, Image} from 'react-native';
import PropTypes from 'prop-types';

class Card extends Component {
    state = {
        showImage: true,
    };

    static propTypes = {
        image: Image.propTypes.source.isRequired,
        wordType: PropTypes.string.isRequired,
        definition: PropTypes.string.isRequired,
    };

    _toggleCard = () => {
        this.setState(prevState => ({
            showImage: !prevState.showImage
        }))
    };

    _renderContent = () => {
        const {image, definition, wordType} = this.props;
        const {
            imageStyle,
            textContainerStyle,
            wordTypeStyle,
            definitionStyle
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
                    <Text style={definitionStyle}>
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
        backgroundColor: '#d6d6d6'
    },
    cardContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: (width - 40) * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        width: 150,
        height: 150,
        borderRadius: 150 * 0.05,
        borderWidth: 1,
        borderColor: '#04d78a'
    },
    textContainerStyle: {
        flexDirection: 'row',
        maxWidth: '90%'
    },
    wordTypeStyle: {
        color: 'grey',
        fontFamily: 'monsterrat-medium-italic',
        textAlign: 'center',
        fontSize: 16
    },
    definitionStyle: {
        fontStyle: 'normal',
        fontFamily: 'monsterrat-medium',
        color: 'black'
    }
});

export default Card;