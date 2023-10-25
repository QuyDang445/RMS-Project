import moment from 'moment';
import React, {memo, useEffect, useState} from 'react';
import {FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../assets/image-paths';
import CustomButton from '../components/custom-button';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import LoadingScreen from '../components/loading-screen';
import Spinner from '../components/spinner';
import {WIDTH} from '../constants/constants';
import {FONT_FAMILY, TABLE, TYPE_ORDER_SERVICE, TYPE_USER} from '../constants/enum';
import {RootStackScreenProps} from '../navigator/stacks';
import API from '../services/api';
import {useAppSelector} from '../stores/store/storeHooks';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';
import {AlertYesNo, generateRandomId, getColorStatusOrder, getStatusOrder, showMessage} from '../utils';
import {pushNotificationToServiceCancelOrder} from '../utils/notification';

const DetailOrder = (props: RootStackScreenProps<'DetailOrder'>) => {
	const {navigation, route} = props;

	const userInfo = useAppSelector(state => state.userInfoReducer.userInfo);

	const [data, setData] = useState(route.params.data);

	const [visibleCancel, setVisibleCancel] = useState(false);

	const [modalConfirmDone, setModalConfirmDone] = useState(false);
	const [loading, setLoading] = useState(false);

	const [reasonCancel, setReasonCancel] = useState('');

	const getDataCategory = () => API.get(`${TABLE.CATEGORY}/${data.serviceObject.category}`) as any;

	const getDataEvaluate = async () => {};

	const getDataUser = () => API.get(`${TABLE.USERS}/${data.idUser}`) as any;

	const getData = async () => {
		setLoading(true);
		const category = await getDataCategory();
		const evaluate = await getDataEvaluate();
		const dataUser = await getDataUser();

		setData({...data, categoryObject: category, userObject: dataUser});
		setLoading(false);
	};

	useEffect(() => {
		getData();
	}, []);

	const onPressCancel = async () => {
		switch (userInfo?.type) {
			case TYPE_USER.USER:
				AlertYesNo(undefined, 'Bạn chắc chắn muốn huỷ?', async () => {
					Spinner.show();
					API.get(`${TABLE.ORDERS}/${data.id}`)
						.then(async (newData: any) => {
							if (newData?.status === TYPE_ORDER_SERVICE.OrderPending) {
								await API.put(`${TABLE.ORDERS}/${data.id}`, {
									...newData,
									status: TYPE_ORDER_SERVICE.OrderCanceled,
									statusCancel: reasonCancel,
								}).then(() => {
									pushNotificationToServiceCancelOrder(data.idService, userInfo.id, data.id);
									showMessage('Huỷ đơn hàng thành công!');
									navigation.goBack();
								});
							} else {
								showMessage('Không thể huỷ!');
							}
						})
						.finally(() => Spinner.hide());
				});
				break;

			case TYPE_USER.SERVICER:
				break;
		}
	};

	if (loading) {
		return <LoadingScreen />;
	}

	return (
		<FixedContainer>
			<CustomHeader title="CHI TIẾT ĐƠN HÀNG" />
			<ScrollView style={styles.view}>
				<View style={styles.viewTop}>
					<Image source={{uri: data.serviceObject.image}} style={styles.image} />
					<View style={{flex: 1, justifyContent: 'center', marginLeft: widthScale(30)}}>
						<CustomText text={data.categoryObject?.name} />
						<CustomText text={data.serviceObject?.name} font={FONT_FAMILY.BOLD} />
					</View>
				</View>

				<View style={{marginVertical: heightScale(20), flexDirection: 'row'}}>
					<Image source={{uri: data.servicerObject.avatar}} style={{width: widthScale(50), height: widthScale(50), borderRadius: 100}} />
					<View style={{flex: 1, marginLeft: widthScale(10)}}>
						<CustomText text={data.servicerObject?.name} font={FONT_FAMILY.BOLD} />
						<CustomText text={data.servicerObject.phone} />
					</View>
				</View>

				<View style={styles.viewInfo}>
					<CustomText font={FONT_FAMILY.BOLD} text={'TRẠNG THÁI'} />
					<CustomText
						font={data.status === TYPE_ORDER_SERVICE.OrderCanceled ? FONT_FAMILY.BOLD : undefined}
						color={getColorStatusOrder(data.status)}
						text={getStatusOrder(data.status)}
					/>
				</View>

				{data.status === TYPE_ORDER_SERVICE.OrderCanceled && (
					<View style={styles.viewInfo}>
						<CustomText font={FONT_FAMILY.BOLD} text={'LÍ DO'} />
						<CustomText style={{width: widthScale(260)}} color="red" text={`${data?.statusCancel}${data?.statusCancel}${data?.statusCancel}`} />
					</View>
				)}

				<View style={styles.viewInfo}>
					<CustomText font={FONT_FAMILY.BOLD} text={'THỜI GIAN ĐẶT LỊCH'} />
					<CustomText text={moment(data?.timeBooking).format('hh:mm - DD/MM/YYYY')} />
				</View>

				<View style={styles.viewInfo}>
					<CustomText font={FONT_FAMILY.BOLD} text={'LỊCH HẸN'} />
					<CustomText text={moment(data?.time).format('hh:mm - DD/MM/YYYY')} />
				</View>

				<View style={{marginTop: heightScale(15)}}>
					<CustomText font={FONT_FAMILY.BOLD} text={'ĐỊA CHỈ'} />
					<View style={{padding: 10, borderWidth: 1, borderRadius: 5, marginTop: heightScale(5)}}>
						<CustomText text={data?.userObject?.name} />
						<CustomText text={data?.userObject?.phone} />
						<CustomText text={data?.address} />
					</View>
				</View>

				<View style={{marginTop: heightScale(15)}}>
					<CustomText font={FONT_FAMILY.BOLD} text={'MÔ TẢ'} />
					<View style={{padding: 10, marginTop: heightScale(5)}}>
						<CustomText text={data?.description} />
					</View>
				</View>

				<ScrollView horizontal>
					{data?.images?.map(item => (
						<Image key={generateRandomId()} style={styles.imageReview} source={{uri: item}} />
					))}
				</ScrollView>

				{/* SERVICER */}
				{userInfo?.type === TYPE_USER.SERVICER && (
					<View style={{flexDirection: 'row', padding: 20, justifyContent: 'space-between'}}>
						<CustomButton onPress={() => setVisibleCancel(true)} text="HUỶ" style={{width: WIDTH / 2.8}} />
						<CustomButton text="XÁC NHẬN" style={{width: WIDTH / 2.8}} />
					</View>
				)}

				{/* USER */}
				{userInfo?.type === TYPE_USER.USER && data.status !== TYPE_ORDER_SERVICE.OrderCanceled && (
					<View style={{alignItems: 'center', width: '100%', marginTop: heightScale(20)}}>
						<CustomButton onPress={() => setVisibleCancel(true)} text="HUỶ" style={{width: WIDTH / 3}} />
					</View>
				)}
			</ScrollView>

			{/* CANCEL  */}
			<Modal
				statusBarTranslucent
				transparent
				onDismiss={() => setVisibleCancel(false)}
				onRequestClose={() => setVisibleCancel(false)}
				visible={visibleCancel}>
				<Pressable onPress={() => setVisibleCancel(false)} style={styles.viewModal}>
					<Pressable style={styles.content}>
						<ScrollView>
							<CustomText font={FONT_FAMILY.BOLD} text={'HUỶ ĐƠN HÀNG'} style={{alignSelf: 'center'}} />
							<View style={{padding: widthScale(20)}}>
								<CustomText font={FONT_FAMILY.BOLD} text={'NHẬP LÝ DO'} size={14} />
								<View style={styles.viewInput}>
									<TextInput value={reasonCancel} onChangeText={setReasonCancel} multiline />
								</View>
							</View>
						</ScrollView>
						<View style={styles.viewButton1}>
							<CustomButton onPress={() => setVisibleCancel(false)} text="HUỶ" style={{width: WIDTH / 3}} />
							<CustomButton disabled={!reasonCancel.trim()} onPress={onPressCancel} text="XÁC NHẬN" style={{width: WIDTH / 3}} />
						</View>
					</Pressable>
				</Pressable>
			</Modal>

			{/* DONE SERVICE  */}
			<Modal
				animationType="fade"
				statusBarTranslucent
				transparent
				onDismiss={() => setModalConfirmDone(false)}
				onRequestClose={() => setModalConfirmDone(false)}
				visible={modalConfirmDone}>
				<Pressable onPress={() => setModalConfirmDone(false)} style={styles.viewModal}>
					<Pressable style={styles.content}>
						<ScrollView>
							<CustomText font={FONT_FAMILY.BOLD} text={'Cung cấp kết quả'} style={{alignSelf: 'center'}} />
							<View style={{padding: widthScale(20)}}>
								<CustomText text={'Vui lòng tải lên hình ảnh kết quả để đối chiếu khi có vấn đề phát sinh'} size={14} />

								<FlatList
									scrollEnabled={false}
									renderItem={({item, index}) => {
										if (index === 0) {
											return (
												<TouchableOpacity
													style={{
														width: widthScale(80),
														height: widthScale(80),
														borderRadius: 5,
														justifyContent: 'center',
														alignItems: 'center',
														borderWidth: 1,
													}}>
													<Image style={{width: widthScale(25), height: widthScale(25)}} source={ICONS.camera} />
												</TouchableOpacity>
											);
										} else {
											return <View style={{width: widthScale(80), height: widthScale(80), backgroundColor: 'red', borderRadius: 5}} />;
										}
									}}
									numColumns={3}
									columnWrapperStyle={{justifyContent: 'space-between', marginBottom: heightScale(10)}}
									data={[1, 1, 1, 1, 1, 1, 1, 1, 1]}
								/>
							</View>
						</ScrollView>
						<View style={styles.viewButton}>
							<CustomButton onPress={() => setModalConfirmDone(false)} text="HUỶ" style={{width: WIDTH / 3}} />
							<CustomButton onPress={() => {}} text="XÁC NHẬN" style={{width: WIDTH / 3}} />
						</View>
					</Pressable>
				</Pressable>
			</Modal>
		</FixedContainer>
	);
};

export default memo(DetailOrder);
const styles = StyleSheet.create({
	image: {
		width: widthScale(140),
		height: widthScale(100),
		borderRadius: 10,
	},
	viewTop: {
		flexDirection: 'row',
	},
	view: {
		paddingHorizontal: widthScale(20),
	},
	viewInfo: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: heightScale(10),
	},
	imageReview: {
		width: widthScale(140),
		height: widthScale(100),
		marginRight: widthScale(10),
		borderRadius: 5,
	},
	viewModal: {
		width: '100%',
		height: '100%',
		backgroundColor: colors.backgroundModal,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		width: widthScale(300),
		height: heightScale(400),
		backgroundColor: colors.white,
		borderRadius: 10,
		paddingTop: heightScale(10),
	},
	viewInput: {
		width: '100%',
		borderRadius: 5,
		borderWidth: 1,
		maxHeight: heightScale(200),
	},
	viewButton: {
		flexDirection: 'row',
		paddingHorizontal: widthScale(15),
		justifyContent: 'space-between',
		paddingBottom: heightScale(15),
	},
	viewButton1: {
		flexDirection: 'row',
		paddingHorizontal: widthScale(15),
		justifyContent: 'space-between',
		paddingBottom: heightScale(15),
	},
});
