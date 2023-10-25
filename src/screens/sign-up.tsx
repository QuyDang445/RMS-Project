import React, {memo, useState} from 'react';
import {DeviceEventEmitter, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {IMAGES} from '../assets/image-paths';
import CustomButton from '../components/custom-button';
import CustomCheckbox from '../components/custom-checkbox';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import {EMIT_EVENT, FONT_FAMILY, TABLE} from '../constants/enum';
import {ROUTE_KEY} from '../navigator/routers';
import {RootStackScreenProps} from '../navigator/stacks';
import API from '../services/api';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';
import {showMessage} from '../utils';

const SignUp = (props: RootStackScreenProps<'SignUp'>) => {
	const {navigation} = props;

	const [isCheck, setIsCheck] = useState(false);
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [pass, setPass] = useState('');
	const [rePass, setRePass] = useState('');

	const onPressSignUp = () => navigation.replace(ROUTE_KEY.SignUpServices);

	const handleSignUp = async () => {
		if (!name.trim()) {
			return showMessage('Thiếu tên');
		}
		if (!phone.trim()) {
			return showMessage('Thiếu số điện thoại');
		}
		if (!pass.trim()) {
			return showMessage('Thiếu mật khẩu');
		}
		if (pass !== rePass) {
			return showMessage('Mật khẩu nhập lại không đúng');
		}
		if (!isCheck) {
			return showMessage('Bạn chưa đồng ý điều khoản sử dụng');
		}

		const body = {
			avatar: 'https://assets.stickpng.com/images/585e4bcdcb11b227491c3396.png',
			name: name,
			password: pass,
			phone: phone,
			type: 'USER',
		};
		const res = await API.post(TABLE.USERS, body);
		if (res) {
			showMessage('Đăng ký tài khoản thành công');
			DeviceEventEmitter.emit(EMIT_EVENT.DATA_LOGIN, {phone: phone, password: pass});
			navigation.goBack();
		} else {
			showMessage('Đăng ký tài khoản thất bại');
		}
	};

	return (
		<FixedContainer>
			<CustomHeader title="ĐĂNG KÝ TÀI KHOẢN" />
			<ScrollView>
				<Image source={IMAGES.LOGO} style={styles.logo} />

				<View style={styles.input}>
					<TextInput
						value={name}
						onChangeText={setName}
						placeholder="Họ và tên"
						placeholderTextColor={colors.grayText}
						style={styles.inputText}
					/>
				</View>

				<View style={styles.input}>
					<TextInput
						keyboardType="numeric"
						maxLength={10}
						value={phone}
						onChangeText={setPhone}
						placeholder="Số điện thoại"
						placeholderTextColor={colors.grayText}
						style={styles.inputText}
					/>
				</View>

				<View style={styles.input}>
					<TextInput
						value={pass}
						onChangeText={setPass}
						placeholder="Mật khẩu"
						placeholderTextColor={colors.grayText}
						style={styles.inputText}
					/>
				</View>

				<View style={styles.input}>
					<TextInput
						value={rePass}
						onChangeText={setRePass}
						placeholder="Nhập lại mật khẩu"
						placeholderTextColor={colors.grayText}
						style={styles.inputText}
					/>
				</View>

				<CustomCheckbox
					onPress={() => setIsCheck(!isCheck)}
					isCheck={isCheck}
					style={styles.viewCheck}
					text={'Tôi đồng ý với Điều Khoản Sử Dụng'}
				/>

				<TouchableOpacity style={styles.signUp} onPress={onPressSignUp}>
					<CustomText text={'Đăng ký tài dành cho nhà cung cấp dịch vụ?'} size={13} font={FONT_FAMILY.BOLD} />
				</TouchableOpacity>

				<View style={{alignSelf: 'center', marginBottom: heightScale(20)}}>
					<CustomButton onPress={handleSignUp} text="ĐĂNG KÝ" style={styles.button} />
				</View>
			</ScrollView>
		</FixedContainer>
	);
};

export default memo(SignUp);
const styles = StyleSheet.create({
	logo: {
		width: widthScale(100),
		height: widthScale(100),
		marginTop: heightScale(10),
		alignSelf: 'center',
	},
	input: {
		marginHorizontal: widthScale(20),
		borderRadius: 10,
		borderWidth: 1,
		borderColor: colors.blackGray,
		marginTop: heightScale(40),
	},
	inputText: {
		color: colors.black,
		paddingLeft: widthScale(5),
	},
	button: {
		width: widthScale(150),
		marginTop: heightScale(100),
	},
	signUp: {
		margin: widthScale(20),
		marginTop: heightScale(40),
	},
	viewCheck: {
		marginHorizontal: widthScale(20),
		marginTop: heightScale(10),
	},
});
