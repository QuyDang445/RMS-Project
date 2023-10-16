import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import FixedContainer from '../../components/fixed-container';
import CustomHeader from '../../components/custom-header';
import {RootStackScreenProps} from '../../navigator/stacks';
import CustomText from '../../components/custom-text';
import {heightScale, widthScale} from '../../styles/scaling-utils';
import {FONT_FAMILY} from '../../constants/enum';
import CustomButton from '../../components/custom-button';

const InfoAcceptServicer = (props: RootStackScreenProps<'InfoAcceptServicer'>) => {
	const {navigation} = props;

	return (
		<FixedContainer>
			<CustomHeader title="THÔNG TIN SÉT DUYỆT" />
			<ScrollView style={styles.view}>
				<View style={{borderRadius: 5, borderWidth: 0.5, padding: 5, marginBottom: heightScale(10)}}>
					<CustomText text={'HỌ VÀ TÊN:   '} font={FONT_FAMILY.BOLD} size={14} rightContent={<CustomText text={'Nguyen Van A'} size={15} />} />
				</View>

				<View style={{borderRadius: 5, borderWidth: 0.5, padding: 5, marginBottom: heightScale(10)}}>
					<CustomText
						text={'SỐ ĐIỆN THOẠI:   '}
						font={FONT_FAMILY.BOLD}
						size={14}
						rightContent={<CustomText text={'Nguyen Van A'} size={15} />}
					/>
				</View>

				<View style={{borderRadius: 5, borderWidth: 0.5, padding: 5, marginBottom: heightScale(10)}}>
					<CustomText
						text={'NGÀY ĐĂNG KÝ:   '}
						font={FONT_FAMILY.BOLD}
						size={14}
						rightContent={<CustomText text={'Nguyen Van A'} size={15} />}
					/>
				</View>

				<View style={{borderRadius: 5, borderWidth: 0.5, padding: 5, marginBottom: heightScale(10)}}>
					<CustomText text={'ẢNH CCCD:   '} font={FONT_FAMILY.BOLD} size={14} />
					<Image
						style={{width: widthScale(120), height: heightScale(80)}}
						source={{uri: 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2023/4/20/img1142-16819573106021266882586.jpg'}}
					/>
				</View>

				<View style={{borderRadius: 5, borderWidth: 0.5, padding: 5, marginBottom: heightScale(10)}}>
					<CustomText text={'CCCD:   '} font={FONT_FAMILY.BOLD} size={14} rightContent={<CustomText text={'Nguyen Van A'} size={15} />} />
				</View>

				<View style={{borderRadius: 5, borderWidth: 0.5, padding: 5, marginBottom: heightScale(10)}}>
					<CustomText text={'ĐỊA CHỈ:   '} font={FONT_FAMILY.BOLD} size={14} rightContent={<CustomText text={'Nguyen Van A'} size={15} />} />
				</View>
			</ScrollView>

			<View style={{padding: widthScale(20)}}>
				<CustomButton text="KÍCH HOẠT" />
			</View>
		</FixedContainer>
	);
};

export default memo(InfoAcceptServicer);
const styles = StyleSheet.create({
	view: {
		paddingHorizontal: widthScale(20),
	},
});
