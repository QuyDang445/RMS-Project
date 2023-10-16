import React, {memo, useEffect, useState} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../../assets/image-paths';
import {colors} from '../../styles/colors';
import {heightScale, widthScale} from '../../styles/scaling-utils';
import CustomText from '../custom-text';

interface Props {
	title: string;
	filter: string[];
	isOn: boolean;
	onPressShow?: () => void;
}
const Filter = (props: Props) => {
	const {title, filter, isOn, onPressShow} = props;

	const rotateAnim = useState(new Animated.Value(0))[0];
	const dropdownHeight = useState(new Animated.Value(0))[0];

	const interpolatedRotateAnimation = rotateAnim.interpolate({inputRange: [0, 1], outputRange: ['0deg', '180deg']});

	useEffect(() => {
		onRunAnimation(isOn);
	}, [isOn]);

	const onRunAnimation = (isOnNew: boolean) => {
		Animated.timing(dropdownHeight, {
			toValue: isOnNew ? filter.length * heightScale(40) : 0,
			duration: 200,
			useNativeDriver: false,
		}).start();

		Animated.timing(rotateAnim, {
			toValue: isOnNew ? 1 : 0,
			duration: 200,
			useNativeDriver: true,
		}).start();
	};

	return (
		<>
			<View style={styles.view}>
				<CustomText text={title} />
				<TouchableOpacity onPress={onPressShow} style={styles.button}>
					<CustomText text={title} />
					<Animated.Image
						source={ICONS.bottom}
						style={[
							styles.icon,
							{
								transform: [{rotate: interpolatedRotateAnimation}],
							},
						]}
					/>
				</TouchableOpacity>
			</View>

			<Animated.View style={[styles.viewBottom, {height: dropdownHeight, overflow: 'hidden'}]}>
				{filter.map(item => (
					<TouchableOpacity style={styles.viewItem}>
						<CustomText text={item} />
					</TouchableOpacity>
				))}
			</Animated.View>
		</>
	);
};

export default memo(Filter);
const styles = StyleSheet.create({
	view: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: heightScale(50),
		alignItems: 'center',
		backgroundColor: colors.gray,
		paddingHorizontal: widthScale(5),
		borderRadius: 5,
		marginTop: heightScale(5),
	},
	button: {
		borderRadius: 2,
		borderWidth: 1,
		height: heightScale(40),
		alignItems: 'center',
		flexDirection: 'row',
		width: widthScale(250),
		justifyContent: 'space-between',
		paddingHorizontal: widthScale(5),
	},
	icon: {
		width: widthScale(20),
		height: widthScale(20),
	},
	viewBottom: {
		marginHorizontal: widthScale(10),
		backgroundColor: colors.lightGray,
		borderBottomEndRadius: 10,
		borderBottomLeftRadius: 10,
	},
	viewItem: {
		paddingHorizontal: widthScale(10),
		height: heightScale(40),
	},
});
