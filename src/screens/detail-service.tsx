import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomButton from '../components/custom-button';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import Spinner from '../components/spinner';
import Star from '../components/star';
import {API_GET_INFO_COORDINATE, WIDTH} from '../constants/constants';
import {FONT_FAMILY, TABLE, TYPE_USER} from '../constants/enum';
import {EvaluateProps, ServicerBlockUser, UserProps} from '../constants/types';
import {ROUTE_KEY} from '../navigator/routers';
import {RootStackScreenProps} from '../navigator/stacks';
import API from '../services/api';
import {useAppSelector} from '../stores/store/storeHooks';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';
import {generateRandomId, showMessage} from '../utils';

const DetailService = (props: RootStackScreenProps<'DetailService'>) => {
	const {navigation, route} = props;

	const data = route.params.data;

	const userInfo = useAppSelector(state => state.userInfoReducer.userInfo);

	const [evaluates, setEvaluates] = useState<EvaluateProps[]>([]);

	const [servicer, setServicer] = useState<UserProps[]>([]);

	const starTotal = useMemo(() => {
		let total = 0;
		for (let i = 0; i < evaluates.length; i++) {
			total += evaluates[i].star;
		}

		return total / evaluates.length || 0;
	}, [evaluates]);

	useEffect(() => {
		(async () => {
			const evaluate = (await API.get(`${TABLE.EVALUATE}/${data.id}`, true)) as EvaluateProps[];
			for (let i = 0; i < evaluate.length; i++) {
				evaluate[i].userObject = (await API.get(`${TABLE.USERS}/${evaluate[i].user_id}`)) as UserProps;
			}
			setEvaluates(evaluate);

			const newData = [];
			const newServicer = (await API.get(`${TABLE.USERS}`, true)) as UserProps[];
			for (let i = 0; i < newServicer.length; i++) {
				newServicer[i].type === TYPE_USER.SERVICER && newData.push(newServicer[i]);
			}
			setServicer(newData);
		})();
	}, []);

	const onPressBooking = async () => {
		const servicer = (await API.get(`${TABLE.USERS}/${data.servicer}`)) as UserProps;
		if (!servicer?.receiveBooking) {
			return showMessage('Thợ này hiện không hoạt động!');
		}

		Spinner.show();
		API.get(`${TABLE.SERVICE_BLOCK_USER}`, true)
			.then((res: ServicerBlockUser[]) => {
				let check = false;
				for (let i = 0; i < res.length; i++) {
					if (res[i].phone === userInfo?.phone && data.servicer === res[i].idServicer) {
						check = true;
					}
				}

				if (check) {
					showMessage('Bạn đã bị người dùng này chặn!');
				} else {
					navigation.navigate(ROUTE_KEY.Booking, {service: data});
				}
			})
			.finally(() => Spinner.hide());
	};

	const onPressViewInfoServicer = () => {
		navigation.navigate(ROUTE_KEY.InfoServicer, {idServicer: data.servicer});
	};

	const onPressViewAllReview = () => navigation.navigate(ROUTE_KEY.AllReview, {idService: data.id});

	return (
		<FixedContainer>
			<CustomHeader title="CHI TIẾT DỊCH VỤ" />
			<ScrollView style={styles.view}>
				<View style={styles.viewTop}>
					<Image source={{uri: data?.image}} style={styles.image} />
					<View style={{flex: 1, justifyContent: 'center', marginLeft: widthScale(30)}}>
						<CustomText text={data.categoryObject?.name} />
						<CustomText text={data?.name} font={FONT_FAMILY.BOLD} />
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
					<Star star={starTotal} isShowNumber />
					{!!evaluates.length && (
						<TouchableOpacity onPress={onPressViewAllReview}>
							<CustomText style={{textDecorationLine: 'underline'}} size={13} text={'Xem tất cả đánh giá'} font={FONT_FAMILY.BOLD} />
						</TouchableOpacity>
					)}
				</View>

				<View style={styles.line} />

				<View style={{padding: widthScale(10)}}>
					{evaluates.slice(0, 5).map(item => {
						return (
							<View style={{flexDirection: 'row', marginVertical: heightScale(5)}} key={generateRandomId()}>
								<Image style={styles.avatarComment} source={{uri: item.userObject?.avatar}} />
								<View style={{marginLeft: widthScale(10)}}>
									<CustomText text={item?.userObject?.name} font={FONT_FAMILY.BOLD} />
									<Star star={item.star} />
									{!!item?.content && <CustomText text={item?.content} />}
								</View>
							</View>
						);
					})}
					{!evaluates.length && <CustomText color={colors.grayLine} style={{textAlign: 'center'}} text={'Không có đánh giá nào'} />}
				</View>
				{userInfo?.type === TYPE_USER.USER && (
					<View style={{marginVertical: heightScale(20)}}>
						<CustomText text={'Gợi ý cho bạn'} font={FONT_FAMILY.BOLD} />

						<FlatList
							showsHorizontalScrollIndicator={false}
							horizontal
							renderItem={({item, index}) => (
								<TouchableOpacity
									style={{
										flexDirection: 'row',
										marginVertical: heightScale(5),
										alignItems: 'center',
										marginRight: widthScale(20),
										paddingVertical: heightScale(10),
									}}
									key={generateRandomId()}>
									<Image style={styles.avatarComment} source={{uri: item.avatar}} />
									<View style={{marginLeft: widthScale(10)}}>
										<CustomText text={item.name} font={FONT_FAMILY.BOLD} />
										<CustomText text={item.phone} />
									</View>
								</TouchableOpacity>
							)}
							data={servicer}
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
