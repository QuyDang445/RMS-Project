import React, {memo} from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../assets/image-paths';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import {FONT_FAMILY} from '../constants/enum';
import {ROUTE_KEY} from '../navigator/routers';
import {RootStackScreenProps} from '../navigator/stacks';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';
import {generateRandomId} from '../utils';

const Notification = (props: RootStackScreenProps<'Notification'>) => {
	const {navigation} = props;
	const onPressDetail = () => {
		navigation.navigate(ROUTE_KEY.DetailNotification);
	};
	return (
		<FixedContainer>
			<CustomHeader title="THÔNG BÁO" hideBack />
			<FlatList
				onRefresh={() => {}}
				refreshing={false}
				style={{paddingHorizontal: widthScale(20)}}
				renderItem={() => (
					<TouchableOpacity
						onPress={onPressDetail}
						style={{
							flexDirection: 'row',
							backgroundColor: `${colors.appColor}50`,
							marginBottom: heightScale(10),
							height: heightScale(80),
							alignItems: 'center',
							borderRadius: 8,
						}}>
						<View style={{width: widthScale(70), height: '100%', justifyContent: 'center', alignItems: 'center'}}>
							<Image style={styles.icon} source={ICONS.bell} />
						</View>

						<View style={{flex: 1, height: '100%', justifyContent: 'space-between'}}>
							<CustomText font={FONT_FAMILY.BOLD} text={'Thông báo trạng thái dịch vụ'} />
							<CustomText text={'16:16:23 - 18/09/2023'} />
							<CustomText text={'Đơn dịch vụ sửa chữa'} />
						</View>

						<TouchableOpacity style={{width: widthScale(30), height: '100%', justifyContent: 'center'}}>
							<Image style={styles.icon} source={ICONS.delete} />
						</TouchableOpacity>
					</TouchableOpacity>
				)}
				keyExtractor={generateRandomId}
				data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
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
