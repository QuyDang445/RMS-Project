import React, {memo} from 'react';
import {DeviceEventEmitter, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../assets/image-paths';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import {EMIT_EVENT, FONT_FAMILY} from '../constants/enum';
import {ROUTE_KEY} from '../navigator/routers';
import {RootStackScreenProps} from '../navigator/stacks';
import {useAppDispatch, useAppSelector} from '../stores/store/storeHooks';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';

const User = (props: RootStackScreenProps<'User'>) => {
	const {navigation} = props;
	const dispatch = useAppDispatch();

	const userInfo = useAppSelector(state => state.userInfoReducer.userInfo);

	const onPressChangePassword = () => navigation.navigate(ROUTE_KEY.ChangePassword);
	const onPressSetting = () => navigation.navigate(ROUTE_KEY.Setting);
	const onPressTerm = () => navigation.navigate(ROUTE_KEY.Term);
	const onPressUpdateInformation = () => navigation.navigate(ROUTE_KEY.UpdateInformation);
	const onPressListAddress = () => navigation.navigate(ROUTE_KEY.ListAddress);

	const onPressLogout = () => DeviceEventEmitter.emit(EMIT_EVENT.LOGOUT);

	return (
		<FixedContainer>
			<CustomHeader title="HỒ SƠ" hideBack />

			{/* Avatar  */}
			<Image style={styles.avatar} source={userInfo?.avatar ? {uri: userInfo?.avatar} : ICONS.user} />

			<CustomText text={userInfo?.name} font={FONT_FAMILY.BOLD} style={{textAlign: 'center'}} />
			<CustomText text={userInfo?.phone} style={{textAlign: 'center'}} />
			<View style={styles.viewContent}>
				<CustomText text={'QUẢN LÝ TÀI KHOẢN:'} font={FONT_FAMILY.BOLD} size={14} />

				<TouchableOpacity onPress={onPressUpdateInformation} style={styles.button}>
					<CustomText text={'Cập nhật thông tin'} size={13} />
				</TouchableOpacity>

				<TouchableOpacity onPress={onPressListAddress} style={styles.button}>
					<CustomText text={'Địa chỉ'} size={13} />
				</TouchableOpacity>

				<TouchableOpacity onPress={onPressChangePassword} style={styles.button}>
					<CustomText text={'Đổi mật khẩu'} size={13} />
				</TouchableOpacity>
			</View>
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
				<TouchableOpacity onPress={onPressLogout} style={styles.button}>
					<CustomText text={'Đăng xuất'} size={13} />
				</TouchableOpacity>
			</View>
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
