import React from 'react';
import {Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../../assets/image-paths';
import CustomHeader from '../../components/custom-header';
import CustomText from '../../components/custom-text';
import FixedContainer from '../../components/fixed-container';
import {FONT_FAMILY} from '../../constants/enum';
import {ROUTE_KEY} from '../../navigator/routers';
import {RootStackScreenProps} from '../../navigator/stacks';
import {colors} from '../../styles/colors';
import {heightScale, widthScale} from '../../styles/scaling-utils';
import {generateRandomId} from '../../utils';

const ManageServicer = (props: RootStackScreenProps<'ManageServicer'>) => {
	const {navigation} = props;

	return (
		<FixedContainer>
			<CustomHeader title="DANH SÁCH NHÀ CUNG CẤP DỊCH VỤ" />
			<ScrollView style={styles.view}>
				<View style={styles.viewInput}>
					<Image source={ICONS.search} style={styles.iconSearch} />
					<TextInput placeholder="Tìm kiếm" style={styles.input} />
				</View>

				<View style={{marginVertical: heightScale(10)}}>
					<CustomText font={FONT_FAMILY.BOLD} text={'LỌC'} />
				</View>

				{[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => (
					<TouchableOpacity
						onPress={() => navigation.navigate(ROUTE_KEY.InfoDetailServicer)}
						key={generateRandomId()}
						style={{borderRadius: 5, borderWidth: 1, marginBottom: heightScale(20), padding: widthScale(10), flexDirection: 'row'}}>
						<View
							style={{
								borderRadius: 100,
								backgroundColor: `${colors.gray}80`,
								width: widthScale(70),
								height: widthScale(70),
								justifyContent: 'center',
								alignItems: 'center',
								marginRight: widthScale(10),
							}}>
							<Image style={{width: widthScale(50), height: widthScale(50)}} source={ICONS.user_accept} />
						</View>

						<View>
							<CustomText font={FONT_FAMILY.BOLD} text={'Họ và tên'} />
							<CustomText text={'012345555'} />
							<CustomText text={'Ngày đăng ký: 15/01/2023'} />
							<CustomText text={'Tình trạng phí: '} rightContent={<CustomText font={FONT_FAMILY.BOLD} text={'Quá hạn'} />} />

							<View style={{flexDirection: 'row', gap: widthScale(20)}}>
								<TouchableOpacity>
									<CustomText color={colors.appColor} font={FONT_FAMILY.BOLD} size={13} text={'ĐÃ ĐÓNG PHÍ'} />
								</TouchableOpacity>
								<TouchableOpacity>
									<CustomText color={colors.red} font={FONT_FAMILY.BOLD} size={13} text={'KHOÁ TÀI KHOẢN'} />
								</TouchableOpacity>
							</View>
						</View>
					</TouchableOpacity>
				))}
			</ScrollView>
		</FixedContainer>
	);
};

export default ManageServicer;
const styles = StyleSheet.create({
	viewInput: {
		borderRadius: 8,
		borderColor: colors.grayLine,
		borderWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: widthScale(5),
	},
	view: {
		paddingHorizontal: widthScale(20),
	},
	iconSearch: {
		width: widthScale(20),
		height: widthScale(20),
	},
	input: {
		flex: 1,
		color: colors.black,
		fontFamily: FONT_FAMILY.REGULAR,
		fontSize: widthScale(15),
	},
});
