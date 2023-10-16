import React from 'react';
import {FlatList, Image, ScrollView, StyleSheet, View} from 'react-native';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import Star from '../components/star';
import {FONT_FAMILY} from '../constants/enum';
import {RootStackScreenProps} from '../navigator/stacks';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';
import {generateRandomId} from '../utils';

const InfoServicer = (props: RootStackScreenProps<'InfoServicer'>) => {
	const {navigation} = props;

	return (
		<FixedContainer>
			<CustomHeader title="THÔNG TIN THỢ" />
			<ScrollView style={styles.view}>
				<Image
					style={styles.avatar}
					source={{uri: 'https://hips.hearstapps.com/hmg-prod/images/index-avatar-1665421955.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=1200:*'}}
				/>
				<CustomText text={'Nguyen Van A'} style={{textAlign: 'center', marginVertical: heightScale(10)}} />

				<CustomText font={FONT_FAMILY.BOLD} text={'CÁC DỊCH VỤ CUNG CẤP'} style={{marginVertical: heightScale(20)}} />
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					renderItem={() => (
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
								source={{uri: 'https://fptshop.com.vn/Uploads/images/sua-chua-dien-thoai-lay-lien.jpg'}}
							/>
							<View style={{flex: 1, padding: widthScale(10)}}>
								<CustomText text={'Sửa điện thoại'} />
								<CustomText text={'0123576768'} />
							</View>
						</View>
					)}
					data={[1, 1, 1, 1, 1, 1, 1, 1]}
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
