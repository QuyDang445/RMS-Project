import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../assets/image-paths';
import CustomButton from '../components/custom-button';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import ModalChooseProvince, {ModalObject} from '../components/sign-up/modal-choose-province';
import Spinner from '../components/spinner';
import {TABLE} from '../constants/enum';
import {AddressProps} from '../constants/types';
import {RootStackScreenProps} from '../navigator/stacks';
import API from '../services/api';
import {useAppSelector} from '../stores/store/storeHooks';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';
import {AlertYesNo} from '../utils';

const ListAddress = (props: RootStackScreenProps<'ListAddress'>) => {
	const {navigation} = props;
	const userInfo = useAppSelector(state => state.userInfoReducer.userInfo);

	const modalChooseProvinceRef = useRef<ModalObject>(null);
	const [data, setData] = useState<AddressProps[]>([]);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		onRefresh();
	}, []);

	const onRefresh = async () => {
		setRefreshing(true);
		const res = (await API.get(`${TABLE.ADDRESS}/${userInfo?.id}`, true)) as AddressProps[];
		setData(res);
		setRefreshing(false);
	};

	const onPressAddAddress = () => modalChooseProvinceRef.current?.show({});

	const handleAddAddress = (text: string, name?: string, phone?: string) => {
		Spinner.show();
		const address = {address: text, name: name, phone: phone};
		API.post(`${TABLE.ADDRESS}/${userInfo?.id}`, address)
			.then(() => onRefresh())
			.finally(() => Spinner.hide());
	};

	const handleDeleteAddress = (id: string) => {
		AlertYesNo(undefined, 'Bạn có muốn xoá không ?', () => {
			Spinner.show();
			API.put(`${TABLE.ADDRESS}/${userInfo?.id}/${id}`, {})
				.then(() => onRefresh())
				.finally(() => Spinner.hide());
		});
	};

	const handleEditAddress = (text: string, name?: string, phone?: string, id?: string) => {
		Spinner.show();
		const address = {address: text, name: name, phone: phone};
		API.put(`${TABLE.ADDRESS}/${userInfo?.id}/${id}`, address)
			.then(() => onRefresh())
			.finally(() => Spinner.hide());
	};

	return (
		<FixedContainer>
			<CustomHeader title="SỔ ĐỊA CHỈ" />
			<FlatList
				refreshing={refreshing}
				onRefresh={onRefresh}
				renderItem={({item}) => (
					<View style={styles.item}>
						<View style={{width: widthScale(280), paddingVertical: heightScale(10), paddingLeft: widthScale(10)}}>
							<CustomText text={`Họ tên: ${item.name}`} />
							<CustomText text={`Số điện thoại: ${item.phone}`} />
							<CustomText text={`Địa chỉ: ${item.address}`} />
						</View>
						<View style={{flex: 1}}>
							<TouchableOpacity onPress={() => handleDeleteAddress(item.id)} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
								<Image style={styles.icon} source={ICONS.delete} />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => modalChooseProvinceRef.current?.show(item)}
								style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
								<Image style={styles.icon} source={ICONS.edit} />
							</TouchableOpacity>
						</View>
					</View>
				)}
				ListEmptyComponent={
					<View style={{alignItems: 'center', marginTop: heightScale(20)}}>
						<CustomText color={colors.grayText} text={'Không có thông tin địa chỉ'} />
					</View>
				}
				contentContainerStyle={styles.view}
				data={data}
			/>
			<View style={{padding: widthScale(20)}}>
				<CustomButton onPress={onPressAddAddress} text="THÊM ĐỊA CHỈ" />
			</View>
			<ModalChooseProvince onEdit={handleEditAddress} isInputName ref={modalChooseProvinceRef} onPressSave={handleAddAddress} />
		</FixedContainer>
	);
};

export default ListAddress;
const styles = StyleSheet.create({
	view: {
		marginHorizontal: widthScale(20),
		marginTop: heightScale(20),
	},
	item: {
		backgroundColor: `${colors.grayLine}50`,
		marginBottom: heightScale(20),
		borderRadius: 8,
		flexDirection: 'row',
	},
	icon: {
		width: widthScale(25),
		height: widthScale(25),
	},
});
