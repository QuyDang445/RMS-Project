import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Rating} from 'react-native-ratings';
import {colors} from '../styles/colors';
import {widthScale} from '../styles/scaling-utils';
import CustomText from './custom-text';

interface Props {
	star: number;
	isShowNumber?: boolean;
}
const Star = (props: Props) => {
	const {star, isShowNumber} = props;

	return (
		<View style={styles.view} pointerEvents={'none'}>
			<Rating style={{backgroundColor: colors.yellow}} showRating={false} ratingCount={5} imageSize={20} startingValue={star} />
			{isShowNumber && <CustomText text={`${star}/5`} style={styles.text} />}
		</View>
	);
};

export default memo(Star);
const styles = StyleSheet.create({
	view: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	text: {
		marginLeft: widthScale(5),
	},
});
