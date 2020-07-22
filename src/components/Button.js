import React from 'react';
import {Animated, View, TouchableOpacity, Text, ColorPropType, ViewPropTypes, UIManager} from "react-native";
import PropTypes from 'prop-types';

import { LinearGradient } from 'expo-linear-gradient';

export default function Button({
	style,
	textStyle,
	name,
	iconSize,
	color,
	IconType,
	ButtonType,
	onPress,
	onPressOut,
	buttonProps,
	animated,
	title,
	showIcon,
	// gradient
	useLinearGradient,
	colors,
	locations,
	start,
	end,
	children
}) {
	const WrapperView = animated ? Animated.View : useLinearGradient ? LinearGradient : View;

	return ButtonType === TouchableOpacity ? (
		<ButtonType
			onPress={onPress}
			onPressOut={onPressOut}
			{...buttonProps}
		>
			<WrapperView
				colors={colors}
				style={style}
				locations={locations}
				start={start}
				end={end}
			>
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
			<ButtonType
				onPress={onPress}
				onPressOut={onPressOut}
				{...buttonProps}
			>
				<WrapperView
					colors={colors}
					style={style}
					locations={locations}
					start={start}
					end={end}
				>
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
	onPressOut: () => {},
	title: '',
	showIcon: true,
	// animated
	animated: false,
	// gradient
	colors: ['#fff', '#fff'],
};
