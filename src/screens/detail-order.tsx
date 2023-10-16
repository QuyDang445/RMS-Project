import React, {memo, useState} from 'react';
import {FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../assets/image-paths';
import CustomButton from '../components/custom-button';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import {WIDTH} from '../constants/constants';
import {FONT_FAMILY} from '../constants/enum';
import {RootStackScreenProps} from '../navigator/stacks';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';

const DetailOrder = (props: RootStackScreenProps<'DetailOrder'>) => {
	const {navigation} = props;

	const [visibleCancel, setVisibleCancel] = useState(false);

	const [modalConfirmDone, setModalConfirmDone] = useState(false);

	const handleCancel = () => {};

	return (
		<FixedContainer>
			<CustomHeader title="CHI TIẾT ĐƠN HÀNG" />
			<ScrollView style={styles.view}>
				<View style={styles.viewTop}>
					<Image
						source={{
							uri: 'https://www.zdnet.com/a/img/resize/fadda7dddd7f97cc0f0e055ce4b2c736d16a394e/2023/06/05/79a43eb8-ce38-488c-8cc0-e04699aaca7f/bing.jpg?auto=webp&fit=crop&height=1200&width=1200',
						}}
						style={styles.image}
					/>
					<View style={{flex: 1, justifyContent: 'center', marginLeft: widthScale(30)}}>
						<CustomText text={'Loai dich vu'} />
						<CustomText text={'Ten dich vu'} font={FONT_FAMILY.BOLD} />
					</View>
				</View>

				<View style={styles.viewInfo}>
					<CustomText font={FONT_FAMILY.BOLD} text={'Trạng thái'} />
					<CustomText text={'Đang chờ'} />
				</View>

				<View style={styles.viewInfo}>
					<CustomText font={FONT_FAMILY.BOLD} text={'Trạng thái'} />
					<CustomText text={'Đang chờ'} />
				</View>

				<View style={styles.viewInfo}>
					<CustomText font={FONT_FAMILY.BOLD} text={'Trạng thái'} />
					<CustomText text={'Đang chờ'} />
				</View>

				<View style={{marginTop: heightScale(15)}}>
					<CustomText font={FONT_FAMILY.BOLD} text={'Địa chỉ'} />
					<View style={{padding: 10, borderWidth: 1, borderRadius: 5, marginTop: heightScale(5)}}>
						<CustomText text={'Nguyen Van A'} />
						<CustomText text={'Nguyen Van A'} />
						<CustomText text={'Nguyen Van A'} />
					</View>
				</View>

				<View style={{marginTop: heightScale(15)}}>
					<CustomText font={FONT_FAMILY.BOLD} text={'Mô tả'} />
					<View style={{padding: 10, marginTop: heightScale(5)}}>
						<CustomText
							text={
								'Tôi có nhu cầu thay điện, đâsdad ada d ad ad ad ad ad ádad ad à sf s gdh fh fth sf à a da fs fu cầu thay điện, đâsdad ada d ad ad ad ad ad ádad ad à sf s gdh fh fth sf à a da fs f u cầu thay điện, đâsdad ada d ad ad ad ad ad ádad ad à sf s gdh fh fth sf à a da fs f u cầu thay điện, đâsdad ada d ad ad ad ad ad ádad ad à sf s gdh fh fth sf à a da fs f u cầu thay điện, đâsdad ada d ad ad ad ad ad ádad ad à sf s gdh fh fth sf à a da fs fu cầu thay điện, đâsdad ada d ad ad ad ad ad ádad ad à sf s gdh fh fth sf à a da fs fu cầu thay điện, đâsdad ada d ad ad ad ad ad ádad ad à sf s gdh fh fth sf à a da fs fu cầu thay điện, đâsdad ada d ad ad ad ad ad ádad ad à sf s gdh fh fth sf à a da fs fsd gsd s fsf sdf sfd sf s fs fs df sf sdf sdf sf sdf sdf sdf sdf s fs df sf sf sf sdf sdf sdf sd f'
							}
						/>
					</View>
				</View>

				<ScrollView horizontal>
					{[1, 1, 1, 1, 1, 1, 1].map(() => (
						<Image
							style={styles.imageReview}
							source={{
								uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYJSVRPKEn4zQP2r6UTm8Ci7Tq4bfEvgzfnrtZMHeuN6nr1yc0Mtc8sAzqvWHncHVudn8&usqp=CAU',
							}}
						/>
					))}
				</ScrollView>
				<View style={{flexDirection: 'row', padding: 20, justifyContent: 'space-between'}}>
					<CustomButton onPress={() => setVisibleCancel(true)} text="HUỶ" style={{width: WIDTH / 2.8}} />
					<CustomButton text="XÁC NHẬN" style={{width: WIDTH / 2.8}} />
				</View>
			</ScrollView>

			<Modal
				statusBarTranslucent
				transparent
				onDismiss={() => setVisibleCancel(false)}
				onRequestClose={() => setVisibleCancel(false)}
				visible={visibleCancel}>
				<Pressable onPress={() => setVisibleCancel(false)} style={styles.viewModal}>
					<Pressable style={styles.content}>
						<ScrollView>
							<CustomText font={FONT_FAMILY.BOLD} text={'Huỷ đơn hàng'} style={{alignSelf: 'center'}} />
							<View style={{padding: widthScale(20)}}>
								<CustomText font={FONT_FAMILY.BOLD} text={'NHẬP LÝ DO'} size={14} />
								<View style={styles.viewInput}>
									<TextInput multiline />
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
							<CustomButton onPress={() => setVisibleCancel(false)} text="HUỶ" style={{width: WIDTH / 3}} />
							<CustomButton onPress={handleCancel} text="XÁC NHẬN" style={{width: WIDTH / 3}} />
						</View>
					</Pressable>
				</Pressable>
			</Modal>

			<Modal
				animationType="fade"
				statusBarTranslucent
				transparent
				onDismiss={() => setModalConfirmDone(false)}
				onRequestClose={() => setModalConfirmDone(false)}
				visible={modalConfirmDone}>
				<Pressable onPress={() => setModalConfirmDone(false)} style={styles.viewModal}>
					<Pressable style={styles.content}>
						<ScrollView>
							<CustomText font={FONT_FAMILY.BOLD} text={'Cung cấp kết quả'} style={{alignSelf: 'center'}} />
							<View style={{padding: widthScale(20)}}>
								<CustomText text={'Vui lòng tải lên hình ảnh kết quả để đối chiếu khi có vấn đề phát sinh'} size={14} />

								<FlatList
									scrollEnabled={false}
									renderItem={({item, index}) => {
										if (index === 0) {
											return (
												<TouchableOpacity
													style={{
														width: widthScale(80),
														height: widthScale(80),
														borderRadius: 5,
														justifyContent: 'center',
														alignItems: 'center',
														borderWidth: 1,
													}}>
													<Image style={{width: widthScale(25), height: widthScale(25)}} source={ICONS.camera} />
												</TouchableOpacity>
											);
										} else {
											return <View style={{width: widthScale(80), height: widthScale(80), backgroundColor: 'red', borderRadius: 5}} />;
										}
									}}
									numColumns={3}
									columnWrapperStyle={{justifyContent: 'space-between', marginBottom: heightScale(10)}}
									data={[1, 1, 1, 1, 1, 1, 1, 1, 1]}
								/>
							</View>
						</ScrollView>
						<View
							style={{
								flexDirection: 'row',
								paddingHorizontal: widthScale(15),
								justifyContent: 'space-between',
								paddingBottom: heightScale(15),
							}}>
							<CustomButton onPress={() => setModalConfirmDone(false)} text="HUỶ" style={{width: WIDTH / 3}} />
							<CustomButton onPress={handleCancel} text="XÁC NHẬN" style={{width: WIDTH / 3}} />
						</View>
					</Pressable>
				</Pressable>
			</Modal>
		</FixedContainer>
	);
};

export default memo(DetailOrder);
const styles = StyleSheet.create({
	image: {
		width: widthScale(140),
		height: widthScale(100),
		borderRadius: 10,
	},
	viewTop: {
		flexDirection: 'row',
	},
	view: {
		paddingHorizontal: widthScale(20),
	},
	viewInfo: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: heightScale(15),
	},
	imageReview: {
		width: widthScale(140),
		height: widthScale(100),
		marginRight: widthScale(10),
		borderRadius: 5,
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
