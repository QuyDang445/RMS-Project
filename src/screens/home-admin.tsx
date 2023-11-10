import {useFocusEffect} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {Image, RefreshControl, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {ICONS} from '../assets/image-paths';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import {FONT_FAMILY} from '../constants/enum';
import {UserProps} from '../constants/types';
import {ROUTE_KEY} from '../navigator/routers';
import {RootStackScreenProps} from '../navigator/stacks';
import {heightScale, widthScale} from '../styles/scaling-utils';
import {getServicerALl} from '../utils';
import notifee from '@notifee/react-native';

const HomeAdmin = (props: RootStackScreenProps<'Home'>) => {
	const {navigation} = props;

	const [servicerPending, setServicerPending] = useState<UserProps[]>([]);

	const [loading, setLoading] = useState(false);

	const getServicerPending = async () => {
		setLoading(true);
		const arr = [];
		const data = await getServicerALl();
		for (let i = 0; i < data.length; i++) {
			if (!data[i].isAccept) {
				arr.push(data[i]);
			}
		}
		setServicerPending(arr);
		setLoading(false);
	};

	useFocusEffect(
		useCallback(() => {
			getServicerPending();
		}, []),
	);
	const requestGiveNotification = () => notifee.requestPermission();

	useEffect(() => {
		setTimeout(() => {
			requestGiveNotification();
		}, 1000);
	}, []);

	return (
		<FixedContainer>
			<CustomHeader title="TRANG CHỦ" hideBack />
			<ScrollView
				refreshControl={<RefreshControl onRefresh={getServicerPending} refreshing={loading} />}
				style={{paddingHorizontal: widthScale(20)}}>
				<TouchableOpacity
					disabled={!servicerPending?.length}
					onPress={() => navigation.navigate(ROUTE_KEY.AcceptServicer, {data: servicerPending})}
					style={{
						flexDirection: 'row',
						borderRadius: 5,
						borderWidth: 1,
						alignItems: 'center',
						marginTop: heightScale(20),
						paddingVertical: heightScale(10),
						paddingLeft: widthScale(10),
					}}>
					<Image source={ICONS.user_accept} style={styles.image} />
					<CustomText font={FONT_FAMILY.BOLD} text={`${servicerPending.length} TÀI KHOẢN CHỜ SÉT DUYỆT`} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate(ROUTE_KEY.ManageUser)}
					style={{
						flexDirection: 'row',
						borderRadius: 5,
						borderWidth: 1,
						alignItems: 'center',
						marginTop: heightScale(20),
						paddingVertical: heightScale(10),
						paddingLeft: widthScale(10),
					}}>
					<Image source={ICONS.user_accept} style={styles.image} />
					<CustomText font={FONT_FAMILY.BOLD} text={'QUẢN LÝ TÀI KHOẢN NGƯỜI DÙNG'} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate(ROUTE_KEY.ManageServicer)}
					style={{
						flexDirection: 'row',
						borderRadius: 5,
						borderWidth: 1,
						alignItems: 'center',
						marginTop: heightScale(20),
						paddingVertical: heightScale(10),
						paddingLeft: widthScale(10),
					}}>
					<Image source={ICONS.user_accept} style={styles.image} />
					<CustomText font={FONT_FAMILY.BOLD} text={'QUẢN LÝ TÀI KHOẢN NGƯỜI CUNG\nCẤP DỊCH VỤ'} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate(ROUTE_KEY.ManagePayment)}
					style={{
						flexDirection: 'row',
						borderRadius: 5,
						borderWidth: 1,
						alignItems: 'center',
						marginTop: heightScale(20),
						paddingVertical: heightScale(10),
						paddingLeft: widthScale(10),
					}}>
					<Image source={ICONS.user_accept} style={styles.image} />
					<CustomText font={FONT_FAMILY.BOLD} text={'DUYỆT CÁC GIAO DỊCH NẠP TIỀN'} />
				</TouchableOpacity>
			</ScrollView>
		</FixedContainer>
	);
};

export default memo(HomeAdmin);
const styles = StyleSheet.create({
	image: {
		width: widthScale(50),
		height: widthScale(50),
	},
});
