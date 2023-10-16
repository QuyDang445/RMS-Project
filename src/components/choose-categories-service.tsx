import React, {forwardRef, memo, Ref, useImperativeHandle, useState} from 'react';
import {Modal, Pressable, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {FONT_FAMILY} from '../constants/enum';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';
import CustomText from './custom-text';
import {ModalObject} from './sign-up/modal-choose-province';

interface Props {}
const ChooseCategoriesService = forwardRef((props: Props, ref: Ref<ModalObject>) => {
	const [visible, setVisible] = useState(false);

	const show = () => {
		setVisible(true);
	};

	const hide = () => {
		setVisible(false);
	};

	useImperativeHandle(ref, () => ({show, hide}), []);

	return (
		<Modal statusBarTranslucent transparent onDismiss={hide} onRequestClose={hide} visible={visible}>
			<Pressable onPress={hide} style={styles.view}>
				<Pressable style={styles.content}>
					<CustomText font={FONT_FAMILY.BOLD} text={'Hãy chọn loại dịch vụ'} style={{alignSelf: 'center'}} />

					<ScrollView style={{paddingHorizontal: widthScale(20), marginTop: heightScale(20)}}>
						{[1, 1, 1, 1, 1, 1, 1, 1].map(() => (
							<TouchableOpacity
								style={{
									paddingVertical: heightScale(10),
									backgroundColor: colors.gray,
									justifyContent: 'center',
									marginBottom: heightScale(10),
									paddingLeft: widthScale(10),
									borderRadius: 5,
								}}>
								<CustomText font={FONT_FAMILY.BOLD} text={'Hãy chọn loại dịch vụ'} />
							</TouchableOpacity>
						))}
					</ScrollView>
				</Pressable>
			</Pressable>
		</Modal>
	);
});

export default memo(ChooseCategoriesService);
const styles = StyleSheet.create({
	view: {
		width: '100%',
		height: '100%',
		backgroundColor: colors.backgroundModal,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		width: widthScale(300),
		height: heightScale(500),
		backgroundColor: colors.white,
		borderRadius: 10,
		paddingTop: heightScale(10),
	},
});
