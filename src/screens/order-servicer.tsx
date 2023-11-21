import React, {memo, useEffect, useState} from 'react';
import {DeviceEventEmitter, FlatList, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../assets/image-paths';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import Spinner from '../components/spinner';
import Star from '../components/star';
import {EMIT_EVENT, FONT_FAMILY, TABLE} from '../constants/enum';
import {ServiceProps} from '../constants/types';
import {ROUTE_KEY} from '../navigator/routers';
import {RootStackScreenProps} from '../navigator/stacks';
import API from '../services/api';
import {useAppSelector} from '../stores/store/storeHooks';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';
import {AlertYesNo, getServiceFromID, showMessage} from '../utils';

const OrderServicer = (props: RootStackScreenProps<'Order'>) => {
	const {navigation} = props;

	const userInfo = useAppSelector(state => state.userInfoReducer.userInfo);

	const [data, setData] = useState<ServiceProps[]>([]);
	const [refreshing, setRefreshing] = useState(false);

	const onPressDetail = (item: ServiceProps) => navigation.navigate(ROUTE_KEY.DetailService, {data: item});

	const onPressAddService = () => navigation.navigate(ROUTE_KEY.AddService);

	const onRefresh = async () => {
		setRefreshing(true);
		const newData = await getServiceFromID(userInfo?.id!);
		setData(newData);
		setRefreshing(false);
	};

	useEffect(() => {
		onRefresh();
		DeviceEventEmitter.addListener(EMIT_EVENT.LOAD_SERVICE, onRefresh);
	}, []);

	const onPressEdit = (item: ServiceProps) => navigation.navigate(ROUTE_KEY.AddService, {data: item});

	const onPressDelete = (item: ServiceProps) => {
		AlertYesNo(undefined, 'Bạn chắc chắn muốn xoá?', () => {
			Spinner.show();
			API.put(`${TABLE.SERVICE}/${item.id}`, {})
				.then(() => {
					showMessage('Xoá dịch vụ thành công!');
					onRefresh();
				})
				.finally(() => Spinner.hide());
		});
	};

	return (
		<FixedContainer>
			<CustomHeader
				title="DỊCH VỤ CỦA TÔI"
				hideBack
				rightContent={
					<TouchableOpacity onPress={onPressAddService}>
						<Image style={styles.iconAdd} source={ICONS.add} />
					</TouchableOpacity>
				}
			/>

			<FlatList
				refreshing={refreshing}
				onRefresh={onRefresh}
				contentContainerStyle={{padding: widthScale(20)}}
				renderItem={({item}) => {
					return (
						<TouchableOpacity
							onPress={() => onPressDetail(item)}
							style={{
								flexDirection: 'row',
								marginBottom: widthScale(10),
								borderRadius: 10,
								borderWidth: 1,
								borderColor: colors.gray,
								overflow: 'hidden',
							}}>
							<Image style={styles.image} source={{uri: item.image}} />
							<View style={{flex: 1, marginLeft: widthScale(10), padding: widthScale(10)}}>
								<CustomText font={FONT_FAMILY.BOLD} text={item.name} />
								<CustomText text={item?.categoryObject?.name} />
								<Star star={item?.star || 0} />
								<View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', gap: 10}}>
									<TouchableOpacity onPress={() => onPressEdit(item)}>
										<Image source={ICONS.edit} style={styles.icon} />
									</TouchableOpacity>
									<TouchableOpacity onPress={() => onPressDelete(item)}>
										<Image source={ICONS.delete} style={styles.icon} />
									</TouchableOpacity>
								</View>
							</View>
						</TouchableOpacity>
					);
				}}
				ListEmptyComponent={
					<View style={{marginTop: heightScale(50)}}>
						<CustomText style={{textAlign: 'center'}} color={colors.grayText} text={'Bạn không có dịch vụ nào'} />
					</View>
				}
				data={data}
			/>
		</FixedContainer>
	);
};

export default memo(OrderServicer);
const styles = StyleSheet.create({
	iconAdd: {
		width: widthScale(25),
		height: widthScale(25),
	},
	image: {
		width: widthScale(150),
		height: '100%',
		borderRadius: 5,
	},
	icon: {
		width: widthScale(25),
		height: widthScale(25),
	},
});
