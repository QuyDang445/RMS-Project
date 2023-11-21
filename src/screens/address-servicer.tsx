import React, {useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomButton from '../components/custom-button';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import ModalChooseProvince, {ModalObject} from '../components/sign-up/modal-choose-province';
import Spinner from '../components/spinner';
import {TABLE} from '../constants/enum';
import {RootStackScreenProps} from '../navigator/stacks';
import API from '../services/api';
import {updateUserInfo} from '../stores/reducers/userReducer';
import {useAppDispatch, useAppSelector} from '../stores/store/storeHooks';
import {widthScale} from '../styles/scaling-utils';
import {getInfoUserFromID, showMessage} from '../utils';

const AddressServicer = (props: RootStackScreenProps<'AddressServicer'>) => {
	const {navigation} = props;
	const modalChooseProvinceRef = useRef<ModalObject>(null);
	const userInfo = useAppSelector(state => state.userInfoReducer.userInfo);
	const dispatch = useAppDispatch();

	const [address, setAddress] = useState(userInfo?.address);

	const onPressSave = async () => {
		Spinner.show();
		const newUserInfo = await getInfoUserFromID(userInfo?.id!);
		API.put(`${TABLE.USERS}/${userInfo?.id}`, {...newUserInfo, address: address})
			.then(res => {
				showMessage('Lưu thành công!');
				dispatch(updateUserInfo(res));
				navigation.goBack();
			})
			.finally(() => Spinner.hide());
	};

	return (
		<FixedContainer>
			<CustomHeader title="CẬP NHẬT ĐỊA CHỈ" />
			<TouchableOpacity
				onPress={() => {
					modalChooseProvinceRef.current?.show({});
				}}
				style={{borderWidth: 1, borderRadius: 10, padding: 20, margin: widthScale(20)}}>
				<CustomText numberOfLines={10} text={address} />
			</TouchableOpacity>

			{address !== userInfo?.address && (
				<View style={{padding: widthScale(20), marginTop: 'auto'}}>
					<CustomButton text="Lưu" onPress={onPressSave} />
				</View>
			)}

			<ModalChooseProvince ref={modalChooseProvinceRef} onPressSave={setAddress} />
		</FixedContainer>
	);
};

export default AddressServicer;
const styles = StyleSheet.create({});
