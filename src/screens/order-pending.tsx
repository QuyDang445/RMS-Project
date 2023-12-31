import {FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import {colors} from '../styles/colors';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import CustomText from '../components/custom-text';
import {TABLE, FONT_FAMILY, TYPE_ORDER_SERVICE} from '../constants/enum';
import {OrderProps, UserProps} from '../constants/types';
import {ROUTE_KEY} from '../navigator/routers';
import API from '../services/api';
import {useAppSelector} from '../stores/store/storeHooks';
import {heightScale, widthScale} from '../styles/scaling-utils';
import {generateRandomId, getColorStatusOrder, getStatusOrder} from '../utils';

const OrderPending = () => {
	const navigation = useNavigation<any>();

	const userInfo = useAppSelector(state => state.userInfoReducer.userInfo);

	const [refreshing, setRefreshing] = useState(false);
	const [data, setData] = useState<OrderProps[]>([]);

	useFocusEffect(
		useCallback(() => {
			onRefresh();
		}, []),
	);

	const onRefresh = async () => {
		setRefreshing(true);
		const res = (await API.get(`${TABLE.ORDERS}`, true)) as OrderProps[];

		const newData = [];
		for (let i = 0; i < res.length; i++) {
			if (userInfo?.id === res[i].idUser && res[i].status === TYPE_ORDER_SERVICE.OrderPending) {
				newData.push(res[i]);
			}
		}

		for (let i = 0; i < newData.length; i++) {
			const service = (await API.get(`${TABLE.SERVICE}/${newData[i].idService}`)) as any;
			newData[i].serviceObject = service;
		}

		const arrServicer = (await API.get(`${TABLE.USERS}`, true)) as UserProps[];
		for (let i = 0; i < newData.length; i++) {
			let servicerObject = {} as UserProps;

			for (let j = 0; j < arrServicer.length; j++) {
				if (arrServicer[j].id === newData[i].serviceObject.servicer) {
					servicerObject = arrServicer[i];
					break;
				}
			}
			newData[i].servicerObject = servicerObject;
		}
		setData(newData);
		setRefreshing(false);
	};

	const onPressDetail = (item: OrderProps) => navigation.navigate(ROUTE_KEY.DetailOrder, {data: item});

	return (
		<ScrollView refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />} style={styles.view}>
			<FlatList
				scrollEnabled={false}
				renderItem={({item}) => (
					<TouchableOpacity
						key={generateRandomId()}
						onPress={() => onPressDetail(item)}
						style={{flexDirection: 'row', marginBottom: heightScale(20)}}>
						<Image style={{width: widthScale(120), height: '100%', borderRadius: 5}} source={{uri: item?.serviceObject?.image}} />
						<View style={{marginLeft: widthScale(10)}}>
							<CustomText font={FONT_FAMILY.BOLD} text={item?.serviceObject?.name} />
							<CustomText text={item?.servicerObject.name} />
							<CustomText text={moment(item?.timeBooking).format('hh:mm - DD/MM/YYYY')} />
						</View>
					</TouchableOpacity>
				)}
				ListEmptyComponent={
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
						<CustomText color={colors.grayText} text={'Không có đơn đặt hàng!'} />
					</View>
				}
				data={data}
			/>
		</ScrollView>
	);
};

export default memo(OrderPending);
const styles = StyleSheet.create({
	view: {
		flex: 1,
		backgroundColor: colors.white,
		paddingHorizontal: widthScale(20),
	},
});
