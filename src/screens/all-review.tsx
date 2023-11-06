import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import FixedContainer from '../components/fixed-container';
import CustomHeader from '../components/custom-header';
import {RootStackScreenProps} from '../navigator/stacks';
import Star from '../components/star';
import {heightScale, widthScale} from '../styles/scaling-utils';
import CustomText from '../components/custom-text';
import {FONT_FAMILY, TABLE} from '../constants/enum';
import {generateRandomId} from '../utils';
import {EvaluateProps, UserProps} from '../constants/types';
import API from '../services/api';

const AllReview = (props: RootStackScreenProps<'AllReview'>) => {
	const {navigation, route} = props;

	const [allReview, setAllReview] = useState<EvaluateProps[]>([]);

	const starTotal = useMemo(() => {
		let total = 0;
		for (let i = 0; i < allReview.length; i++) {
			total += allReview[i].star;
		}

		return total / allReview.length;
	}, [allReview]);

	useEffect(() => {
		(async () => {
			const evaluate = (await API.get(`${TABLE.EVALUATE}/${route.params.idService}`, true)) as EvaluateProps[];
			for (let i = 0; i < evaluate.length; i++) {
				evaluate[i].userObject = (await API.get(`${TABLE.USERS}/${evaluate[i].user_id}`)) as UserProps;
			}
			setAllReview(evaluate);
		})();
	}, []);

	return (
		<FixedContainer>
			<CustomHeader title="TẤT CẢ ĐÁNH GIÁ" />
			<ScrollView style={styles.view}>
				<Star star={starTotal} isShowNumber />

				<View style={{marginTop: widthScale(10)}}>
					{allReview.map(item => {
						return (
							<View style={{flexDirection: 'row', marginVertical: heightScale(5)}} key={generateRandomId()}>
								<Image style={styles.avatarComment} source={{uri: item.userObject?.avatar}} />
								<View style={{marginLeft: widthScale(10)}}>
									<CustomText text={item.userObject?.name} font={FONT_FAMILY.BOLD} />
									<Star star={item.star} />
									{!!item.content && <CustomText text={item.content} />}
									<View style={{flexDirection: 'row'}}>
										{item.images?.map(item => (
											<Image
												style={{width: widthScale(50), height: heightScale(40), borderRadius: 8, marginRight: widthScale(5)}}
												key={generateRandomId()}
												source={{uri: item}}
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
	},
});
