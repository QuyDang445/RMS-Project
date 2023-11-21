import React, {useEffect, useState} from 'react';
import {FlatList, Image, Modal, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {ICONS, IMAGES} from '../assets/image-paths';
import CustomButton from '../components/custom-button';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import Spinner from '../components/spinner';
import {TABLE} from '../constants/enum';
import {ServicerBlockUser} from '../constants/types';
import {RootStackScreenProps} from '../navigator/stacks';
import API from '../services/api';
import {useAppSelector} from '../stores/store/storeHooks';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';
import {AlertYesNo, generateRandomId, showMessage} from '../utils';

const ListUserBlock = (props: RootStackScreenProps<'ListUserBlock'>) => {
	const {navigation} = props;

	const [showBlock, setShowBlock] = useState(false);

	const [phone, setPhone] = useState('');
	const [refreshing, setRefreshing] = useState(false);

	const [data, setData] = useState<ServicerBlockUser[]>([]);
	const userInfo = useAppSelector(state => state.userInfoReducer.userInfo);

	useEffect(() => {
		onRefresh();
	}, []);

	const onRefresh = () => {
		setRefreshing(true);
		API.get(`${TABLE.SERVICE_BLOCK_USER}`, true)
			.then((res: ServicerBlockUser[]) => {
				const arr = [];
				for (let i = 0; i < res.length; i++) {
					res[i].idServicer === userInfo?.id && arr.push(res[i]);
				}
				setData(arr);
			})
			.finally(() => setRefreshing(false));
	};

	const handleAddBlock = () => {
		if (phone) {
			setShowBlock(false);
			Spinner.show();
			API.post(`${TABLE.SERVICE_BLOCK_USER}`, {idServicer: userInfo?.id, phone: phone})
				.then(() => {
					showMessage('Block số điện thoại thành công!');
					onRefresh();
					setPhone('');
				})
				.finally(() => Spinner.hide());
		}
	};

	const deleteBlock = (id: string) => {
		AlertYesNo(undefined, 'Bạn chắc chắn muốn xoá?', () => {
			Spinner.show();
			API.put(`${TABLE.SERVICE_BLOCK_USER}/${id}`, {})
				.then(() => {
					showMessage('Xoá thành công!');
					onRefresh();
				})
				.finally(() => Spinner.hide());
		});
	};

	return (
		<FixedContainer>
			<CustomHeader
				title="DANH SÁCH CHẶN"
				rightContent={
					<TouchableOpacity onPress={() => setShowBlock(true)}>
						<Image style={{width: widthScale(25), height: widthScale(25)}} source={ICONS.add} />
					</TouchableOpacity>
				}
			/>

			<FlatList
				onRefresh={onRefresh}
				refreshing={refreshing}
				contentContainerStyle={{paddingHorizontal: widthScale(30)}}
				renderItem={({item}) => (
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginBottom: heightScale(10),
							paddingVertical: heightScale(10),
						}}>
						<Image source={IMAGES.LOGO} style={{width: widthScale(30), height: widthScale(30)}} />
						<CustomText text={item.phone} />
						<TouchableOpacity onPress={() => deleteBlock(item.id)}>
							<Image source={ICONS.delete} style={{width: widthScale(30), height: widthScale(30)}} />
						</TouchableOpacity>
					</View>
				)}
				keyExtractor={generateRandomId}
				data={data}
				ListEmptyComponent={
					<View style={{justifyContent: 'center', alignItems: 'center', marginTop: heightScale(50)}}>
						<CustomText color={colors.grayText} text={'Không có dữ liệu!'} />
					</View>
				}
			/>
			<Modal
				statusBarTranslucent
				onDismiss={() => setShowBlock(false)}
				onRequestClose={() => setShowBlock(false)}
				transparent
				animationType="fade"
				visible={showBlock}>
				<View style={{backgroundColor: colors.backgroundModal, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
					<View
						style={{
							width: widthScale(300),
							height: heightScale(160),
							backgroundColor: colors.white,
							borderRadius: 8,
							padding: widthScale(10),
							justifyContent: 'space-between',
						}}>
						<View style={{flexDirection: 'row', alignItems: 'center'}}>
							<CustomText text={'SDT:'} />
							<TextInput
								keyboardType="numeric"
								onChangeText={setPhone}
								value={phone}
								style={{
									borderRadius: 5,
									borderWidth: 1,
									borderColor: colors.black,
									padding: 0,
									height: heightScale(40),
									flex: 1,
									marginLeft: widthScale(10),
									paddingHorizontal: 10,
								}}
							/>
						</View>

						<CustomButton onPress={handleAddBlock} style={{width: widthScale(100), alignSelf: 'center'}} text="Chặn" />
					</View>
				</View>
			</Modal>
		</FixedContainer>
	);
};

export default ListUserBlock;

const styles = StyleSheet.create({});
