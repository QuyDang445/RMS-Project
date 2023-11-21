import React, {memo, useState} from 'react';
import {Animated, DeviceEventEmitter, StyleSheet} from 'react-native';
import {EMIT_EVENT, FONT_FAMILY} from '../constants/enum';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';
import CustomText from './custom-text';

interface Props {}
const Toast = (props: Props) => {
	const [fadeAnim] = useState(new Animated.Value(0));

	const [message, setMessage] = useState('');

	DeviceEventEmitter.addListener(EMIT_EVENT.TOAST, (message: string) => {
		show(message);
	});

	const show = (message: string) => {
		setMessage(message);
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true,
		}).start();

		setTimeout(() => {
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}).start();
		}, 1500);
	};

	return (
		<Animated.View style={[styles.toast, {opacity: fadeAnim}]}>
			<CustomText color={colors.white} font={FONT_FAMILY.SEMI_BOLD} numberOfLines={10} text={message} />
		</Animated.View>
	);
};

export default memo(Toast);
const styles = StyleSheet.create({
	toast: {
		position: 'absolute',
		backgroundColor: colors.black,
		borderRadius: 10,
		zIndex: 1000,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		top: heightScale(200),
		minWidth: widthScale(100),
		minHeight: heightScale(50),
		maxWidth: widthScale(200),
		padding: widthScale(10),
	},
});
