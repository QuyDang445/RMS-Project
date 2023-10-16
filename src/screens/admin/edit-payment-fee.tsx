import React, {memo} from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import CustomButton from '../../components/custom-button';
import CustomHeader from '../../components/custom-header';
import CustomText from '../../components/custom-text';
import FixedContainer from '../../components/fixed-container';
import {FONT_FAMILY} from '../../constants/enum';
import {RootStackScreenProps} from '../../navigator/stacks';
import {widthScale} from '../../styles/scaling-utils';

const EditPaymentFee = (props: RootStackScreenProps<'EditPaymentFee'>) => {
	const {navigation, route} = props;

	return (
		<FixedContainer>
			<CustomHeader title="CHỈNH SỬA PHÍ DỊCH VỤ" />

			<ScrollView style={styles.view}>
				<CustomText font={FONT_FAMILY.BOLD} text={'PHÍ DỊCH VỤ'} size={14} />
				<View style={styles.viewInput}>
					<TextInput keyboardType="numeric" />
				</View>
			</ScrollView>

			<View style={{padding: widthScale(20)}}>
				<CustomButton text="CẬP NHẬT" />
			</View>
		</FixedContainer>
	);
};

export default memo(EditPaymentFee);
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
