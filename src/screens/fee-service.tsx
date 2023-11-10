import React, {useState} from 'react';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../assets/image-paths';
import CustomButton from '../components/custom-button';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import Spinner from '../components/spinner';
import {FONT_FAMILY, TABLE} from '../constants/enum';
import {ImageProps, PaymentServicer} from '../constants/types';
import {RootStackScreenProps} from '../navigator/stacks';
import API from '../services/api';
import {useAppSelector} from '../stores/store/storeHooks';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';
import {AlertYesNo, showMessage} from '../utils';
import {getImageFromDevice, uploadImage} from '../utils/image';
import {pushNotificationAdminNewPayment} from '../utils/notification';

const FeeService = (props: RootStackScreenProps<'FeeService'>) => {
	const {navigation} = props;

	const userInfo = useAppSelector(state => state.userInfoReducer.userInfo);

	const [modal, setModal] = useState(false);

	const [image, setImage] = useState<ImageProps>();

	const handlePayment = async () => {
		if (image) {
			Spinner.show();
			const img = await uploadImage(image?.uri);
			API.post(`${TABLE.PAYMENT_FEE_SERVICE}/${userInfo?.id}`, {
				date: new Date().valueOf(),
				idServicer: userInfo?.id,
				image: img,
			})
				.then(async res => {
					await pushNotificationAdminNewPayment(userInfo?.id!, res.id, userInfo?.name!);
					showMessage('Thanh toán thành công, chờ admin xác nhận! ');
					navigation.goBack();
				})
				.finally(() => Spinner.hide());
		}
	};

	return (
		<FixedContainer>
			<CustomHeader title={`THANH TOÁN PHÍ DỊCH VỤ THÁNG ${new Date().getMonth() + 1}`} />

			<TouchableOpacity
				onPress={() => setModal(true)}
				style={{backgroundColor: 'red', borderRadius: 5, alignSelf: 'flex-end', padding: 5, marginHorizontal: 20}}>
				<CustomText font={FONT_FAMILY.BOLD} text={'CHUYỂN TIỀN'} />
			</TouchableOpacity>

			<CustomText text={'Phí: 50.000 VND/Tháng'} style={{textAlign: 'center', paddingVertical: heightScale(10)}} />
			<View style={{width: '100%', height: 1, backgroundColor: colors.black}} />

			<CustomText font={FONT_FAMILY.BOLD} text={'NGÂN HÀNG'} style={{textAlign: 'center', paddingVertical: heightScale(10)}} />
			<View style={{width: '100%', height: 1, backgroundColor: colors.black}} />
			<View style={{marginLeft: widthScale(40)}}>
				<CustomText text={'STK: 7475757'} style={{paddingVertical: heightScale(10)}} />
				<CustomText text={'Ngân hàng: 7475757'} style={{paddingVertical: heightScale(10)}} />
				<CustomText text={'Chủ thẻ: 7475757'} style={{paddingVertical: heightScale(10)}} />
				<CustomText text={'Nội dung: 7475757'} style={{paddingVertical: heightScale(10)}} />
			</View>
			<Modal
				statusBarTranslucent
				onDismiss={() => setModal(false)}
				onRequestClose={() => setModal(false)}
				transparent
				animationType="fade"
				visible={modal}>
				<View style={{backgroundColor: colors.backgroundModal, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
					<View
						style={{
							width: widthScale(300),
							height: heightScale(400),
							backgroundColor: colors.white,
							borderRadius: 8,
							padding: widthScale(10),
							justifyContent: 'space-between',
							alignItems: 'center',
						}}>
						<CustomText text={'Tải lên hình ảnh xác nhận chuyển tiền'} />

						<TouchableOpacity
							onPress={async () => {
								const newImg = await getImageFromDevice();
								newImg && setImage(newImg);
							}}
							style={{
								width: widthScale(150),
								height: heightScale(200),
								borderRadius: 10,
								borderWidth: 1,
								alignSelf: 'center',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							{image ? (
								<Image source={{uri: image.uri}} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
							) : (
								<Image style={{width: widthScale(25), height: widthScale(25)}} source={ICONS.camera} />
							)}
						</TouchableOpacity>
						<CustomButton onPress={handlePayment} style={{width: widthScale(100), alignSelf: 'center'}} text="Xác nhận" />
					</View>
				</View>
			</Modal>
		</FixedContainer>
	);
};

export default FeeService;
const styles = StyleSheet.create({});
