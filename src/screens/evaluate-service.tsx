import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, Vibration, View} from 'react-native';
import React, {memo, useState} from 'react';
import {RootStackScreenProps} from '../navigator/stacks';
import FixedContainer from '../components/fixed-container';
import CustomHeader from '../components/custom-header';
import {heightScale, widthScale} from '../styles/scaling-utils';
import CustomText from '../components/custom-text';
import {FONT_FAMILY, TABLE} from '../constants/enum';
import {colors} from '../styles/colors';
import {ICONS} from '../assets/image-paths';
import {getImageFromDevice, uploadImage} from '../utils/image';
import {EvaluateProps, ImageProps} from '../constants/types';
import CustomButton from '../components/custom-button';
import Spinner from '../components/spinner';
import API from '../services/api';
import {useAppSelector} from '../stores/store/storeHooks';
import {showMessage} from '../utils';
import {OrderProps} from '../constants/types';
import {TYPE_ORDER_SERVICE} from '../constants/enum';
import Logger from '../utils/logger';

const EvaluateService = (props: RootStackScreenProps<'EvaluateService'>) => {
	const {navigation, route} = props;

	const data = route.params.data;

	const userInfo = useAppSelector(state => state.userInfoReducer.userInfo);

	const [star, setStar] = useState(5);
	const [images, setImages] = useState<ImageProps[]>([]);
	const [content, setContent] = useState('');

	const handleEvaluate = async () => {
		Spinner.show();
		const listImage = [];
		for (let i = 0; i < images.length; i++) {
			const url = await uploadImage(images[i].uri);
			listImage.push(url);
		}

		API.post(`${TABLE.EVALUATE}/${data.idService}`, {
			id_service: data?.idService,
			images: listImage,
			star: star,
			user_id: userInfo?.id,
			content: content,
		})
			.then(async () => {
				const newData = await API.get(`${TABLE.ORDERS}/${data.id}`);
				API.put(`${TABLE.ORDERS}/${data.id}`, {...newData, isEvaluate: true}).then(() => {
					showMessage('Đánh giá thành công');
					navigation.goBack();
					navigation.goBack();
				});
			})
			.finally(() => Spinner.hide());
	};

	return (
		<FixedContainer>
			<CustomHeader title="ĐÁNH GIÁ DỊCH VỤ" />
			<ScrollView style={{paddingHorizontal: widthScale(20)}}>
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					<Image style={{width: widthScale(120), height: widthScale(120), borderRadius: 10}} source={{uri: data?.serviceObject?.image}} />
					<View style={{marginLeft: widthScale(20)}}>
						<CustomText font={FONT_FAMILY.BOLD} text={data?.categoryObject.name} />
						<CustomText text={data?.serviceObject?.name} />
					</View>
				</View>

				<View style={{flexDirection: 'row', alignItems: 'center', marginVertical: heightScale(10)}}>
					<Image style={{width: widthScale(50), height: widthScale(50), borderRadius: 100}} source={{uri: data?.servicerObject?.avatar}} />
					<View>
						<CustomText font={FONT_FAMILY.BOLD} text={data?.servicerObject.name} />
						<CustomText text={data?.servicerObject?.phone} />
					</View>
				</View>

				<View style={{width: widthScale(300), height: 1, backgroundColor: colors.black, alignSelf: 'center', marginVertical: 10}} />

				<View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginVertical: 10}}>
					<TouchableOpacity onPress={() => setStar(1)}>
						<Image
							source={star >= 1 ? ICONS.star_full : ICONS.star}
							style={[styles.star, {tintColor: star >= 1 ? colors.yellow : undefined}]}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setStar(2)}>
						<Image
							source={star >= 2 ? ICONS.star_full : ICONS.star}
							style={[styles.star, {tintColor: star >= 2 ? colors.yellow : undefined}]}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setStar(3)}>
						<Image
							source={star >= 3 ? ICONS.star_full : ICONS.star}
							style={[styles.star, {tintColor: star >= 3 ? colors.yellow : undefined}]}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setStar(4)}>
						<Image
							source={star >= 4 ? ICONS.star_full : ICONS.star}
							style={[styles.star, {tintColor: star >= 4 ? colors.yellow : undefined}]}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setStar(5)}>
						<Image
							source={star >= 5 ? ICONS.star_full : ICONS.star}
							style={[styles.star, {tintColor: star >= 5 ? colors.yellow : undefined}]}
						/>
					</TouchableOpacity>
				</View>

				<CustomText text={'Nội dung đánh giá'} style={{textAlign: 'center'}} />
				<View style={{borderRadius: 5, borderWidth: 1, borderColor: 'black', marginBottom: heightScale(20)}}>
					<TextInput value={content} onChangeText={setContent} multiline placeholder="Hãy nhập đánh giá" style={{}} />
				</View>

				<CustomText text={'Hình ảnh'} style={{textAlign: 'center'}} />

				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					<TouchableOpacity
						onPress={async () => {
							const image = await getImageFromDevice(10);
							setImages([...images, ...image]);
						}}
						style={{
							width: widthScale(80),
							height: widthScale(80),
							borderRadius: 5,
							justifyContent: 'center',
							alignItems: 'center',
							borderWidth: 1,
							marginRight: 10,
						}}>
						<Image style={{width: widthScale(25), height: widthScale(25)}} source={ICONS.camera} />
					</TouchableOpacity>
					<ScrollView showsHorizontalScrollIndicator={false} horizontal>
						{images?.map((item, index) => (
							<View style={{marginRight: 10}}>
								<TouchableOpacity
									onPress={() => {
										const newImages = [...images];
										newImages.splice(index, 1);
										setImages(newImages);
									}}
									style={{
										position: 'absolute',
										zIndex: 10,
										right: 0,
										backgroundColor: colors.white,
										borderRadius: 100,
										width: widthScale(25),
										height: widthScale(25),
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									<Image
										source={ICONS.delete}
										style={{
											width: widthScale(18),
											height: widthScale(18),
										}}
									/>
								</TouchableOpacity>
								<Image
									style={{
										width: widthScale(80),
										height: widthScale(80),
										borderRadius: 5,
										justifyContent: 'center',
										alignItems: 'center',
										borderWidth: 1,
									}}
									source={item}
								/>
							</View>
						))}
					</ScrollView>
				</View>
			</ScrollView>
			<View style={{padding: widthScale(20)}}>
				<CustomButton disabled={!content || !images.length} text="ĐÁNH GIÁ" onPress={handleEvaluate} />
			</View>
		</FixedContainer>
	);
};

export default memo(EvaluateService);
const styles = StyleSheet.create({
	star: {
		width: widthScale(30),
		height: widthScale(30),
	},
});
