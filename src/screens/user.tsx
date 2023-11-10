import {useFocusEffect} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {ActivityIndicator, DeviceEventEmitter, Image, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../assets/image-paths';
import CustomHeader from '../components/custom-header';
import CustomSwich from '../components/custom-swich';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import {EMIT_EVENT, FONT_FAMILY, TABLE, TYPE_USER} from '../constants/enum';
import {PaymentServicer} from '../constants/types';
import {ROUTE_KEY} from '../navigator/routers';
import {RootStackScreenProps} from '../navigator/stacks';
import API from '../services/api';
import {useAppDispatch, useAppSelector} from '../stores/store/storeHooks';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';
import {AlertYesNo} from '../utils';

const User = (props: RootStackScreenProps<'User'>) => {
	const {navigation} = props;
	const dispatch = useAppDispatch();

	const userInfo = useAppSelector(state => state.userInfoReducer.userInfo);

	const [loadPayment, setLoadPayment] = useState(false);
	const [statusPayment, setStatusPayment] = useState('');
	const [receiveBooking, setReceiveBooking] = useState(userInfo?.receiveBooking!);

	const onPressChangePassword = () => navigation.navigate(ROUTE_KEY.ChangePassword);
	const onPressSetting = () => navigation.navigate(ROUTE_KEY.Setting);
	const onPressTerm = () => navigation.navigate(ROUTE_KEY.Term);
	const onPressUpdateInformation = () => navigation.navigate(ROUTE_KEY.UpdateInformation);
	const onPressListAddress = () => navigation.navigate(ROUTE_KEY.ListAddress);

	const onPressUserBlock = () => navigation.navigate(ROUTE_KEY.ListUserBlock);
	const onPressFeeUser = () => navigation.navigate(ROUTE_KEY.FeeService);

	const onPressLogout = () => DeviceEventEmitter.emit(EMIT_EVENT.LOGOUT);

	useFocusEffect(
		useCallback(() => {
			if (userInfo?.type === TYPE_USER.SERVICER) {
				getStatusPayment();
			}
		}, []),
	);

	const onPressChangeStatus = () => {
		const status = !receiveBooking;
		API.put(`${TABLE.USERS}/${userInfo?.id}`, {...userInfo, receiveBooking: status});
		setReceiveBooking(status);
	};

	const getStatusPayment = () => {
		setLoadPayment(true);
		API.get(`${TABLE.PAYMENT_FEE_SERVICE}/${userInfo?.id}`, true)
			.then(async (res: PaymentServicer[]) => {
				const payment = (await findClosestDateObject(res)) as PaymentServicer;
				if (payment) {
					const monthCurrent = new Date().getMonth() + 1;

					if (monthCurrent > new Date(payment.date).getMonth() + 1) {
						setStatusPayment('Chưa thanh toán');
					} else {
						if (payment.isAccept) {
							setStatusPayment('Đã thanh toán');
						} else {
							setStatusPayment('Chờ sét duyệt');
						}
					}
				} else {
					setStatusPayment('Chưa thanh toán');
				}
			})
			.catch(() => setStatusPayment('Chưa thanh toán'))
			.finally(() => setLoadPayment(false));
	};

	const findClosestDateObject = (data: PaymentServicer[]) => {
		return new Promise((resolve, reject) => {
			!data.length && reject(undefined);
			const currentDate = new Date().getTime();
			let closestItem = data?.[0];
			let closestDifference = Math.abs(currentDate - data[0]?.date);

			for (let i = 1; i < data.length; i++) {
				const difference = Math.abs(currentDate - data[i].date);
				if (difference < closestDifference) {
					closestItem = data[i];
					closestDifference = difference;
				}
			}

			resolve(closestItem as PaymentServicer | undefined);
		});
	};

	return (
		<FixedContainer>
			<CustomHeader title="HỒ SƠ" hideBack />
			<ScrollView>
				{/* Avatar  */}
				<Image style={styles.avatar} source={userInfo?.avatar ? {uri: userInfo?.avatar} : ICONS.user} />

				<CustomText text={userInfo?.name} font={FONT_FAMILY.BOLD} style={{textAlign: 'center'}} />
				<CustomText text={userInfo?.phone} style={{textAlign: 'center'}} />

				{userInfo?.type === TYPE_USER.SERVICER && (
					<View
						style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: widthScale(20), marginVertical: heightScale(10)}}>
						<CustomText text={'Trạng thái hoạt động'} />
						<CustomSwich isOn={receiveBooking!} onPress={onPressChangeStatus} />
					</View>
				)}

				<View style={styles.viewContent}>
					<CustomText text={'QUẢN LÝ TÀI KHOẢN:'} font={FONT_FAMILY.BOLD} size={14} />

					<TouchableOpacity onPress={onPressUpdateInformation} style={styles.button}>
						<CustomText text={'Cập nhật thông tin'} size={13} />
					</TouchableOpacity>

					{userInfo?.type === TYPE_USER.USER && (
						<TouchableOpacity onPress={onPressListAddress} style={styles.button}>
							<CustomText text={'Địa chỉ'} size={13} />
						</TouchableOpacity>
					)}

					<TouchableOpacity onPress={onPressChangePassword} style={styles.button}>
						<CustomText text={'Đổi mật khẩu'} size={13} />
					</TouchableOpacity>
				</View>

				{userInfo?.type === TYPE_USER.SERVICER && (
					<View style={styles.viewContent}>
						<CustomText text={'DỊCH VỤ'} font={FONT_FAMILY.BOLD} size={14} />

						<TouchableOpacity onPress={onPressFeeUser} style={styles.button}>
							<CustomText
								text={'Phí dịch vụ: '}
								rightContent={loadPayment ? <ActivityIndicator /> : <CustomText font={FONT_FAMILY.BOLD} text={statusPayment} />}
								size={13}
							/>
						</TouchableOpacity>

						<TouchableOpacity onPress={onPressUserBlock} style={styles.button}>
							<CustomText text={'Danh sách người dùng bị chặn'} size={13} />
						</TouchableOpacity>
					</View>
				)}

				<View style={styles.viewContent}>
					<CustomText text={'THÔNG TIN KHÁC'} font={FONT_FAMILY.BOLD} size={14} />

					<TouchableOpacity onPress={onPressTerm} style={styles.button}>
						<CustomText text={'Quy định điều khoản'} size={13} />
					</TouchableOpacity>

					<TouchableOpacity style={styles.button}>
						<CustomText text={'Chính sách quyền riêng tư'} size={13} />
					</TouchableOpacity>

					<TouchableOpacity style={styles.button}>
						<CustomText text={'FAQs'} size={13} />
					</TouchableOpacity>

					<TouchableOpacity onPress={onPressSetting} style={styles.button}>
						<CustomText text={'Cài đặt'} size={13} />
					</TouchableOpacity>
				</View>
				<View style={styles.viewContent}>
					<TouchableOpacity onPress={() => AlertYesNo(undefined, 'Bạn chắc chắn muốn đăng xuất?', onPressLogout)} style={styles.button}>
						<CustomText text={'Đăng xuất'} size={13} />
					</TouchableOpacity>
				</View>
			</ScrollView>
		</FixedContainer>
	);
};

export default memo(User);
const styles = StyleSheet.create({
	avatar: {
		width: widthScale(100),
		height: widthScale(100),
		borderRadius: 100,
		alignSelf: 'center',
		marginTop: heightScale(20),
		backgroundColor: `${colors.grayLine}50`,
	},
	viewContent: {
		paddingHorizontal: widthScale(20),
		marginTop: heightScale(20),
	},
	button: {
		height: heightScale(40),
		justifyContent: 'center',
		paddingLeft: widthScale(10),
	},
});
