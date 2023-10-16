import React from 'react';
import {ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import CustomButton from '../components/custom-button';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import {FONT_FAMILY} from '../constants/enum';
import {ROUTE_KEY} from '../navigator/routers';
import {RootStackScreenProps} from '../navigator/stacks';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';

const Booking = (props: RootStackScreenProps<'Booking'>) => {
	const {navigation} = props;

	const onPressGetMyAddress = () => {};
	return (
		<FixedContainer>
			<CustomHeader title="ĐẶT LỊCH" />
			<ScrollView style={styles.view}>
				{/* NAME  */}
				<View style={styles.viewInput}>
					<CustomText text={'TÊN KHÁCH HÀNG'} font={FONT_FAMILY.BOLD} />
					<TextInput style={styles.input} />
				</View>

				{/* PHONE  */}
				<View style={styles.viewInput}>
					<CustomText text={'SỐ ĐIỆN THOẠI'} font={FONT_FAMILY.BOLD} />
					<TextInput style={styles.input} />
				</View>

				{/* ADDRESS  */}
				<View style={styles.viewInput}>
					<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
						<CustomText text={'ĐỊA CHỈ'} font={FONT_FAMILY.BOLD} />
						<TouchableOpacity onPress={onPressGetMyAddress} style={{alignSelf: 'flex-end'}}>
							<CustomText font={FONT_FAMILY.BOLD} size={12} text={'Sử dụng vị trí hiện tại'} />
						</TouchableOpacity>
					</View>
					<TextInput editable={false} style={styles.input} />
				</View>

				{/* DATE  */}
				<View style={styles.viewInput}>
					<CustomText text={'NGÀY ĐẶT LỊCH'} font={FONT_FAMILY.BOLD} />
					<TouchableOpacity style={styles.input} />
				</View>

				{/* DESCRIPTION  */}
				<View style={styles.viewInput}>
					<CustomText text={'MÔ TẢ VẤN ĐỀ'} font={FONT_FAMILY.BOLD} />
					<TextInput multiline style={styles.inputDescription} />
				</View>
			</ScrollView>
			<View style={{padding: widthScale(20)}}>
				<CustomButton text="ĐẶT LỊCH" />
			</View>
		</FixedContainer>
	);
};

export default Booking;
const styles = StyleSheet.create({
	view: {
		paddingHorizontal: widthScale(20),
	},
	input: {
		height: heightScale(45),
		borderRadius: 10,
		borderWidth: 1,
		marginTop: heightScale(5),
		paddingHorizontal: widthScale(10),
		borderColor: colors.grayLine,
	},
	viewInput: {
		marginTop: heightScale(20),
	},
	inputDescription: {
		height: heightScale(100),
		borderRadius: 10,
		borderWidth: 1,
		marginTop: heightScale(5),
		paddingHorizontal: widthScale(10),
		borderColor: colors.grayLine,
	},
});
