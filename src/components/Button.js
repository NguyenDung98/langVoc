import React from 'react';
import {Animated, View, TouchableOpacity, Text, ColorPropType, ViewPropTypes} from "react-native";
import PropTypes from 'prop-types';

export default function Button({
	style,
	textStyle,
	name,
	iconSize,
	color,
	IconType,
	ButtonType,
	onPress,
	buttonProps,
	animated,
	title,
	showIcon,
	children
}) {
	const WrapperView = animated ? Animated.View : View;

	return ButtonType === TouchableOpacity ? (
		<ButtonType
			onPress={onPress}
			{...buttonProps}
		>
			<WrapperView style={style}>
				{showIcon && (
					<IconType
						name={name}
						size={iconSize}
						color={color}
					/>
				)}
				{!!title && <Text style={textStyle}>{title}</Text>}
				{children}
			</WrapperView>
		</ButtonType>
	) : (
		<View>
			<ButtonType onPress={onPress} {...buttonProps}>
				<WrapperView style={style}>
					{showIcon && (
						<IconType
							name={name}
							size={iconSize}
							color={color}
						/>
					)}
					{!!title && <Text style={textStyle}>{title}</Text>}
					{children}
				</WrapperView>
			</ButtonType>
		</View>
	)
}

Button.propTypes = {
	style: ViewPropTypes.style,
	name: PropTypes.string,
	iconSize: PropTypes.number,
	color: ColorPropType,
	IconType: PropTypes.any,
	ButtonType: PropTypes.any,
	onPress: PropTypes.func,
	animated: PropTypes.bool,
	title: PropTypes.string,
	showIcon: PropTypes.bool,
};

Button.defaultProps = {
	ButtonType: TouchableOpacity,
	onPress: () => {},
	animated: false,
	title: '',
	showIcon: true,
};
