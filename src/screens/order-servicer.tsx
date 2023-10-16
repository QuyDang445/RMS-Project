import React, {memo} from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../assets/image-paths';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import Star from '../components/star';
import {FONT_FAMILY} from '../constants/enum';
import {ROUTE_KEY} from '../navigator/routers';
import {RootStackScreenProps} from '../navigator/stacks';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';

const OrderServicer = (props: RootStackScreenProps<'Order'>) => {
	const {navigation} = props;

	const onPressDetail = item => navigation.navigate(ROUTE_KEY.DetailService, {servicer: item});
	const onPressAddService = () => navigation.navigate(ROUTE_KEY.AddService);

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
				contentContainerStyle={{padding: widthScale(20)}}
				renderItem={({item}) => {
					return (
						<TouchableOpacity
							onPress={() => onPressDetail(item)}
							style={{
								padding: widthScale(10),
								flexDirection: 'row',
								marginBottom: widthScale(10),
								borderRadius: 10,
								borderWidth: 1,
								borderColor: colors.gray,
							}}>
							<Image
								style={styles.image}
								source={{uri: 'https://kenh14cdn.com/203336854389633024/2021/9/22/photo-1-16323151756351473238622.jpg'}}
							/>
							<View style={{flex: 1, marginLeft: widthScale(10)}}>
								<CustomText font={FONT_FAMILY.BOLD} text={'Sua dien'} />
								<CustomText text={'Dien'} />
								<Star star={3} />
								<View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', gap: 10}}>
									<TouchableOpacity>
										<Image source={ICONS.edit} style={styles.icon} />
									</TouchableOpacity>
									<TouchableOpacity>
										<Image source={ICONS.delete} style={styles.icon} />
									</TouchableOpacity>
								</View>
							</View>
						</TouchableOpacity>
					);
				}}
				data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
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
		height: heightScale(100),
		borderRadius: 5,
	},
	icon: {
		width: widthScale(25),
		height: widthScale(25),
	},
});
