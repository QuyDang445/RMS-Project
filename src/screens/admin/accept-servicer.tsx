import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RootStackScreenProps} from '../../navigator/stacks';
import FixedContainer from '../../components/fixed-container';
import CustomHeader from '../../components/custom-header';
import CustomText from '../../components/custom-text';
import {heightScale, widthScale} from '../../styles/scaling-utils';
import {ICONS} from '../../assets/image-paths';
import {colors} from '../../styles/colors';
import {FONT_FAMILY} from '../../constants/enum';
import {ROUTE_KEY} from '../../navigator/routers';

const AcceptServicer = (props: RootStackScreenProps<'AcceptServicer'>) => {
	const {navigation} = props;

	const onPressDetailService = () => navigation.navigate(ROUTE_KEY.InfoAcceptServicer);

	return (
		<FixedContainer>
			<CustomHeader title="SÉT DUYỆT TÀI KHOẢN" />
			<FlatList
				contentContainerStyle={{padding: widthScale(20)}}
				data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
				renderItem={() => (
					<TouchableOpacity
						onPress={onPressDetailService}
						style={{borderRadius: 5, borderWidth: 1, marginBottom: heightScale(20), padding: widthScale(10), flexDirection: 'row'}}>
						<View
							style={{
								borderRadius: 100,
								backgroundColor: `${colors.gray}80`,
								width: widthScale(70),
								height: widthScale(70),
								justifyContent: 'center',
								alignItems: 'center',
								marginRight: widthScale(10),
							}}>
							<Image style={{width: widthScale(50), height: widthScale(50)}} source={ICONS.user_accept} />
						</View>

						<View>
							<CustomText font={FONT_FAMILY.BOLD} text={'Họ và tên'} />
							<CustomText text={'012345555'} />
							<CustomText text={'Ngày đăng ký: 15/01/2023'} />
						</View>
					</TouchableOpacity>
				)}
			/>
		</FixedContainer>
	);
};

export default AcceptServicer;

const styles = StyleSheet.create({});
