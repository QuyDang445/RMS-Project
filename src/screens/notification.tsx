import moment from 'moment';
import React, {memo, useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../assets/image-paths';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import Spinner from '../components/spinner';
import {FONT_FAMILY, TABLE} from '../constants/enum';
import {Notification as TypeNotification} from '../constants/types';
import {ROUTE_KEY} from '../navigator/routers';
import {RootStackScreenProps} from '../navigator/stacks';
import API from '../services/api';
import {useAppSelector} from '../stores/store/storeHooks';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';
import {generateRandomId, showMessage} from '../utils';
import {sendNotificationToDevices} from '../utils/notification';

const Notification = (props: RootStackScreenProps<'Notification'>) => {
	const {navigation} = props;
	const userInfo = useAppSelector(state => state.userInfoReducer.userInfo);

	const [data, setData] = useState<any[]>([]);

	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		onRefresh();
	}, []);

	const onPressDetail = (item: any) => {
		navigation.navigate(ROUTE_KEY.DetailNotification, {data: item} as any);
	};
	const onPressDelete = (item: any) => {
		Spinner.show();
		API.put(`${TABLE.NOTIFICATION}/${userInfo?.id}/${item.id}`, {})
			.then(() => {
				showMessage('Xoá thành công!');
				onRefresh();
			})
			.finally(() => Spinner.hide());
	};
	const onRefresh = () => {
		setRefreshing(true);
		API.get(`${TABLE.NOTIFICATION}/${userInfo?.id}`, true)
			.then((res: TypeNotification[]) => {
				setData(res);
			})
			.finally(() => setRefreshing(false));
	};

	return (
		<FixedContainer>
			<CustomHeader title="THÔNG BÁO" hideBack />
			<FlatList
				onRefresh={onRefresh}
				refreshing={refreshing}
				style={{paddingHorizontal: widthScale(20)}}
				renderItem={({item}) => (
					<TouchableOpacity
						onPress={() => onPressDetail(item)}
						style={{
							flexDirection: 'row',
							backgroundColor: `${colors.appColor}50`,
							marginBottom: heightScale(10),
							height: heightScale(100),
							alignItems: 'center',
							borderRadius: 8,
						}}>
						<View style={{width: widthScale(70), height: '100%', justifyContent: 'center', alignItems: 'center'}}>
							<Image style={styles.icon} source={ICONS.bell} />
						</View>

						<View style={{flex: 1, height: '100%', justifyContent: 'space-between'}}>
							<CustomText font={FONT_FAMILY.BOLD} text={item?.title} />
							<CustomText text={moment(item.time).format('hh:mm:ss - DD/MM/YYYY')} />
							<CustomText text={item.body} />
						</View>

						<TouchableOpacity onPress={() => onPressDelete(item)} style={{width: widthScale(30), height: '100%', justifyContent: 'center'}}>
							<Image style={styles.icon} source={ICONS.delete} />
						</TouchableOpacity>
					</TouchableOpacity>
				)}
				keyExtractor={generateRandomId}
				data={data}
				ListEmptyComponent={
					<View style={{marginTop: heightScale(40), alignItems: 'center'}}>
						<CustomText color={colors.grayText} text={'Không có thông báo nào'} />
					</View>
				}
			/>
		</FixedContainer>
	);
};

export default memo(Notification);
const styles = StyleSheet.create({
	icon: {
		width: widthScale(30),
		height: widthScale(30),
	},
});
