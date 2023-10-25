import React, {memo, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../../assets/image-paths';
import CustomButton from '../../components/custom-button';
import CustomHeader from '../../components/custom-header';
import CustomText from '../../components/custom-text';
import FixedContainer from '../../components/fixed-container';
import Spinner from '../../components/spinner';
import {FONT_FAMILY, TABLE} from '../../constants/enum';
import {Category, CategoryService, ImageProps} from '../../constants/types';
import {RootStackScreenProps} from '../../navigator/stacks';
import API from '../../services/api';
import {heightScale, widthScale} from '../../styles/scaling-utils';
import {generateRandomId, showMessage} from '../../utils';
import {getImageFromDevice} from '../../utils/image';
import Logger from '../../utils/logger';

const AddServiceCategory = (props: RootStackScreenProps<'AddServiceCategory'>) => {
	const {navigation, route} = props;
	const categoryService = route.params?.categoryService;

	const [isShow, setIsShow] = useState(false);
	const [categoryServices, setCategoryServices] = useState<CategoryService[]>([]);

	const editCategory = categoryService ? {id: categoryService?.idCategoryService, name: categoryService?.type} : undefined;

	const [category, setCategory] = useState<CategoryService>(editCategory as any);
	const [name, setName] = useState(categoryService?.name || '');
	const [image, setImage] = useState<ImageProps>();

	useEffect(() => {
		(async () => {
			Spinner.show();
			const res = (await API.get(`${TABLE.CATEGORY_SERVICE}`, true)) as CategoryService[];
			setCategoryServices(res);

			for (let i = 0; i < res.length; i++) {
				res[i].id === categoryService?.idCategoryService && setCategory(res[i]);
			}

			Spinner.hide();
		})();
	}, []);

	const onPressHandleAdd = async () => {
		if (categoryService) {
			Spinner.show();
			API.put(`${TABLE.CATEGORY}/${categoryService.id}`, {idCategoryService: category?.id, name: name})
				.then(() => {
					showMessage('Sửa dịch vụ thành công!');
					navigation.goBack();
				})
				.finally(() => Spinner.hide());
		} else {
			Spinner.show();
			API.post(`${TABLE.CATEGORY}`, {idCategoryService: category?.id, name: name})
				.then(() => {
					showMessage('Thêm dịch vụ thành công!');
					navigation.goBack();
				})
				.finally(() => Spinner.hide());
		}
	};

	return (
		<FixedContainer>
			<CustomHeader title="THÊM LOẠI DỊCH VỤ" />

			<ScrollView style={styles.view}>
				<CustomText font={FONT_FAMILY.BOLD} text={'LOẠI DỊCH VỤ'} size={14} />
				<TouchableOpacity
					onPress={() => setIsShow(!isShow)}
					style={{
						borderRadius: 5,
						borderWidth: 1,
						height: heightScale(45),
						justifyContent: 'space-between',
						flexDirection: 'row',
						alignItems: 'center',
						paddingHorizontal: widthScale(10),
					}}>
					<CustomText font={FONT_FAMILY.BOLD} text={category?.name || 'CHỌN LOẠI DỊCH VỤ'} size={14} />
					<Image source={ICONS.bottom} style={{width: widthScale(20), height: widthScale(20)}} />
				</TouchableOpacity>
				<View style={{marginBottom: heightScale(20)}}>
					{isShow && (
						<View style={{marginBottom: heightScale(20)}}>
							{categoryServices.map(item => (
								<TouchableOpacity
									onPress={() => {
										setCategory(item);
										setIsShow(false);
									}}
									style={{
										borderWidth: 1,
										borderRadius: 5,
										padding: 5,
										marginVertical: 5,
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
									key={generateRandomId()}>
									<CustomText font={FONT_FAMILY.BOLD} text={item.name} size={14} />
									{category?.id === item.id && <Image source={ICONS.check} style={{width: widthScale(20), height: widthScale(20)}} />}
								</TouchableOpacity>
							))}
						</View>
					)}
				</View>

				<CustomText font={FONT_FAMILY.BOLD} text={'TÊN DỊCH VỤ'} size={14} />
				<View style={styles.viewInput}>
					<TextInput value={name} onChangeText={setName} />
				</View>

				<CustomText font={FONT_FAMILY.BOLD} text={'HÌNH ẢNH'} size={14} />
				<TouchableOpacity
					onPress={async () => {
						const image = await getImageFromDevice();
						image && setImage(image);
					}}
					style={{
						width: widthScale(100),
						height: widthScale(100),
						borderWidth: 1,
						borderRadius: 5,
						justifyContent: 'center',
						alignItems: 'center',
						marginRight: widthScale(15),
					}}>
					<Image style={{width: 25, height: 25}} source={ICONS.camera} />
				</TouchableOpacity>
			</ScrollView>

			<View style={{padding: widthScale(20)}}>
				<CustomButton disabled={!name.trim() || !category || !image} onPress={onPressHandleAdd} text={categoryService ? 'SỬA' : 'THÊM'} />
			</View>
		</FixedContainer>
	);
};

export default memo(AddServiceCategory);
const styles = StyleSheet.create({
	view: {
		paddingHorizontal: widthScale(20),
	},
	viewInput: {
		width: '100%',
		borderRadius: 5,
		borderWidth: 1,
		height: heightScale(45),
	},
});
