import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FixedContainer from '../components/fixed-container';
import CustomHeader from '../components/custom-header';
import {RootStackScreenProps} from '../navigator/stacks';
import Star from '../components/star';
import {heightScale, widthScale} from '../styles/scaling-utils';
import CustomText from '../components/custom-text';
import {FONT_FAMILY} from '../constants/enum';
import {generateRandomId} from '../utils';

const AllReview = (props: RootStackScreenProps<'AllReview'>) => {
	const {navigation} = props;

	return (
		<FixedContainer>
			<CustomHeader title="TẤT CẢ ĐÁNH GIÁ" />
			<ScrollView style={styles.view}>
				<Star star={4} isShowNumber />

				<View style={{marginTop: widthScale(10)}}>
					{[1, 1, 1, 1, 1].map(item => {
						return (
							<View style={{flexDirection: 'row', marginVertical: heightScale(5)}} key={generateRandomId()}>
								<Image style={styles.avatarComment} source={{uri: 'https://assets.stickpng.com/images/585e4bcdcb11b227491c3396.png'}} />
								<View style={{marginLeft: widthScale(10)}}>
									<CustomText text={'Nguyễn Văn A'} font={FONT_FAMILY.BOLD} />
									<Star star={4} />
									<CustomText text={'Dịch vụ tốt'} />
									<View style={{flexDirection: 'row'}}>
										{[1, 1, 1, 1].map(item => (
											<Image
												style={{width: widthScale(50), height: heightScale(40), borderRadius: 8, marginRight: widthScale(5)}}
												key={generateRandomId()}
												source={{
													uri: 'https://images.unsplash.com/photo-1584432743501-7d5c27a39189?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmljZSUyMHZpZXd8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
												}}
											/>
										))}
									</View>
								</View>
							</View>
						);
					})}
				</View>
			</ScrollView>
		</FixedContainer>
	);
};

export default AllReview;
const styles = StyleSheet.create({
	view: {
		paddingHorizontal: widthScale(20),
		marginTop: heightScale(20),
	},
	avatarComment: {
		width: widthScale(40),
		height: widthScale(40),
		borderRadius: 100,
		backgroundColor: 'red',
	},
});
