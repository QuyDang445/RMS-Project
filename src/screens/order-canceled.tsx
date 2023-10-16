import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {colors} from '../styles/colors';

const OrderCanceled = () => {
	return (
		<View style={styles.view}>
			<Text>OrderAll</Text>
		</View>
	);
};

export default memo(OrderCanceled);
const styles = StyleSheet.create({
	view: {
		flex: 1,
		backgroundColor: colors.white,
	},
});