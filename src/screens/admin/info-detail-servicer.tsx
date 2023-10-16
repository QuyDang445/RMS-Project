import React, {memo, useState} from 'react';
import {FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import CustomButton from '../../components/custom-button';
import CustomHeader from '../../components/custom-header';
import CustomRadioButton from '../../components/custom-radio-button';
import CustomText from '../../components/custom-text';
import FixedContainer from '../../components/fixed-container';
import Star from '../../components/star';
import {WIDTH} from '../../constants/constants';
import {FONT_FAMILY, TYPE_BLOCK_SERVICER} from '../../constants/enum';
import {RootStackScreenProps} from '../../navigator/stacks';
import {colors} from '../../styles/colors';
import {heightScale, widthScale} from '../../styles/scaling-utils';
import {generateRandomId} from '../../utils';

const InfoDetailServicer = (props: RootStackScreenProps<'InfoDetailServicer'>) => {
	const {navigation} = props;

	const [visibleBlock, setVisibleBlock] = useState(false);

	const [reason, setReason] = useState<TYPE_BLOCK_SERVICER>();

	const handleBlock = () => {};

	return (
		<FixedContainer>
			<CustomHeader title="THÔNG TIN CHI TIẾT" />
			<ScrollView style={styles.view}>
				<Image
					style={{width: widthScale(100), height: heightScale(100), borderRadius: 100, alignSelf: 'center', marginVertical: heightScale(20)}}
					source={{uri: 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2023/4/20/img1142-16819573106021266882586.jpg'}}
				/>

				<View style={{borderRadius: 5, borderWidth: 0.5, padding: 5, marginBottom: heightScale(10)}}>
					<CustomText
						text={'TÌNH TRẠNG:   '}
						font={FONT_FAMILY.BOLD}
						size={14}
						rightContent={<CustomText font={FONT_FAMILY.BOLD} color={colors.red} text={'Quá hạn'} size={15} />}
					/>
				</View>

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

				<View style={{marginVertical: heightScale(20)}}>
					<CustomText size={14} text={'DANH SÁCH DỊCH VỤ'} font={FONT_FAMILY.BOLD} />

					<FlatList
						showsHorizontalScrollIndicator={false}
						horizontal
						renderItem={() => (
							<TouchableOpacity
								style={{
									marginVertical: heightScale(5),
									marginRight: widthScale(20),
									paddingVertical: heightScale(10),
								}}
								key={generateRandomId()}>
								<Image style={styles.avatarComment} source={{uri: 'https://assets.stickpng.com/images/585e4bcdcb11b227491c3396.png'}} />
								<CustomText text={'Sửa tủ lạnh'} font={FONT_FAMILY.BOLD} />
								<CustomText text={'Điện'} />
								<Star star={4} />
							</TouchableOpacity>
						)}
						data={[1, 1, 1, 1, 1, 1]}
					/>
				</View>

				<View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: heightScale(10)}}>
					<CustomButton style={{width: WIDTH / 2.5}} text="ĐÃ ĐÓNG PHÍ" onPress={() => {}} />
					<View style={{width: widthScale(15)}} />
					<CustomButton style={{width: WIDTH / 2.5, backgroundColor: 'red'}} text="KHOÁ TÀI KHOẢN" onPress={() => setVisibleBlock(true)} />
				</View>
			</ScrollView>

			<Modal
				animationType="fade"
				statusBarTranslucent
				transparent
				onDismiss={() => setVisibleBlock(false)}
				onRequestClose={() => setVisibleBlock(false)}
				visible={visibleBlock}>
				<Pressable onPress={() => setVisibleBlock(false)} style={styles.viewModal}>
					<Pressable style={styles.content}>
						<ScrollView>
							<CustomText font={FONT_FAMILY.BOLD} text={'Khoá tài khoản'} style={{alignSelf: 'center'}} />
							<View style={{padding: widthScale(20)}}>
								<View style={{gap: heightScale(10), marginTop: heightScale(10)}}>
									<CustomRadioButton
										onPress={() => setReason(TYPE_BLOCK_SERVICER.ReportedManyTimes)}
										isChecked={reason === TYPE_BLOCK_SERVICER.ReportedManyTimes}
										text="Bị báo cáo nhiều lần"
									/>
									<CustomRadioButton
										onPress={() => setReason(TYPE_BLOCK_SERVICER.LatePaymentOfFees)}
										isChecked={reason === TYPE_BLOCK_SERVICER.LatePaymentOfFees}
										text="Trễ thanh toán phí"
									/>
									<CustomRadioButton
										onPress={() => setReason(TYPE_BLOCK_SERVICER.Other)}
										isChecked={reason === TYPE_BLOCK_SERVICER.Other}
										text="Khác"
									/>

									{reason === TYPE_BLOCK_SERVICER.Other && (
										<View>
											<CustomText font={FONT_FAMILY.BOLD} text={'NHẬP LÝ DO'} size={14} />
											<View style={styles.viewInput}>
												<TextInput multiline />
											</View>
										</View>
									)}
								</View>
							</View>
						</ScrollView>
						<View
							style={{
								flexDirection: 'row',
								paddingHorizontal: widthScale(15),
								justifyContent: 'space-between',
								paddingBottom: heightScale(15),
							}}>
							<CustomButton onPress={() => setVisibleBlock(false)} text="HUỶ" style={{width: WIDTH / 3}} />
							<CustomButton onPress={handleBlock} text="XÁC NHẬN" style={{width: WIDTH / 3}} />
						</View>
					</Pressable>
				</Pressable>
			</Modal>
		</FixedContainer>
	);
};

export default memo(InfoDetailServicer);
const styles = StyleSheet.create({
	view: {
		paddingHorizontal: widthScale(20),
	},
	avatarComment: {
		width: widthScale(120),
		height: widthScale(80),
		borderRadius: 5,
		backgroundColor: 'red',
	},
	viewModal: {
		width: '100%',
		height: '100%',
		backgroundColor: colors.backgroundModal,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		width: widthScale(300),
		height: heightScale(400),
		backgroundColor: colors.white,
		borderRadius: 10,
		paddingTop: heightScale(10),
	},
	viewInput: {
		width: '100%',
		borderRadius: 5,
		borderWidth: 1,
		maxHeight: heightScale(200),
	},
});
