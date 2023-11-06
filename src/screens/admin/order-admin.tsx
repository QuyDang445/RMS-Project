import {createMaterialTopTabNavigator, MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {DeviceEventEmitter, Image, RefreshControl, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../../assets/image-paths';
import CustomHeader from '../../components/custom-header';
import CustomText from '../../components/custom-text';
import FixedContainer from '../../components/fixed-container';
import Spinner from '../../components/spinner';
import {EMIT_EVENT, FONT_FAMILY, TABLE} from '../../constants/enum';
import {Category as CategoryType, CategoryService} from '../../constants/types';
import {RootStackScreensParams} from '../../navigator/params';
import {ROUTE_KEY} from '../../navigator/routers';
import {RootStackScreenProps} from '../../navigator/stacks';
import API from '../../services/api';
import {colors} from '../../styles/colors';
import {heightScale, widthScale} from '../../styles/scaling-utils';
import {AlertYesNo, generateRandomId, showMessage} from '../../utils';

const Tab = createMaterialTopTabNavigator();

const OrderAdmin = (props: RootStackScreenProps<'Order'>) => {
	const {navigation} = props;
	const [isCategory, setIsCategory] = useState(true);

	useEffect(() => {
		const sub = DeviceEventEmitter.addListener(EMIT_EVENT.CHECK_SCREEN_ORDER, (category: boolean) => {
			setIsCategory(category);
		});
		return () => sub.remove();
	}, []);

	const renderTapBarItem = useCallback(
		(props: MaterialTopTabBarProps) => (
			<View style={styles.viewTab}>
				{props.state.routes.map((item, index) => (
					<TouchableOpacity
						key={index}
						onPress={() => {
							props.navigation.navigate(item);
						}}
						style={{justifyContent: 'center', alignItems: 'center', paddingHorizontal: widthScale(10), flex: 1}}>
						<CustomText
							color={props.state?.index === index ? colors.appColor : colors.grayText}
							text={item.name}
							font={props.state?.index === index ? FONT_FAMILY.BOLD : undefined}
						/>
					</TouchableOpacity>
				))}
			</View>
		),
		[],
	);

	const onPressAdd = () => {
		if (isCategory) {
			navigation.navigate(ROUTE_KEY.AddCategory);
		} else {
			navigation.navigate(ROUTE_KEY.AddServiceCategory);
		}
	};

	return (
		<FixedContainer>
			<CustomHeader
				title="QUẢN LÝ LOẠI DỊCH VỤ"
				hideBack
				rightContent={
					<TouchableOpacity onPress={onPressAdd}>
						<Image style={styles.icon} source={ICONS.add} />
					</TouchableOpacity>
				}
			/>
			<Tab.Navigator screenOptions={{lazy: true, swipeEnabled: false}} tabBar={renderTapBarItem}>
				<Tab.Screen key={'Category'} name={'LOẠI DỊCH VỤ'} component={Category} />
				<Tab.Screen key={'ServiceCategory'} name={'DỊCH VỤ'} component={ServiceCategory} />
			</Tab.Navigator>
		</FixedContainer>
	);
};

export default memo(OrderAdmin);

const Category = memo(() => {
	const navigation = useNavigation<NavigationProp<RootStackScreensParams>>();

	const [refreshing, setRefreshing] = useState(false);
	const [data, setData] = useState<CategoryService[]>([]);

	useFocusEffect(
		useCallback(() => {
			DeviceEventEmitter.emit(EMIT_EVENT.CHECK_SCREEN_ORDER, true);
			onRefresh();
		}, []),
	);

	const onRefresh = async () => {
		setRefreshing(true);
		const res = (await API.get(`${TABLE.CATEGORY_SERVICE}`, true)) as CategoryService[];
		setData(res);
		setRefreshing(false);
	};

	const onPressHandleDelete = async (item: CategoryService) => {
		Spinner.show();
		const result = (await API.get(`${TABLE.CATEGORY}`, true)) as CategoryType[];
		Spinner.hide();

		let check = false;
		for (let i = 0; i < result.length; i++) {
			result[i].idCategoryService === item.id && (check = true);
		}

		if (check) {
			showMessage('Không thể xoá, vì đang có loại dịch vụ trùng!');
		} else {
			AlertYesNo(undefined, 'Bạn chắc chắn muốn xoá?', async () => {
				Spinner.show();
				API.put(`${TABLE.CATEGORY_SERVICE}/${item.id}`, {})
					.then(() => {
						showMessage('Xoá thành công!');
						onRefresh();
					})
					.finally(() => Spinner.hide());
			});
		}
	};

	const onPressEdit = (item: CategoryService) => {
		navigation.navigate(ROUTE_KEY.AddCategory, {category: item});
	};

	return (
		<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={styles.view}>
			<View style={styles.viewInput}>
				<Image source={ICONS.search} style={styles.iconSearch} />
				<TextInput placeholder="Tìm kiếm" style={styles.input} />
			</View>

			{data.map(item => (
				<View style={styles.itemCategory} key={generateRandomId()}>
					<CustomText font={FONT_FAMILY.BOLD} text={item.name} />
					<View style={{flexDirection: 'row', gap: widthScale(10)}}>
						<TouchableOpacity onPress={() => onPressEdit(item)}>
							<Image style={styles.icon} source={ICONS.edit} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => onPressHandleDelete(item)}>
							<Image style={styles.icon} source={ICONS.delete} />
						</TouchableOpacity>
					</View>
				</View>
			))}
		</ScrollView>
	);
});

const ServiceCategory = memo(() => {
	const navigation = useNavigation<NavigationProp<RootStackScreensParams>>();

	const [refreshing, setRefreshing] = useState(false);
	const [data, setData] = useState<CategoryType[]>([]);

	useFocusEffect(
		useCallback(() => {
			DeviceEventEmitter.emit(EMIT_EVENT.CHECK_SCREEN_ORDER, false);
			onRefresh();
		}, []),
	);

	const getNameType = async (id: string) => {
		const res = (await API.get(`${TABLE.CATEGORY_SERVICE}/${id}`)) as any;
		return res?.name;
	};

	const onRefresh = async () => {
		setRefreshing(true);
		const result = (await API.get(`${TABLE.CATEGORY}`, true)) as CategoryType[];

		for (let i = 0; i < result.length; i++) {
			result[i].type = await getNameType(result[i].idCategoryService);
		}

		setData(result);
		setRefreshing(false);
	};

	const onPressDelete = (item: CategoryType) => {
		AlertYesNo(undefined, 'Bạn chắc chắn muốn xoá ?', async () => {
			Spinner.show();
			API.put(`${TABLE.CATEGORY}/${item.id}`, {})
				.then(() => {
					showMessage('Xoá thành công!');
					onRefresh();
				})
				.finally(() => Spinner.hide());
		});
	};

	const onPressEdit = (item: CategoryType) => {
		navigation.navigate(ROUTE_KEY.AddServiceCategory, {categoryService: item});
	};

	return (
		<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={styles.view}>
			<View style={styles.viewInput}>
				<Image source={ICONS.search} style={styles.iconSearch} />
				<TextInput placeholder="Tìm kiếm" style={styles.input} />
			</View>

			<View style={{marginVertical: heightScale(10)}}>
				<CustomText font={FONT_FAMILY.BOLD} text={'LỌC'} />
			</View>

			{data.map(item => (
				<View
					style={{
						borderRadius: 5,
						borderWidth: 1,
						padding: 5,
						marginVertical: heightScale(10),
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
					key={generateRandomId()}>
					<View>
						<CustomText font={FONT_FAMILY.BOLD} text={item.name} />
						<CustomText text={item?.type || 'Loại dịch vụ'} />
					</View>
					<View style={{flexDirection: 'row', gap: widthScale(10)}}>
						<TouchableOpacity onPress={() => onPressEdit(item)}>
							<Image style={styles.icon} source={ICONS.edit} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => onPressDelete(item)}>
							<Image style={styles.icon} source={ICONS.delete} />
						</TouchableOpacity>
					</View>
				</View>
			))}
		</ScrollView>
	);
});

const styles = StyleSheet.create({
	viewTab: {
		height: heightScale(55),
		borderTopColor: colors.grayLine,
		borderTopWidth: 1.5,
		flexDirection: 'row',
	},
	view: {
		flex: 1,
		backgroundColor: colors.white,
		paddingHorizontal: widthScale(20),
	},
	viewInput: {
		borderRadius: 8,
		borderColor: colors.grayLine,
		borderWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: widthScale(5),
	},
	iconSearch: {
		width: widthScale(20),
		height: widthScale(20),
	},
	input: {
		flex: 1,
		color: colors.black,
		fontFamily: FONT_FAMILY.REGULAR,
		fontSize: widthScale(15),
	},
	itemCategory: {
		borderRadius: 5,
		borderWidth: 0.8,
		padding: widthScale(10),
		marginVertical: heightScale(10),
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	icon: {
		width: widthScale(25),
		height: widthScale(25),
	},
});
