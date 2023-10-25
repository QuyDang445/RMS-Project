import React, {memo, useEffect, useState} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../../assets/image-paths';
import {FONT_FAMILY} from '../../constants/enum';
import {colors} from '../../styles/colors';
import {heightScale, widthScale} from '../../styles/scaling-utils';
import {generateRandomId} from '../../utils';
import CustomText from '../custom-text';

export interface Sort {
	title: string;
	id: string;
	function: (a: any, b: any) => number;
	name?: string;
}
interface Props {
	title: string;
	filter: Sort[];
	isOn: boolean;
	onPressShow?: () => void;
	textButton: string;
	onPressSort: (data: Sort) => void;
}
const Filter = (props: Props) => {
	const {title, filter, isOn, onPressShow, textButton, onPressSort} = props;

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
				<CustomText font={FONT_FAMILY.BOLD} text={title} />
				<TouchableOpacity onPress={onPressShow} style={styles.button}>
					<CustomText text={textButton} />
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
					<TouchableOpacity onPress={() => onPressSort(item)} key={generateRandomId()} style={styles.viewItem}>
						<CustomText text={item?.title || item?.name} />
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
		borderColor: colors.grayText,
	},
	icon: {
		width: widthScale(20),
		height: widthScale(20),
		tintColor: colors.grayText,
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
		justifyContent: 'center',
	},
});
