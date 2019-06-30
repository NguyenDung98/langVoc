import React from 'react';
import {ColorPropType, TouchableNativeFeedback, StyleSheet, View, ViewPropTypes} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Avatar from "./Avatar";
import ListItemInfo from "./ListItemInfo";

import Button from "./Button";
import PropTypes from 'prop-types';
import {DISABLED_COLOR} from "../constants";

export default class ListItem extends React.PureComponent {
	static propTypes = {
		uri: PropTypes.string,
		title: PropTypes.string,
		titleColor: ColorPropType,
		subTitle: PropTypes.any,
		subTitleColor: ColorPropType,
		onPress: PropTypes.func,
		showAvatar: PropTypes.bool,
		showOverlayIcon: PropTypes.bool,
		showAlternativeIcon: PropTypes.bool,
		showBadge: PropTypes.bool,
		avatarIconName: PropTypes.string,
		avatarIconType: PropTypes.any,
		avatarIconWidth: PropTypes.number,
		onButtonPress: PropTypes.func,
		showMoreButton: PropTypes.bool,
		buttonType: PropTypes.any,
		buttonIconName: PropTypes.string,
		buttonIconType: PropTypes.any,
		buttonColor: ColorPropType,
		buttonStyle: ViewPropTypes.style,
		buttonProps: PropTypes.object,
		imageStyle: ViewPropTypes.style,
		showProgress: PropTypes.bool,
		progress: PropTypes.number,
	};

	static defaultProps = {
		uri: '',
		onPress: null,
		showAvatar: true,
		showOverlayIcon: false,
		avatarIconWidth: 30,
		buttonIconName: 'md-more',
		buttonIconType: Ionicons,
		buttonColor: DISABLED_COLOR,
		showMoreButton: true,
		showProgress: false,
	};

	render() {
		const {
			uri,
			showOverlayIcon,
			showAlternativeIcon,
			showAvatar,
			showBadge,
			title,
			subTitle,
			onPress,
			titleColor,
			subTitleColor,
			avatarIconName,
			avatarIconType,
			avatarIconWidth,
			onButtonPress,
			buttonType,
			buttonIconName,
			buttonIconType,
			buttonColor,
			buttonStyle,
			buttonProps,
			showMoreButton,
			showProgress,
			progress,
			imageStyle
		} = this.props;
		let WrapperComponent = onPress ?  TouchableNativeFeedback : View;
		return (
			<WrapperComponent onPress={onPress}>
				<View style={styles.container}>
					{showAvatar && (
						<Avatar
							uri={uri}
							width={avatarIconWidth}
							showOverlayIcon={showOverlayIcon}
							IconType={avatarIconType}
							iconName={avatarIconName}
							imageStyle={imageStyle}
							showAlternativeIcon={showAlternativeIcon}
							showBadge={showBadge}
						/>
					)}
					<ListItemInfo
						title={title}
						subTitle={subTitle}
						wrapperStyle={styles.info}
						titleColor={titleColor}
						subTitleColor={subTitleColor}
						showProgress={showProgress}
						progress={progress}
					/>
					{showMoreButton && (
						<Button
							buttonProps={buttonProps}
							onPress={onButtonPress}
							ButtonType={buttonType}
							style={[styles.moreBtnStyle, buttonStyle]}
							IconType={buttonIconType}
							name={buttonIconName}
							iconSize={30}
							color={buttonColor}
						/>
					)}
				</View>
			</WrapperComponent>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 15,
		paddingTop: 10,
		paddingBottom: 10,
		alignItems: 'center',
	},
	info: {
		flexGrow: 1,
		marginLeft: 10,
		flexBasis: '70%',
		justifyContent: 'center',
	},
	moreBtnStyle: {
		width: 30,
		alignItems: 'center',
	}
});
