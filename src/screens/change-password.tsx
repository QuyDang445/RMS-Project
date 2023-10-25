import React, {useState} from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import CustomButton from '../components/custom-button';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import Spinner from '../components/spinner';
import {FONT_FAMILY, TABLE} from '../constants/enum';
import {RootStackScreenProps} from '../navigator/stacks';
import API from '../services/api';
import {cacheUserInfo} from '../stores/reducers/userReducer';
import {useAppDispatch, useAppSelector} from '../stores/store/storeHooks';
import {heightScale, widthScale} from '../styles/scaling-utils';
import {AlertYesNo, showMessage} from '../utils';

const ChangePassword = (props: RootStackScreenProps<'ChangePassword'>) => {
	const dispatch = useAppDispatch();

	const userInfo = useAppSelector(state => state.userInfoReducer.userInfo);

	const [currentPass, setCurrentPass] = useState('');
	const [newPass, setNewPass] = useState('');
	const [renewPass, setRenewPass] = useState('');

	const handleChangePass = () => {
		if (userInfo?.password !== currentPass) {
			showMessage('Sai mật khẩu hiện tại!');
		} else {
			if (newPass !== renewPass) {
				showMessage('Sai mật khẩu xác nhận!');
			} else {
				AlertYesNo(undefined, 'Bạn chắc chắn muốn đổi mật khẩu?', changePass);
			}
		}
	};

	const changePass = () => {
		Spinner.show();
		const newData = {...userInfo, password: newPass};
		API.put(`${TABLE.USERS}/${userInfo?.id}`, newData)
			.then(() => {
				dispatch(cacheUserInfo(newData));
				setCurrentPass('');
				setNewPass('');
				setRenewPass('');
				showMessage('Đổi mật khẩu thành công!');
			})
			.finally(() => Spinner.hide());
	};

	return (
		<FixedContainer>
			<CustomHeader title="ĐỔI MẬT KHẨU" />

			<ScrollView style={styles.view}>
				<CustomText text={'NHẬP MẬT KHẨU HIỆN TẠI'} font={FONT_FAMILY.BOLD} size={14} />
				<TextInput secureTextEntry value={currentPass} onChangeText={setCurrentPass} style={styles.input} />
				<CustomText text={'NHẬP MẬT KHẨU MỚI'} font={FONT_FAMILY.BOLD} size={14} />
				<TextInput secureTextEntry value={newPass} onChangeText={setNewPass} style={styles.input} />
				<CustomText text={'NHẬP LẠI MẬT KHẨU MỚI'} font={FONT_FAMILY.BOLD} size={14} />
				<TextInput secureTextEntry value={renewPass} onChangeText={setRenewPass} style={styles.input} />
			</ScrollView>
			<View style={{margin: widthScale(20)}}>
				<CustomButton disabled={!currentPass.trim() || !newPass.trim() || !renewPass.trim()} onPress={handleChangePass} text="THAY ĐỔI" />
			</View>
		</FixedContainer>
	);
};

export default ChangePassword;
const styles = StyleSheet.create({
	view: {
		paddingHorizontal: widthScale(20),
		marginTop: heightScale(20),
	},
	input: {
		borderRadius: 8,
		borderWidth: 1,
		paddingLeft: widthScale(10),
		marginTop: heightScale(5),
		marginBottom: heightScale(20),
	},
});
