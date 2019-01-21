import React, {Component} from "react";
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Progress from "react-native-progress";
import PropTypes from 'prop-types';

class ProgressBar extends Component {
    static propTypes = {
        progress: PropTypes.number.isRequired,
        goBack: PropTypes.func.isRequired
    };

    render() {
        const {progress, goBack} = this.props;
        const {exitBtn, progressContainer, container} = styles;

        return (
            <View style={container}>
                <TouchableOpacity
                    style={exitBtn}
                    onPress={goBack}
                >
                    <Feather
                        name="x-circle"
                        size={25}
                        color="#fff"
                    />
                </TouchableOpacity>
                <View style={progressContainer}>
                    <Progress.Bar
                        width={null}
                        height={15}
                        borderRadius={10}
                        progress={progress}
                        color={'#ffffff'}
                        unfilledColor={'#06B058'}
                        borderWidth={0}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#04d78a',
        elevation: 1,
    },
    progressContainer: {
        flex: 1,
    },
    exitBtn: {
        marginRight: 10
    }
});

export default ProgressBar;