import React, {memo, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import CustomButton from '../components/custom-button';
import CustomHeader from '../components/custom-header';
import FixedContainer from '../components/fixed-container';
import InputOtp from '../components/sign-up/input-otp';
import Spinner from '../components/spinner';
import {ROUTE_KEY} from '../navigator/routers';
import {RootStackScreenProps} from '../navigator/stacks';
import {widthScale} from '../styles/scaling-utils';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const Otp = (props: RootStackScreenProps<'Otp'>) => {
	const {navigation, route} = props;

	const confirm = route.params.confirm;
	const userPhone = route.params.userPhone;

	const [code, setCode] = useState('');

	const handleOtp = async () => {
		try {
			Spinner.show();
			if (code === confirm.code) {
				const credential = auth.PhoneAuthProvider.credential(confirm.verificationId, code);
				const userData = await auth().signInWithCredential(credential);
				const token = userData ? (await userData?.user?.getIdTokenResult()).token : '';

				if (token) {
					navigation.replace(ROUTE_KEY.ChangePasswordForgot, {userPhone});
				} else {
					throw new Error('__');
				}
				Spinner.hide();
			} else {
				throw new Error('__');
			}
		} catch (error) {
			Alert.alert('Sai mã xác thực');
			console.error(error);
			Spinner.hide();
		}
	};

	return (
		<FixedContainer>
			<CustomHeader title="Xác thực OTP" />
			<View style={styles.view}>
				<InputOtp onChangeCode={setCode} />
				<CustomButton onPress={handleOtp} text="Xác thực" style={{marginTop: 'auto'}} />
			</View>
		</FixedContainer>
	);
};

export default memo(Otp);
const styles = StyleSheet.create({
	view: {
		padding: widthScale(20),
		flex: 1,
	},
});
