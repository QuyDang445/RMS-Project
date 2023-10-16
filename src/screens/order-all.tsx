import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {colors} from '../styles/colors';

const OrderAll = () => {
	return (
		<View style={styles.view}>
			<Text>OrderAll</Text>
		</View>
	);
};

export default memo(OrderAll);
const styles = StyleSheet.create({
	view: {
		flex: 1,
		backgroundColor: colors.white,
	},
});
