import {Formik, FormikProps} from 'formik';
import React, {memo, useRef} from 'react';
import {DeviceEventEmitter, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import * as Yup from 'yup';
import {ICONS, IMAGES} from '../assets/image-paths';
import CustomButton from '../components/custom-button';
import CustomCheckbox from '../components/custom-checkbox';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import ModalChooseProvince, {ModalObject} from '../components/sign-up/modal-choose-province';
import Spinner from '../components/spinner';
import {EMIT_EVENT, TABLE, TYPE_USER} from '../constants/enum';
import {UserProps} from '../constants/types';
import {RootStackScreenProps} from '../navigator/stacks';
import API from '../services/api';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';
import {AlertYesNo, showMessage} from '../utils';
import {getImageFromDevice, uploadImage} from '../utils/image';
import {pushNotificationAdminNewServicer} from '../utils/notification';

const SignUpServices = (props: RootStackScreenProps<'SignUpServices'>) => {
	const {navigation} = props;

	const modalChooseProvinceRef = useRef<ModalObject>(null);
	const innerRefFormik = useRef<FormikProps<any>>(null);

	const SignUpSchema = Yup.object().shape({
		name: Yup.string().required('Thiếu tên'),
		phone: Yup.string().required('Thiếu số điện thoại'),
		cccd: Yup.string().required('Thiếu căn cước công dân'),
		image: Yup.string().required('Thiếu hình ảnh căn cước công dân'),
		address: Yup.string().required('Thiếu địa chỉ'),
		pass: Yup.string().required('Thiếu mật khẩu'),
		rePass: Yup.string().oneOf([Yup.ref('pass')], 'Mật khẩu nhập lại không đúng'),
		isCheck: Yup.boolean().isTrue('Bạn chưa đồng ý điều khoản'),
	});

	const onChangeAddress = (text: string) => innerRefFormik.current?.setFieldValue('address', text);

	const onPressCccd = async () => {
		const image = await getImageFromDevice();
		if (image) {
			innerRefFormik.current?.setFieldValue('image', image.uri);
		}
	};

	const handleRegister = async (value: any) => {
		const allUser = (await API.get(`${TABLE.USERS}`, true)) as UserProps[];
		for (let i = 0; i < allUser.length; i++) {
			if (allUser[i].phone === value.phone) {
				return showMessage('Số điện thoại này đã được đăng ký');
			}
		}

		AlertYesNo('', 'Bạn đã kiểm tra kĩ thông tin?', async () => {
			Spinner.show();
			const imageCccd = await uploadImage(value.image);
			const body = {
				name: value.name,
				phone: value.phone,
				CCCD: {id: value.cccd, image: imageCccd},
				address: value.address,
				password: value.pass,
				avatar: 'https://assets.stickpng.com/images/585e4bcdcb11b227491c3396.png',
				type: TYPE_USER.SERVICER,
				isBlocked: false,
				isAccept: false,
				dateRegister: new Date().valueOf(),
			};
			const res = await API.post(`${TABLE.USERS}`, body);
			if (res) {
				await pushNotificationAdminNewServicer(res.id);
				showMessage('Đăng ký tài khoản thành công, vui lòng chờ đợi admin duyệt qua thông tin!');
				DeviceEventEmitter.emit(EMIT_EVENT.DATA_LOGIN, {phone: value.phone, password: value.pass});
				navigation.goBack();
			} else {
				showMessage('Đăng ký tài khoản thất bại, lỗi!');
			}
			Spinner.hide();
		});
	};

	return (
		<FixedContainer>
			<CustomHeader title="ĐĂNG KÝ TÀI KHOẢN" />
			<ScrollView>
				<Formik
					innerRef={innerRefFormik}
					validationSchema={SignUpSchema}
					validateOnChange={false}
					onSubmit={handleRegister}
					initialValues={{name: '', phone: '', cccd: '', image: '', address: '', pass: '', rePass: '', isCheck: false}}>
					{({handleChange, handleSubmit, values, errors, setFieldValue}) => {
						return (
							<>
								<Image source={IMAGES.LOGO} style={styles.logo} />
								<View style={styles.input}>
									<TextInput
										value={values.name}
										onChangeText={handleChange('name')}
										placeholder="Họ và tên"
										placeholderTextColor={colors.grayText}
										style={styles.inputText}
									/>
								</View>
								{errors.name && <CustomText text={errors.name} color={colors.red} size={12} style={{marginHorizontal: widthScale(20)}} />}

								<View style={styles.input}>
									<TextInput
										value={values.phone}
										onChangeText={handleChange('phone')}
										keyboardType={'numeric'}
										placeholder="Số điện thoại"
										placeholderTextColor={colors.grayText}
										style={styles.inputText}
									/>
								</View>
								{errors.phone && <CustomText text={errors.phone} color={colors.red} size={12} style={{marginHorizontal: widthScale(20)}} />}

								<View style={styles.input}>
									<TextInput
										value={values.cccd}
										onChangeText={handleChange('cccd')}
										placeholder="Căn cước công dân"
										placeholderTextColor={colors.grayText}
										style={styles.inputText}
									/>
								</View>
								{errors.cccd && <CustomText text={errors.cccd} color={colors.red} size={12} style={{marginHorizontal: widthScale(20)}} />}

								<TouchableOpacity onPress={onPressCccd} style={styles.uploadImage}>
									{values.image ? (
										<Image source={{uri: values.image}} style={{flex: 1, width: '100%', height: '100%', resizeMode: 'contain'}} />
									) : (
										<>
											<Image source={ICONS.upload} style={styles.upload} />
											<CustomText text={'Tải lên ảnh CCCD'} size={12} />
										</>
									)}
								</TouchableOpacity>
								{errors.image && <CustomText text={errors.image} color={colors.red} size={12} style={{marginHorizontal: widthScale(20)}} />}

								<TouchableOpacity onPress={() => modalChooseProvinceRef.current?.show({})} style={styles.buttonProvince}>
									<CustomText color={values.address ? colors.black : colors.grayText} text={values.address || 'Địa chỉ'} />
								</TouchableOpacity>
								{errors.address && (
									<CustomText text={errors.address} color={colors.red} size={12} style={{marginHorizontal: widthScale(20)}} />
								)}

								<View style={styles.input}>
									<TextInput
										value={values.pass}
										onChangeText={handleChange('pass')}
										placeholder="Mật khẩu"
										placeholderTextColor={colors.grayText}
										style={styles.inputText}
									/>
								</View>
								{errors.pass && <CustomText text={errors.pass} color={colors.red} size={12} style={{marginHorizontal: widthScale(20)}} />}

								<View style={styles.input}>
									<TextInput
										value={values.rePass}
										onChangeText={handleChange('rePass')}
										placeholder="Nhập lại mật khẩu"
										placeholderTextColor={colors.grayText}
										style={styles.inputText}
									/>
								</View>
								{errors.rePass && <CustomText text={errors.rePass} color={colors.red} size={12} style={{marginHorizontal: widthScale(20)}} />}

								<CustomCheckbox
									onPress={() => setFieldValue('isCheck', !values.isCheck)}
									isCheck={values.isCheck}
									style={styles.viewCheck}
									text={'Tôi đồng ý với Điều Khoản Sử Dụng'}
								/>
								{errors.isCheck && (
									<CustomText text={errors.isCheck} color={colors.red} size={12} style={{marginHorizontal: widthScale(20)}} />
								)}

								<View style={{alignSelf: 'center', marginBottom: heightScale(20)}}>
									<CustomButton onPress={handleSubmit} text="ĐĂNG KÝ" style={styles.button} />
								</View>
							</>
						);
					}}
				</Formik>
			</ScrollView>
			<ModalChooseProvince ref={modalChooseProvinceRef} onPressSave={onChangeAddress} />
		</FixedContainer>
	);
};

export default memo(SignUpServices);
const styles = StyleSheet.create({
	input: {
		marginHorizontal: widthScale(20),
		borderRadius: 10,
		borderWidth: 1,
		borderColor: colors.blackGray,
		marginTop: heightScale(40),
		height: heightScale(50),
	},
	inputText: {
		color: colors.black,
		paddingLeft: widthScale(5),
	},
	logo: {
		width: widthScale(100),
		height: widthScale(100),
		marginTop: heightScale(10),
		alignSelf: 'center',
	},
	upload: {
		width: widthScale(25),
		height: widthScale(25),
	},
	uploadImage: {
		alignSelf: 'center',
		width: widthScale(200),
		height: heightScale(100),
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: colors.black,
		borderWidth: 1,
		marginTop: heightScale(40),
	},
	buttonProvince: {
		marginHorizontal: widthScale(20),
		borderRadius: 10,
		borderWidth: 1,
		borderColor: colors.blackGray,
		marginTop: heightScale(40),
		height: heightScale(50),
		alignItems: 'center',
		flexDirection: 'row',
		paddingLeft: widthScale(5),
	},
	viewCheck: {
		marginHorizontal: widthScale(20),
		marginTop: heightScale(10),
	},
	button: {
		width: widthScale(150),
		marginTop: heightScale(100),
	},
});
