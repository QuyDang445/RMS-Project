import React, {useEffect, useState} from 'react';
import {FlatList, Image, Linking, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../assets/image-paths';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import LoadingScreen from '../components/loading-screen';
import Star from '../components/star';
import {FONT_FAMILY, TABLE} from '../constants/enum';
import {EvaluateProps, ServiceProps, UserProps} from '../constants/types';
import {RootStackScreenProps} from '../navigator/stacks';
import API from '../services/api';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';
import {generateRandomId, getEvaluateFromServicer, getServiceFromID} from '../utils';

const InfoServicer = (props: RootStackScreenProps<'InfoServicer'>) => {
	const {navigation, route} = props;

	const idServicer = route.params.idServicer;

	const [loading, setLoading] = useState(false);

	const [data, setData] = useState<UserProps>();

	const [service, setService] = useState<ServiceProps[]>([]);

	const [evaluate, setEvaluate] = useState<EvaluateProps[]>([]);

	useEffect(() => {
		getData();
		getService();
		getEvaluate();
	}, []);

	const getData = () => {
		setLoading(true);
		API.get(`${TABLE.USERS}/${idServicer}`)
			.then(res => setData(res as any))
			.finally(() => setLoading(false));
	};
	const getEvaluate = async () => {
		const evaluate_ = await getEvaluateFromServicer(idServicer);

		setEvaluate(evaluate_);
	};

	const getService = async () => {
		const res = await getServiceFromID(idServicer);
		setService(res);
	};

	if (loading) {
		return <LoadingScreen />;
	}

	return (
		<FixedContainer>
			<CustomHeader title="THÔNG TIN THỢ" />
			<ScrollView style={styles.view}>
				<Image style={styles.avatar} source={{uri: data?.avatar}} />
				<CustomText text={data?.name} style={{textAlign: 'center', marginVertical: heightScale(10)}} />

				<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
					<CustomText text={'Số điện thoại: ' + data?.phone} />
					<TouchableOpacity onPress={() => Linking.openURL(`tel:${data?.phone}`)}>
						<Image source={ICONS.call} style={{width: widthScale(30), height: widthScale(30)}} />
					</TouchableOpacity>
				</View>
				<CustomText font={FONT_FAMILY.BOLD} text={'CÁC DỊCH VỤ CUNG CẤP'} style={{marginVertical: heightScale(20)}} />
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					renderItem={({item}) => (
						<View
							style={{
								width: widthScale(150),
								minHeight: heightScale(200),
								borderColor: colors.grayLine,
								marginRight: widthScale(20),
								borderRadius: 10,
								borderWidth: 1,
								overflow: 'hidden',
							}}>
							<Image style={{width: '100%', height: heightScale(120), alignSelf: 'center'}} source={{uri: item.image}} />
							<View style={{flex: 1, padding: widthScale(10)}}>
								<CustomText text={item.name} />
								<Star star={item?.star} />
							</View>
						</View>
					)}
					data={service}
				/>

				<CustomText font={FONT_FAMILY.BOLD} text={'ĐÁNH GIÁ'} style={{marginVertical: heightScale(20)}} />
				<View style={{padding: widthScale(10)}}>
					{evaluate?.map(item => {
						return (
							<View style={{flexDirection: 'row', marginVertical: heightScale(5)}} key={generateRandomId()}>
								<Image style={styles.avatarComment} source={{uri: item.userObject?.avatar}} />
								<View style={{marginLeft: widthScale(10)}}>
									<CustomText text={item.userObject?.name} font={FONT_FAMILY.BOLD} />
									<Star star={item.star} />
									<CustomText text={item?.content} />
								</View>
							</View>
						);
					})}
				</View>
			</ScrollView>
		</FixedContainer>
	);
};

export default InfoServicer;
const styles = StyleSheet.create({
	avatar: {
		width: widthScale(100),
		height: widthScale(100),
		borderRadius: 100,
		alignSelf: 'center',
		marginTop: heightScale(30),
	},
	view: {
		paddingHorizontal: widthScale(20),
	},
	avatarComment: {
		width: widthScale(40),
		height: widthScale(40),
		borderRadius: 100,
		backgroundColor: 'red',
	},
});
