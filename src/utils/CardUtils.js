import PropTypes from 'prop-types';
import {Image} from "react-native";

export const CardShape = PropTypes.shape({
    image: Image.propTypes.source.isRequired,
    wordType: PropTypes.string,
    definition: PropTypes.string,
});

export const createCard = ({image, wordType='', definition=''}) => {
    return {
        image,
        wordType,
        definition
    }
};