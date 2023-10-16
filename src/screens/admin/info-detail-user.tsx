import {Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {memo, useState} from 'react';
import {RootStackScreenProps} from '../../navigator/stacks';
import CustomButton from '../../components/custom-button';
import CustomHeader from '../../components/custom-header';
import CustomText from '../../components/custom-text';
import FixedContainer from '../../components/fixed-container';
import {FONT_FAMILY, TYPE_BLOCK_SERVICER} from '../../constants/enum';
import {heightScale, widthScale} from '../../styles/scaling-utils';
import {WIDTH} from '../../constants/constants';
import {colors} from '../../styles/colors';
import CustomRadioButton from '../../components/custom-radio-button';

const InfoDetailUser = (props: RootStackScreenProps<'InfoDetailUser'>) => {
	const {navigation} = props;

	const [visibleBlock, setVisibleBlock] = useState(false);
	const [reason, setReason] = useState<TYPE_BLOCK_SERVICER>();

	const handleBlock = () => {};

	return (
		<FixedContainer>
			<CustomHeader title="THÔNG TIN CHI TIẾT" />
			<ScrollView style={styles.view}>
				<Image
					style={{width: widthScale(100), height: heightScale(100), alignSelf: 'center', borderRadius: 100, marginVertical: heightScale(20)}}
					source={{uri: 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2023/4/20/img1142-16819573106021266882586.jpg'}}
				/>

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
			</ScrollView>

			<View style={{padding: widthScale(20)}}>
				<CustomButton onPress={() => setVisibleBlock(true)} style={{backgroundColor: 'red'}} text="KHOÁ TÀI KHOẢN" />
			</View>

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
										onPress={() => setReason(TYPE_BLOCK_SERVICER.ThereIsUnusualSpamBehavior)}
										isChecked={reason === TYPE_BLOCK_SERVICER.ThereIsUnusualSpamBehavior}
										text="Có hành vi spam bất thường"
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

export default memo(InfoDetailUser);
const styles = StyleSheet.create({
	view: {
		paddingHorizontal: widthScale(20),
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
