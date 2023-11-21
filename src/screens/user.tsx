import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {ActivityIndicator, DeviceEventEmitter, Image, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../assets/image-paths';
import CustomHeader from '../components/custom-header';
import CustomSwich from '../components/custom-swich';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import {EMIT_EVENT, FONT_FAMILY, TABLE, TYPE_USER} from '../constants/enum';
import {PaymentServicer} from '../constants/types';
import {useLanguage} from '../hooks/useLanguage';
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
	const texts = useLanguage()?.User;
	useIsFocused();

	const userInfo = useAppSelector(state => state.userInfoReducer.userInfo);

	const [loadPayment, setLoadPayment] = useState(false);
	const [statusPayment, setStatusPayment] = useState('');
	const [receiveBooking, setReceiveBooking] = useState(userInfo?.receiveBooking!);

	const onPressChangePassword = () => navigation.navigate(ROUTE_KEY.ChangePassword);
	const onPressSetting = () => navigation.navigate(ROUTE_KEY.Setting);
	const onPressTerm = () => navigation.navigate(ROUTE_KEY.Policy);
	const onPressPolicy = () => navigation.navigate(ROUTE_KEY.Term);
	const onPressUpdateInformation = () => navigation.navigate(ROUTE_KEY.UpdateInformation);
	const onPressListAddress = () => navigation.navigate(ROUTE_KEY.ListAddress);

	const onPressUserBlock = () => navigation.navigate(ROUTE_KEY.ListUserBlock);
	const onPressFeeUser = () => navigation.navigate(ROUTE_KEY.FeeService);
	const onPressFAQ = () => navigation.navigate(ROUTE_KEY.FAQ);

	const onPressLogout = () => DeviceEventEmitter.emit(EMIT_EVENT.LOGOUT);

	useFocusEffect(
		useCallback(() => {
			if (userInfo?.type === TYPE_USER.SERVICER) {
				getStatusPayment();
			}
		}, [texts]),
	);

	const onPressChangeStatus = () => {
		const status = !receiveBooking;
		API.put(`${TABLE.USERS}/${userInfo?.id}`, {...userInfo, receiveBooking: status});
		setReceiveBooking(status);
	};

	const onPressAddressServicer = async () => {
		navigation.navigate(ROUTE_KEY.AddressServicer);
	};

	const getStatusPayment = () => {
		setLoadPayment(true);
		API.get(`${TABLE.PAYMENT_FEE_SERVICE}/${userInfo?.id}`, true)
			.then(async (res: PaymentServicer[]) => {
				const payment = (await findClosestDateObject(res)) as PaymentServicer;
				if (payment) {
					const monthCurrent = new Date().getMonth() + 1;

					if (monthCurrent > new Date(payment.date).getMonth() + 1) {
						setStatusPayment(texts.unpaid);
					} else {
						if (payment.isAccept) {
							setStatusPayment(texts.paid);
						} else {
							setStatusPayment(texts.wait);
						}
					}
				} else {
					setStatusPayment(texts.unpaid);
				}
			})
			.catch(() => setStatusPayment(texts.unpaid))
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
			<ScrollView>
				<CustomHeader title={texts.title} hideBack />
				{/* Avatar  */}
				<Image style={styles.avatar} source={userInfo?.avatar ? {uri: userInfo?.avatar} : ICONS.user} />

				<CustomText text={userInfo?.name} font={FONT_FAMILY.BOLD} style={{textAlign: 'center'}} />
				<CustomText text={userInfo?.phone} style={{textAlign: 'center'}} />

				{userInfo?.type === TYPE_USER.SERVICER && (
					<View
						style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: widthScale(20), marginVertical: heightScale(10)}}>
						<CustomText text={texts.activityStatusText} />
						<CustomSwich isOn={receiveBooking!} onPress={onPressChangeStatus} />
					</View>
				)}

				<View style={styles.viewContent}>
					<CustomText text={texts.ACCOUNT_MANAGEMENT} font={FONT_FAMILY.BOLD} size={14} />

					<TouchableOpacity onPress={onPressUpdateInformation} style={styles.button}>
						<CustomText text={texts.updateInfoButtonText} size={13} />
					</TouchableOpacity>

					{userInfo?.type === TYPE_USER.USER && (
						<TouchableOpacity onPress={onPressListAddress} style={styles.button}>
							<CustomText text={texts.addressButtonText} size={13} />
						</TouchableOpacity>
					)}
					{userInfo?.type === TYPE_USER.SERVICER && (
						<TouchableOpacity onPress={onPressAddressServicer} style={styles.button}>
							<CustomText text={texts.addressButtonText} size={13} />
						</TouchableOpacity>
					)}

					<TouchableOpacity onPress={onPressChangePassword} style={styles.button}>
						<CustomText text={texts.changePasswordButtonText} size={13} />
					</TouchableOpacity>
				</View>

				{userInfo?.type === TYPE_USER.SERVICER && (
					<View style={styles.viewContent}>
						<CustomText text={texts.SERVICE} font={FONT_FAMILY.BOLD} size={14} />

						<TouchableOpacity onPress={onPressFeeUser} style={styles.button}>
							<CustomText
								text={texts.feeServiceText}
								rightContent={loadPayment ? <ActivityIndicator /> : <CustomText size={13} font={FONT_FAMILY.BOLD} text={statusPayment} />}
								size={13}
							/>
						</TouchableOpacity>

						<TouchableOpacity onPress={onPressUserBlock} style={styles.button}>
							<CustomText text={texts.blockedUsersButtonText} size={13} />
						</TouchableOpacity>
					</View>
				)}

				<View style={styles.viewContent}>
					<CustomText text={texts.otherInfoText} font={FONT_FAMILY.BOLD} size={14} />

					<TouchableOpacity onPress={onPressTerm} style={styles.button}>
						<CustomText text={texts.termsButtonText} size={13} />
					</TouchableOpacity>

					<TouchableOpacity onPress={onPressPolicy} style={styles.button}>
						<CustomText text={texts.privacyPolicyButtonText} size={13} />
					</TouchableOpacity>

					<TouchableOpacity onPress={onPressFAQ} style={styles.button}>
						<CustomText text={texts.faqsButtonText} size={13} />
					</TouchableOpacity>

					<TouchableOpacity onPress={onPressSetting} style={styles.button}>
						<CustomText text={texts.settingsButtonText} size={13} />
					</TouchableOpacity>
				</View>
				<View style={styles.viewContent}>
					<TouchableOpacity onPress={() => AlertYesNo(undefined, texts.logoutConfirmationMessage, onPressLogout)} style={styles.button}>
						<CustomText text={texts.logoutButtonText} size={13} />
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
