import React, {memo, useState} from 'react';
import {Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../../assets/image-paths';
import CustomButton from '../../components/custom-button';
import CustomHeader from '../../components/custom-header';
import CustomText from '../../components/custom-text';
import FixedContainer from '../../components/fixed-container';
import Spinner from '../../components/spinner';
import {FONT_FAMILY, TABLE} from '../../constants/enum';
import {ImageProps} from '../../constants/types';
import {RootStackScreenProps} from '../../navigator/stacks';
import API from '../../services/api';
import {widthScale} from '../../styles/scaling-utils';
import {showMessage} from '../../utils';
import {getImageFromDevice} from '../../utils/image';

const AddCategory = (props: RootStackScreenProps<'AddCategory'>) => {
	const {navigation, route} = props;
	const category = route.params?.category;

	const [name, setName] = useState(category?.name || '');

	const onPressHandle = async () => {
		if (category) {
			Spinner.show();
			API.put(`${TABLE.CATEGORY_SERVICE}/${category.id}`, {name})
				.then(() => {
					showMessage('Sửa loại dịch vụ thành công!');
					navigation.goBack();
				})
				.finally(() => Spinner.hide());
		} else {
			Spinner.show();
			API.post(`${TABLE.CATEGORY_SERVICE}`, {name})
				.then(() => {
					showMessage('Thêm loại dịch vụ thành công!');
					navigation.goBack();
				})
				.finally(() => Spinner.hide());
		}
	};

	return (
		<FixedContainer>
			<CustomHeader title="THÊM LOẠI DỊCH VỤ" />

			<ScrollView style={styles.view}>
				<CustomText font={FONT_FAMILY.BOLD} text={'TÊN LOẠI DỊCH VỤ'} size={14} />
				<View style={styles.viewInput}>
					<TextInput value={name} onChangeText={setName} />
				</View>
			</ScrollView>

			<View style={{padding: widthScale(20)}}>
				<CustomButton disabled={!name.trim()} onPress={onPressHandle} text={category ? 'SỬA' : 'THÊM'} />
			</View>
		</FixedContainer>
	);
};

export default memo(AddCategory);
const styles = StyleSheet.create({
	view: {
		paddingHorizontal: widthScale(20),
	},
	viewInput: {
		width: '100%',
		borderRadius: 5,
		borderWidth: 1,
	},
});
