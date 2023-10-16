import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FixedContainer from '../components/fixed-container';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import {FONT_FAMILY} from '../constants/enum';
import {heightScale, widthScale} from '../styles/scaling-utils';

const DetailNotification = () => {
	return (
		<FixedContainer>
			<CustomHeader title="CHI TIẾT THÔNG BÁO" />
			<View style={styles.view}>
				<CustomText text={'16:16:23 - 18/09/2023'} />
				<CustomText text={'Đơn dịch vụ sữa chữa ống nước đã được xác nhận và sẽ đến theo đúng ngày hẹn'} />
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
