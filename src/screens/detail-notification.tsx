import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FixedContainer from '../components/fixed-container';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import {FONT_FAMILY} from '../constants/enum';
import {heightScale, widthScale} from '../styles/scaling-utils';
import {RootStackScreenProps} from '../navigator/stacks';
import moment from 'moment';

const DetailNotification = (props: RootStackScreenProps<'DetailNotification'>) => {
	const {navigation, route} = props as any;
	const data = route.params?.data as any;

	return (
		<FixedContainer>
			<CustomHeader title="CHI TIẾT THÔNG BÁO" />
			<View style={styles.view}>
				<CustomText text={moment(data.time).format('hh:mm:ss - DD/MM/YYYY')} />
				<CustomText text={data.body} />
			</View>
		</FixedContainer>
	);
};

export default DetailNotification;
const styles = StyleSheet.create({
	view: {
		paddingHorizontal: widthScale(20),
		gap: heightScale(10),
	},
});
