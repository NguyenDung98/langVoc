import React from 'react';
import { Animated, View, TouchableOpacity, ColorPropType, ViewPropTypes } from "react-native";
import PropTypes from 'prop-types';

export default function IconButton({
	style,
	name,
	iconSize,
	color,
	IconType,
	ButtonType,
	onPress,
	buttonProps,
	animated,
}) {
	const WrapperView = animated ? Animated.View : View;

	return ButtonType === TouchableOpacity ? (
		<ButtonType
			onPress={onPress}
			{...buttonProps}
		>
			<WrapperView style={style}>
				<IconType
					name={name}
					size={iconSize}
					color={color}
				/>
			</WrapperView>
		</ButtonType>
	) : (
		<View>
			<ButtonType onPress={onPress} {...buttonProps}>
				<WrapperView style={style}>
					<IconType
						name={name}
						size={iconSize}
						color={color}
					/>
				</WrapperView>
			</ButtonType>
		</View>
	)
}

IconButton.propTypes = {
	style: ViewPropTypes.style,
	name: PropTypes.string,
	iconSize: PropTypes.number,
	color: ColorPropType,
	IconType: PropTypes.any,
	ButtonType: PropTypes.any,
	onPress: PropTypes.func,
};

IconButton.defaultProps = {
	ButtonType: TouchableOpacity,
	onPress: () => { },
};
