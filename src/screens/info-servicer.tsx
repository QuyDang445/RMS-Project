import React, {useEffect, useState} from 'react';
import {FlatList, Image, ScrollView, StyleSheet, View} from 'react-native';
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
import {generateRandomId, getServiceFromID} from '../utils';

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
	}, []);

	const getData = () => {
		setLoading(true);
		API.get(`${TABLE.USERS}/${idServicer}`)
			.then(res => setData(res as any))
			.finally(() => setLoading(false));
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

				<CustomText font={FONT_FAMILY.BOLD} text={'CÁC DỊCH VỤ CUNG CẤP'} style={{marginVertical: heightScale(20)}} />
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					renderItem={({item}) => (
						<View
							style={{
								width: widthScale(150),
								height: heightScale(200),
								backgroundColor: colors.grayLine,
								marginRight: widthScale(20),
								borderRadius: 10,
							}}>
							<Image
								style={{width: widthScale(110), height: heightScale(80), alignSelf: 'center', marginTop: widthScale(20)}}
								source={{uri: item.image}}
							/>
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
					{[1, 1, 1, 1, 1].map(item => {
						return (
							<View style={{flexDirection: 'row', marginVertical: heightScale(5)}} key={generateRandomId()}>
								<Image style={styles.avatarComment} source={{uri: 'https://assets.stickpng.com/images/585e4bcdcb11b227491c3396.png'}} />
								<View style={{marginLeft: widthScale(10)}}>
									<CustomText text={'Nguyễn Văn A'} font={FONT_FAMILY.BOLD} />
									<Star star={4} />
									<CustomText text={'Dịch vụ tốt'} />
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
