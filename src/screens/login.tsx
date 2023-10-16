import {CommonActions} from '@react-navigation/native';
import React, {memo, useEffect, useState} from 'react';
import {DeviceEventEmitter, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {IMAGES} from '../assets/image-paths';
import CustomButton from '../components/custom-button';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import Spinner from '../components/spinner';
import {EMIT_EVENT, FONT_FAMILY, TABLE, TYPE_USER} from '../constants/enum';
import {UserProps} from '../constants/types';
import {ROUTE_KEY} from '../navigator/routers';
import {RootStackScreenProps} from '../navigator/stacks';
import API from '../services/api';
import {cacheUserInfo} from '../stores/reducers/userReducer';
import {useAppDispatch} from '../stores/store/storeHooks';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';
import messaging from '@react-native-firebase/messaging';
import {showMessage} from '../utils';

const Login = (props: RootStackScreenProps<'Login'>) => {
	const {navigation} = props;
	const dispatch = useAppDispatch();

	const [phone, setPhone] = useState(__DEV__ ? 'Bbbb' : '');
	const [password, setPassword] = useState(__DEV__ ? 'Bb' : '');

	useEffect(() => {
		DeviceEventEmitter.addListener(EMIT_EVENT.DATA_LOGIN, ({phone: newPhone, password: newPassword}) => {
			setPhone(newPhone);
			setPassword(newPassword);
		});
	}, []);

	const onPressForgotPass = () => navigation.navigate(ROUTE_KEY.ForgotPass);

	const onPressSignUp = () => navigation.navigate(ROUTE_KEY.SignUp);

	const onPressLogin = async () => {
		if (!phone || !password) {
			return;
		}

		Spinner.show();
		const users = (await API.get(TABLE.USERS, true)) as UserProps[];
		Spinner.hide();

		for (let i = 0; i < users.length; i++) {
			if (users[i].phone === phone && users[i].password === password) {
				// update token user:
				const tokenDevice = await messaging().getToken();
				const newUser = await API.put(`${TABLE.USERS}/${users[i]?.id}`, {...users[i], tokenDevice: tokenDevice});

				// check
				if (users[i].type === TYPE_USER.SERVICER && !users[i]?.isAccept) {
					return showMessage('Tài khoản của bạn đang chờ admin sét duyệt');
				} else {
					dispatch(cacheUserInfo(newUser));
					return navigation.dispatch(CommonActions.reset({index: 0, routes: [{name: ROUTE_KEY.BottomTab}]}));
				}
			}
		}

		showMessage('Sai thông tin đăng nhập!');
	};

	return (
		<FixedContainer>
			<ScrollView>
				<Image source={IMAGES.LOGO} style={styles.logo} />
				<CustomText font={FONT_FAMILY.BOLD} text={'ĐĂNG NHẬP'} style={styles.title} />

				<View style={styles.input}>
					<TextInput
						value={phone}
						onChangeText={setPhone}
						keyboardType="numeric"
						placeholder="Số điện thoại"
						placeholderTextColor={colors.grayText}
						style={styles.inputText}
					/>
				</View>

				<View style={styles.input}>
					<TextInput
						secureTextEntry
						value={password}
						onChangeText={setPassword}
						placeholder="Mật khẩu"
						placeholderTextColor={colors.grayText}
						style={styles.inputText}
					/>
				</View>

				<TouchableOpacity style={styles.forgotPass} onPress={onPressForgotPass}>
					<CustomText text={'Quên mật khẩu?'} size={13} font={FONT_FAMILY.BOLD} />
				</TouchableOpacity>

				<TouchableOpacity style={styles.signUp} onPress={onPressSignUp}>
					<CustomText text={'Đăng ký tài khoản ngay?'} size={13} font={FONT_FAMILY.BOLD} />
				</TouchableOpacity>

				<View style={{alignSelf: 'center'}}>
					<CustomButton onPress={onPressLogin} text="ĐĂNG NHẬP" style={styles.button} />
				</View>
			</ScrollView>
		</FixedContainer>
	);
};

export default memo(Login);
const styles = StyleSheet.create({
	logo: {
		width: widthScale(100),
		height: widthScale(100),
		marginTop: heightScale(50),
		alignSelf: 'center',
	},
	title: {
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
	forgotPass: {
		alignSelf: 'flex-end',
		margin: widthScale(20),
	},
	signUp: {
		margin: widthScale(20),
	},
});
