import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FixedContainer from '../components/fixed-container';
import CustomHeader from '../components/custom-header';
import {heightScale, widthScale} from '../styles/scaling-utils';
import CustomText from '../components/custom-text';
import {FONT_FAMILY, TYPE_USER} from '../constants/enum';
import CustomButton from '../components/custom-button';
import {WIDTH} from '../constants/constants';
import {generateRandomId} from '../utils';
import {RootStackScreenProps} from '../navigator/stacks';
import {ROUTE_KEY} from '../navigator/routers';
import Star from '../components/star';
import {colors} from '../styles/colors';
import {useAppSelector} from '../stores/store/storeHooks';

const DetailService = (props: RootStackScreenProps<'DetailService'>) => {
	const {navigation, route} = props;

	const data = route.params.data;

	const userInfo = useAppSelector(state => state.userInfoReducer.userInfo);

	const onPressBooking = () => navigation.navigate(ROUTE_KEY.Booking, {service: data});

	const onPressViewInfoServicer = () => navigation.navigate(ROUTE_KEY.InfoServicer);

	const onPressViewAllReview = () => navigation.navigate(ROUTE_KEY.AllReview);

	return (
		<FixedContainer>
			<CustomHeader title="CHI TIẾT DỊCH VỤ" />
			<ScrollView style={styles.view}>
				<View style={styles.viewTop}>
					<Image source={{uri: data.image}} style={styles.image} />
					<View style={{flex: 1, justifyContent: 'center', marginLeft: widthScale(30)}}>
						<CustomText text={data.categoryObject.name} />
						<CustomText text={data.name} font={FONT_FAMILY.BOLD} />
					</View>
				</View>
				<View style={{marginVertical: heightScale(20)}}>
					<CustomText text={'Mô tả'} font={FONT_FAMILY.BOLD} />
					<CustomText text={data?.description} />
				</View>

				<View style={{flexDirection: 'row'}}>
					<TouchableOpacity>
						<Image
							style={styles.avatar}
							source={{uri: data.servicerObject?.avatar || 'https://assets.stickpng.com/images/585e4bcdcb11b227491c3396.png'}}
						/>
					</TouchableOpacity>
					<View style={{marginLeft: widthScale(10), flex: 1}}>
						<TouchableOpacity style={{alignSelf: 'baseline'}}>
							<CustomText text={data.servicerObject.name} font={FONT_FAMILY.BOLD} />
						</TouchableOpacity>
						<CustomText text={data.servicerObject?.phone} />
					</View>
				</View>

				<CustomText text={'Đánh giá'} font={FONT_FAMILY.BOLD} />
				<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
					<Star star={data.star} isShowNumber />
					<TouchableOpacity onPress={onPressViewAllReview}>
						<CustomText style={{textDecorationLine: 'underline'}} size={13} text={'Xem tất cả đánh giá'} font={FONT_FAMILY.BOLD} />
					</TouchableOpacity>
				</View>

				<View style={styles.line} />

				<View style={{padding: widthScale(10)}}>
					{[1, 1, 1, 1, 1].map(item => {
						return (
							<View style={{flexDirection: 'row', marginVertical: heightScale(5)}} key={generateRandomId()}>
								<Image style={styles.avatarComment} source={{uri: 'https://assets.stickpng.com/images/585e4bcdcb11b227491c3396.png'}} />
								<View style={{marginLeft: widthScale(10)}}>
									<CustomText text={'Nguyễn Văn A'} font={FONT_FAMILY.BOLD} />
									<Star star={4} />
									<CustomText text={'Dịch vụ tốt'} />
								</View>
							</View>
						);
					})}
				</View>
				{userInfo?.type === TYPE_USER.USER && (
					<View style={{marginVertical: heightScale(20)}}>
						<CustomText text={'Gợi ý cho bạn'} font={FONT_FAMILY.BOLD} />

						<FlatList
							showsHorizontalScrollIndicator={false}
							horizontal
							renderItem={() => (
								<TouchableOpacity
									style={{
										flexDirection: 'row',
										marginVertical: heightScale(5),
										alignItems: 'center',
										marginRight: widthScale(20),
										paddingVertical: heightScale(10),
									}}
									key={generateRandomId()}>
									<Image style={styles.avatarComment} source={{uri: 'https://assets.stickpng.com/images/585e4bcdcb11b227491c3396.png'}} />
									<View style={{marginLeft: widthScale(10)}}>
										<CustomText text={'Nguyễn Văn A'} font={FONT_FAMILY.BOLD} />
										<CustomText text={'012345656789'} />
									</View>
								</TouchableOpacity>
							)}
							data={[1, 1, 1, 1, 1, 1]}
						/>
					</View>
				)}
			</ScrollView>
			{userInfo?.type === TYPE_USER.USER && (
				<View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: heightScale(10)}}>
					<CustomButton style={{width: WIDTH / 2.5}} text="THÔNG TIN THỢ" onPress={onPressViewInfoServicer} />
					<View style={{width: widthScale(15)}} />
					<CustomButton style={{width: WIDTH / 2.5}} text="ĐẶT LỊCH" onPress={onPressBooking} />
				</View>
			)}
		</FixedContainer>
	);
};

export default DetailService;
const styles = StyleSheet.create({
	view: {
		paddingHorizontal: widthScale(20),
	},
	image: {
		width: widthScale(100),
		height: widthScale(100),
		borderRadius: 10,
	},
	viewTop: {
		flexDirection: 'row',
	},
	avatar: {
		width: widthScale(50),
		height: widthScale(50),
		borderRadius: 100,
	},
	avatarComment: {
		width: widthScale(40),
		height: widthScale(40),
		borderRadius: 100,
	},
	line: {
		height: heightScale(1),
		backgroundColor: colors.black,
		width: widthScale(200),
		marginVertical: heightScale(10),
		alignSelf: 'center',
	},
});
