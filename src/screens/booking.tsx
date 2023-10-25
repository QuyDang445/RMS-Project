import axios from 'axios';
import moment from 'moment';
import React, {useRef, useState} from 'react';
import {Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../assets/image-paths';
import CustomButton from '../components/custom-button';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import Spinner from '../components/spinner';
import TimePicker, {ModalRefObject} from '../components/time-picker';
import {FONT_FAMILY, TABLE, TYPE_ORDER_SERVICE} from '../constants/enum';
import {ImageProps} from '../constants/types';
import {ROUTE_KEY} from '../navigator/routers';
import {RootStackScreenProps} from '../navigator/stacks';
import API from '../services/api';
import {useAppSelector} from '../stores/store/storeHooks';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';
import {AlertYesNo, generateRandomId, getLocationMyDevice, showMessage} from '../utils';
import {getImageFromDevice, uploadImage} from '../utils/image';
import {pushNotificationToServiceNewOrder} from '../utils/notification';

const Booking = (props: RootStackScreenProps<'Booking'>) => {
	const {navigation, route} = props;
	const service = route.params?.service;

	const timeRef = useRef<ModalRefObject>(null);

	const userInfo = useAppSelector(state => state.userInfoReducer.userInfo);

	const [name, setName] = useState(userInfo?.name);
	const [phone, setPhone] = useState(userInfo?.phone);
	const [address, setAddress] = useState('');
	const [date, setDate] = useState(new Date().valueOf());
	const [description, setDescription] = useState('');
	const [images, setImages] = useState<ImageProps[]>([]);

	const onPressGetMyAddress = async () => {
		Spinner.show();
		const location = await getLocationMyDevice();
		if (location) {
			const result = await axios.get(
				`https://api.opencagedata.com/geocode/v1/json?q=${location.lat}+${location.long}&key=${'8cbc638bd870448c9a0c9a120321f330'}`,
			);

			const address = result?.data?.results?.[0]?.formatted;

			if (address) {
				setAddress(address);
			} else {
				showMessage('Không có thông tin địa chỉ!');
			}
		} else {
			showMessage('Không có thông tin địa chỉ!');
		}
		Spinner.hide();
	};

	const onPressChooseAddress = () => navigation.navigate(ROUTE_KEY.ListAddress, {onChoose: (newAddress: string) => setAddress(newAddress)});

	const onPressOrder = () => {
		AlertYesNo(undefined, 'Bạn đã kiểm tra kĩ thông tin?', async () => {
			Spinner.show();
			const arrImage = [];

			for (let i = 0; i < images.length; i++) {
				const urlImage = await uploadImage(images[i]?.uri!);
				arrImage.push(urlImage);
			}

			const body = {
				address: address,
				description: description,
				idService: service.id,
				idUser: userInfo?.id,
				images: arrImage,
				nameUser: name,
				phone: phone,
				status: TYPE_ORDER_SERVICE.OrderPending,
				time: date.valueOf(),
				timeBooking: new Date().valueOf(),
			};

			API.post(`${TABLE.ORDERS}`, body)
				.then((res: any) => {
					showMessage('Tạo đơn đặt hàng thành công!');
					pushNotificationToServiceNewOrder(service.id, userInfo?.id!, res?.name!);
					navigation.goBack();
				})
				.finally(() => Spinner.hide());
		});
	};

	return (
		<FixedContainer>
			<CustomHeader title="ĐẶT LỊCH" />
			<CustomText style={{textAlign: 'center'}} text={service.name} font={FONT_FAMILY.BOLD} />

			<ScrollView style={styles.view}>
				{/* NAME  */}
				<View style={styles.viewInput}>
					<CustomText text={'TÊN KHÁCH HÀNG'} font={FONT_FAMILY.BOLD} />
					<TextInput onChangeText={setName} value={name} style={styles.input} />
				</View>

				{/* PHONE  */}
				<View style={styles.viewInput}>
					<CustomText text={'SỐ ĐIỆN THOẠI'} font={FONT_FAMILY.BOLD} />
					<TextInput onChangeText={setPhone} value={phone} keyboardType={'numeric'} style={styles.input} />
				</View>

				{/* ADDRESS  */}
				<View style={styles.viewInput}>
					<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
						<CustomText text={'ĐỊA CHỈ'} font={FONT_FAMILY.BOLD} />
						<View style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
							<TouchableOpacity onPress={onPressGetMyAddress}>
								<CustomText font={FONT_FAMILY.BOLD} size={12} text={'Sử dụng vị trí hiện tại'} />
							</TouchableOpacity>
							<CustomText font={FONT_FAMILY.BOLD} size={12} text={' | '} />
							<TouchableOpacity onPress={onPressChooseAddress}>
								<CustomText font={FONT_FAMILY.BOLD} size={12} text={'Chọn địa chỉ'} />
							</TouchableOpacity>
						</View>
					</View>
					<TextInput multiline value={address} editable={false} style={styles.inputAddress} />
				</View>

				{/* DATE  */}
				<View style={styles.viewInput}>
					<CustomText text={'NGÀY ĐẶT LỊCH'} font={FONT_FAMILY.BOLD} />
					<TouchableOpacity
						onPress={() => {
							timeRef.current?.show();
						}}>
						<TextInput editable={false} value={moment(date).format('DD/MM/YYYY')} keyboardType={'numeric'} style={styles.input} />
					</TouchableOpacity>
				</View>

				{/* TIME  */}
				<View style={styles.viewInput}>
					<CustomText text={'GIỜ ĐẶT LỊCH'} font={FONT_FAMILY.BOLD} />
					<TouchableOpacity
						onPress={() => {
							timeRef.current?.show(true);
						}}>
						<TextInput editable={false} value={moment(date).format('hh:mm')} keyboardType={'numeric'} style={styles.input} />
					</TouchableOpacity>
				</View>

				{/* DESCRIPTION  */}
				<View style={styles.viewInput}>
					<CustomText text={'MÔ TẢ VẤN ĐỀ'} font={FONT_FAMILY.BOLD} />
					<TextInput value={description} onChangeText={setDescription} multiline style={styles.inputDescription} />
				</View>

				{/* IMAGES  */}
				<View style={styles.viewInput}>
					<CustomText text={'CÁC HÌNH ẢNH'} font={FONT_FAMILY.BOLD} />
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<TouchableOpacity
							onPress={async () => {
								const newImages = await getImageFromDevice(10);
								newImages?.length && setImages([...images, ...newImages]);
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
							<Image style={{width: 50, height: 50}} source={ICONS.camera} />
						</TouchableOpacity>
						<ScrollView showsHorizontalScrollIndicator={false} style={{marginVertical: heightScale(20)}} horizontal>
							{images.map((item, index) => (
								<View style={{marginRight: widthScale(15)}} key={generateRandomId()}>
									<TouchableOpacity
										onPress={() => {
											const newImages = [...images];
											newImages.splice(index, 1);
											setImages(newImages);
										}}
										activeOpacity={0.5}
										style={{
											position: 'absolute',
											zIndex: 100,
											width: widthScale(25),
											height: widthScale(25),
											backgroundColor: colors.white,
											borderRadius: 100,
											justifyContent: 'center',
											alignItems: 'center',
											right: 0,
											shadowColor: '#000',
											shadowOffset: {width: 0, height: 2},
											shadowOpacity: 0.25,
											shadowRadius: 3.84,
											elevation: 5,
										}}>
										<Image style={{width: widthScale(20), height: widthScale(20)}} source={ICONS.delete} />
									</TouchableOpacity>
									<Image style={{width: widthScale(100), height: widthScale(100), borderRadius: 5}} source={{uri: item.uri}} />
								</View>
							))}
						</ScrollView>
					</View>
				</View>
			</ScrollView>
			<View style={{padding: widthScale(20)}}>
				<CustomButton onPress={onPressOrder} disabled={!name || !phone || !address || !date || !description || !images.length} text="ĐẶT LỊCH" />
			</View>
			<TimePicker
				date={new Date()}
				maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
				minimumDate={new Date()}
				title="CHỌN NGÀY ĐẶT LỊCH"
				ref={timeRef}
				onConfirm={newDate => setDate(newDate.valueOf())}
			/>
		</FixedContainer>
	);
};

export default Booking;
const styles = StyleSheet.create({
	view: {
		paddingHorizontal: widthScale(20),
	},
	input: {
		height: heightScale(45),
		borderRadius: 10,
		borderWidth: 1,
		marginTop: heightScale(5),
		paddingHorizontal: widthScale(10),
		borderColor: colors.grayLine,
		color: colors.black,
	},
	viewInput: {
		marginTop: heightScale(20),
	},
	inputDescription: {
		height: heightScale(100),
		borderRadius: 10,
		borderWidth: 1,
		marginTop: heightScale(5),
		paddingHorizontal: widthScale(10),
		borderColor: colors.grayLine,
		color: colors.black,
	},
	inputAddress: {
		minHeight: heightScale(45),
		borderRadius: 10,
		borderWidth: 1,
		marginTop: heightScale(5),
		paddingHorizontal: widthScale(10),
		borderColor: colors.grayLine,
		color: colors.black,
	},
});
