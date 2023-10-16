import React, {memo} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../assets/image-paths';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import {FONT_FAMILY} from '../constants/enum';
import {ROUTE_KEY} from '../navigator/routers';
import {RootStackScreenProps} from '../navigator/stacks';
import {heightScale, widthScale} from '../styles/scaling-utils';

const HomeAdmin = (props: RootStackScreenProps<'Home'>) => {
	const {navigation} = props;

	return (
		<FixedContainer>
			<CustomHeader title="TRANG CHỦ" hideBack />
			<View style={{paddingHorizontal: widthScale(20)}}>
				<TouchableOpacity
					onPress={() => navigation.navigate(ROUTE_KEY.AcceptServicer)}
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
					<CustomText font={FONT_FAMILY.BOLD} text={'4 TÀI KHOẢN CHỜ SÉT DUYỆT'} />
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
			</View>
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
