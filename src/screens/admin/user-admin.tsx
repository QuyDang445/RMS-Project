import {DeviceEventEmitter, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import CustomHeader from '../../components/custom-header';
import FixedContainer from '../../components/fixed-container';
import {RootStackScreenProps} from '../../navigator/stacks';
import CustomText from '../../components/custom-text';
import {EMIT_EVENT, FONT_FAMILY} from '../../constants/enum';
import {widthScale, heightScale} from '../../styles/scaling-utils';
import {ROUTE_KEY} from '../../navigator/routers';
import {AlertYesNo} from '../../utils';

const UserAdmin = (props: RootStackScreenProps<'User'>) => {
	const {navigation} = props;

	const onPressChangePassword = () => navigation.navigate(ROUTE_KEY.ChangePassword);
	const onPressPayment = () => navigation.navigate(ROUTE_KEY.Payment);

	const onPressLogout = () => DeviceEventEmitter.emit(EMIT_EVENT.LOGOUT);

	return (
		<FixedContainer>
			<CustomHeader title="ADMIN" hideBack />

			<View style={styles.viewContent}>
				<CustomText text={'QUẢN LÝ TÀI KHOẢN:'} font={FONT_FAMILY.BOLD} size={14} />

				<TouchableOpacity onPress={onPressChangePassword} style={styles.button}>
					<CustomText text={'Đổi mật khẩu'} size={13} />
				</TouchableOpacity>
			</View>

			<View style={styles.viewContent}>
				<CustomText text={'THÔNG TIN KHÁC:'} font={FONT_FAMILY.BOLD} size={14} />

				<TouchableOpacity onPress={onPressPayment} style={styles.button}>
					<CustomText text={'Cập nhật phương thức thanh toán'} size={13} />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => {}} style={styles.button}>
					<CustomText text={'Quy định và điều khoản'} size={13} />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => {}} style={styles.button}>
					<CustomText text={'Chính sách quyền riêng tư'} size={13} />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => {}} style={styles.button}>
					<CustomText text={'FAQs'} size={13} />
				</TouchableOpacity>
			</View>

			<View style={styles.viewContent}>
				<TouchableOpacity onPress={() => AlertYesNo(undefined, 'Bạn chắc chắn muốn đăng xuất?', onPressLogout)} style={styles.button}>
					<CustomText text={'Đăng xuất'} size={13} />
				</TouchableOpacity>
			</View>
		</FixedContainer>
	);
};

export default memo(UserAdmin);
const styles = StyleSheet.create({
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
