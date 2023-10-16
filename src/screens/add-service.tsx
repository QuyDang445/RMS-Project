import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {memo, useRef} from 'react';
import FixedContainer from '../components/fixed-container';
import CustomHeader from '../components/custom-header';
import {RootStackScreenProps} from '../navigator/stacks';
import CustomText from '../components/custom-text';
import {heightScale, widthScale} from '../styles/scaling-utils';
import ChooseCategoriesService from '../components/choose-categories-service';
import {ModalRefObject} from '../components/time-picker';
import {FONT_FAMILY} from '../constants/enum';
import {ICONS} from '../assets/image-paths';
import {colors} from '../styles/colors';
import CustomButton from '../components/custom-button';

const AddService = (props: RootStackScreenProps<'AddService'>) => {
	const {navigation} = props;

	const chooseCategoriesRef = useRef<ModalRefObject>(null);

	return (
		<FixedContainer>
			<CustomHeader title="THÊM DỊCH VỤ" />
			<ScrollView style={styles.view}>
				{/* CATEGORY  */}
				<CustomText font={FONT_FAMILY.BOLD} text={'LOẠI DỊCH VỤ'} size={14} />
				<TouchableOpacity
					onPress={() => chooseCategoriesRef.current?.show()}
					style={{
						borderWidth: 1,
						height: heightScale(50),
						justifyContent: 'center',
						borderRadius: 5,
						paddingLeft: widthScale(20),
						marginBottom: heightScale(20),
					}}>
					<CustomText text={'Chọn loại dịch vụ'} />
				</TouchableOpacity>

				{/* NAME  */}
				<CustomText font={FONT_FAMILY.BOLD} text={'TÊN DỊCH VỤ'} size={14} />
				<TextInput value={''} style={styles.input} />

				{/* IMAGE  */}
				<CustomText font={FONT_FAMILY.BOLD} text={'HÌNH ẢNH'} size={14} />
				<TouchableOpacity style={styles.uploadImage}>
					{false ? (
						<Image source={{uri: 'values.image'}} style={{flex: 1, width: '100%', height: '100%', resizeMode: 'contain'}} />
					) : (
						<Image source={ICONS.upload} style={styles.upload} />
					)}
				</TouchableOpacity>

				{/* DESCRIPTION  */}
				<CustomText font={FONT_FAMILY.BOLD} text={'MÔ TẢ'} size={14} />
				<View style={styles.viewInput}>
					<TextInput multiline />
				</View>
			</ScrollView>
			<View style={{padding: widthScale(20)}}>
				<CustomButton text="THÊM" />
			</View>
			<ChooseCategoriesService ref={chooseCategoriesRef} />
		</FixedContainer>
	);
};

export default memo(AddService);
const styles = StyleSheet.create({
	view: {
		paddingHorizontal: widthScale(20),
	},
	input: {
		height: heightScale(50),
		borderWidth: 1,
		borderRadius: 5,
		paddingLeft: widthScale(10),
		marginBottom: heightScale(20),
	},
	uploadImage: {
		width: widthScale(200),
		height: heightScale(100),
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: colors.black,
		borderWidth: 1,
		marginBottom: heightScale(20),
	},
	upload: {
		width: widthScale(25),
		height: widthScale(25),
	},
	viewInput: {
		width: '100%',
		borderRadius: 5,
		borderWidth: 1,
	},
});
