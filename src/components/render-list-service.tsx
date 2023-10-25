import {StackNavigationProp} from '@react-navigation/stack';
import React, {memo, useState} from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {FONT_FAMILY, TYPE_ORDER_SERVICE} from '../constants/enum';
import {RootStackScreensParams} from '../navigator/params';
import {ROUTE_KEY} from '../navigator/routers';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';
import CustomText from './custom-text';

interface Props {
	navigation: StackNavigationProp<RootStackScreensParams>;
	type: TYPE_ORDER_SERVICE;
}
const RenderListService = (props: Props) => {
	const {navigation, type} = props;

	const [refreshing, setRefreshing] = useState(false);
	const [data, setData] = useState([]);

	const onRefresh = async () => {};

	const onPressDetail = () => navigation.navigate(ROUTE_KEY.DetailOrder);

	// xác nhận đơn
	const onPressConfirm = () => {};

	// huỷ đơn
	const onPressCancel = () => {};

	// xong đơn
	const onPressCompleted = () => {};

	return (
		<FlatList
			onRefresh={onRefresh}
			refreshing={refreshing}
			contentContainerStyle={styles.view}
			data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
			renderItem={() => (
				<TouchableOpacity onPress={onPressDetail} style={{marginBottom: heightScale(20), flexDirection: 'row'}}>
					<Image
						style={styles.viewImage}
						source={{uri: 'https://kenh14cdn.com/203336854389633024/2021/9/22/photo-1-16323151756351473238622.jpg'}}
					/>
					<View style={{marginLeft: widthScale(10), flex: 1}}>
						<CustomText font={FONT_FAMILY.BOLD} text={'Sua dien thoai'} />
						<CustomText text={'Nguyễn Thị B'} />
						<CustomText text={'18:00 17/08/2023'} />
						<View style={{flexDirection: 'row', flex: 1, width: '100%'}}>
							<TouchableOpacity onPress={onPressConfirm} style={styles.buttonItem}>
								<CustomText color={colors.appColor} font={FONT_FAMILY.BOLD} text={'XÁC NHẬN'} />
							</TouchableOpacity>
							<TouchableOpacity onPress={onPressCancel} style={styles.buttonItem}>
								<CustomText color={colors.red} font={FONT_FAMILY.BOLD} text={'HUỶ'} />
							</TouchableOpacity>
						</View>
					</View>
				</TouchableOpacity>
			)}
		/>
	);
};

export default memo(RenderListService);
const styles = StyleSheet.create({
	view: {
		padding: widthScale(20),
		backgroundColor: colors.white,
	},
	viewImage: {
		width: widthScale(150),
		height: heightScale(100),
		borderRadius: 5,
	},
	buttonItem: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
