import PropTypes from 'prop-types';
import {Image} from "react-native";

export const WordShape = PropTypes.shape({
    word: PropTypes.string,
    meaning: PropTypes.string,
    spelling: PropTypes.string,
    audio: Image.propTypes.source
});

export const createWord = ({word='', meaning='', spelling='', audio=null}) => {
    return {
        word,
        meaning,
        spelling,
        audio
    }
};