import React, {memo} from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {FONT_FAMILY} from '../constants/enum';
import {colors} from '../styles/colors';
import {heightScale} from '../styles/scaling-utils';
import CustomText from './custom-text';

interface Props {
	text: string;
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
	colorText?: string;
	disabled?: boolean;
}
const CustomButton = (props: Props) => {
	const {text, onPress, style, colorText, disabled} = props;

	return (
		<TouchableOpacity disabled={disabled} style={[styles.view, style]} onPress={onPress}>
			<CustomText text={text} font={FONT_FAMILY.BOLD} color={colorText || colors.white} />
		</TouchableOpacity>
	);
};

export default memo(CustomButton);
const styles = StyleSheet.create({
	view: {
		backgroundColor: colors.appColor,
		width: '100%',
		height: heightScale(50),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 7,
	},
});
