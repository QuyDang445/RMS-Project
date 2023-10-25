import React, {memo, useState} from 'react';
import {Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../../assets/image-paths';
import CustomButton from '../../components/custom-button';
import CustomHeader from '../../components/custom-header';
import CustomRadioButton from '../../components/custom-radio-button';
import CustomText from '../../components/custom-text';
import FixedContainer from '../../components/fixed-container';
import {FONT_FAMILY} from '../../constants/enum';
import {RootStackScreenProps} from '../../navigator/stacks';
import {colors} from '../../styles/colors';
import {heightScale, widthScale} from '../../styles/scaling-utils';

const AddPayment = (props: RootStackScreenProps<'AddPayment'>) => {
	const {navigation} = props;

	const [isShow, setIsShow] = useState('QR');

	return (
		<FixedContainer>
			<CustomHeader title="THÊM PHƯƠNG THỨC THANH TOÁN" />

			<ScrollView style={styles.view}>
				<CustomText font={FONT_FAMILY.BOLD} text={'TÊN PHƯƠNG THỨC THANH TOÁN'} size={14} />
				<View style={styles.viewInput}>
					<TextInput />
				</View>

				<View style={{marginTop: heightScale(20)}}>
					<CustomText font={FONT_FAMILY.BOLD} text={'CÁCH HIỂN THỊ'} size={14} />
				</View>

				<CustomRadioButton isChecked={isShow === 'QR'} onPress={() => setIsShow('QR')} text="Quét mã QR" />
				{isShow === 'QR' && (
					<TouchableOpacity style={styles.uploadImage}>
						{false ? (
							<Image source={{uri: ''}} style={{flex: 1, width: '100%', height: '100%', resizeMode: 'contain'}} />
						) : (
							<>
								<Image source={ICONS.upload} style={styles.upload} />
								<CustomText text={'Tải lên QR'} size={12} />
							</>
						)}
					</TouchableOpacity>
				)}

				<View style={{marginTop: heightScale(20)}} />

				<CustomRadioButton isChecked={isShow === 'INFO'} onPress={() => setIsShow('INFO')} text="Nhập thông tin" />
				{isShow === 'INFO' && (
					<View style={{marginLeft: widthScale(10), margin: widthScale(5)}}>
						<CustomText font={FONT_FAMILY.BOLD} text={'TÊN NGÂN HÀNG'} size={14} />
						<View style={styles.viewInput}>
							<TextInput />
						</View>
						<CustomText font={FONT_FAMILY.BOLD} text={'TÊN CHỦ THẺ'} size={14} />
						<View style={styles.viewInput}>
							<TextInput />
						</View>
						<CustomText font={FONT_FAMILY.BOLD} text={'SỐ TÀI KHOẢN'} size={14} />
						<View style={styles.viewInput}>
							<TextInput />
						</View>
					</View>
				)}

				<View style={{marginTop: heightScale(20)}}>
					<CustomText font={FONT_FAMILY.BOLD} text={'NỘI DUNG CHUYỂN KHOẢN'} size={14} />
					<View style={styles.viewInput}>
						<TextInput />
					</View>
				</View>
			</ScrollView>

			<View style={{padding: widthScale(20)}}>
				<CustomButton text="THÊM" />
			</View>
		</FixedContainer>
	);
};

export default memo(AddPayment);
const styles = StyleSheet.create({
	view: {
		paddingHorizontal: widthScale(20),
	},
	viewInput: {
		width: '100%',
		borderRadius: 5,
		borderWidth: 1,
	},
	upload: {
		width: widthScale(25),
		height: widthScale(25),
	},
	uploadImage: {
		width: widthScale(200),
		height: heightScale(100),
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: colors.black,
		borderWidth: 1,
		margin: widthScale(10),
	},
});
