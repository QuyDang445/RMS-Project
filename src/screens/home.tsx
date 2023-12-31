import notifee from '@notifee/react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import {FlatList, Image, RefreshControl, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../assets/image-paths';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import CustomScrollHorizontal from '../components/home/custom-scroll-horizontal';
import Star from '../components/star';
import {FONT_FAMILY, TABLE} from '../constants/enum';
import {Category, ServiceProps} from '../constants/types';
import {ROUTE_KEY} from '../navigator/routers';
import {RootStackScreenProps} from '../navigator/stacks';
import API from '../services/api';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';
import {generateRandomId, getServiceAll, getServiceAllNew} from '../utils';

const Home = (props: RootStackScreenProps<'Home'>) => {
	const text = {
		title: 'TRANG CHỦ',
	};
	const {navigation} = props;

	const [filterCategory, setFilterCategory] = useState<Category>();
	const [refreshing, setRefreshing] = useState(false);

	const allServiceRef = useRef<ServiceProps[]>([]);

	const [outstandingService, setOutstandingService] = useState<ServiceProps[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [serviceAll, setServiceAll] = useState<ServiceProps[]>([]);

	const onFocusSearch = async () => {
		navigation.navigate(ROUTE_KEY.Search, {data: allServiceRef.current, categories: categories});
	};

	const onRefresh = async () => {
		setRefreshing(true);
		Promise.all([getAllService(), getCategories()]).then(() => setRefreshing(false));
	};

	const getAllService = async () => {
		const data = await getServiceAllNew();
		allServiceRef.current = data;
		setServiceAll(data);
	};

	const getCategories = async () => {
		const data = (await API.get(`${TABLE.CATEGORY}`, true)) as Category[];
		setCategories(data);
	};

	const handleFilterService = (filter?: Category) => {
		if (filter) {
			const newData = [];

			for (let i = 0; i < allServiceRef.current.length; i++) {
				allServiceRef.current[i].category === filter.id && newData.push(allServiceRef.current[i]);
			}

			setServiceAll(newData);
		} else {
			setServiceAll(allServiceRef.current);
		}
	};

	const requestGiveNotification = () => notifee.requestPermission();

	useEffect(() => {
		onRefresh();
		setTimeout(() => {
			requestGiveNotification();
		}, 1000);
	}, []);

	const renderItemCategories = ({item}: any) => {
		return (
			<TouchableOpacity
				onPress={() => {
					setFilterCategory(item);
					handleFilterService(item);
				}}
				style={[
					styles.itemCategory,
					{
						backgroundColor: filterCategory?.id === item.id ? colors.grayLine : `${colors.grayLine}50`,
					},
				]}>
				{!!item?.uri && <Image style={styles.imageCategory} source={{uri: item?.uri}} />}
				<CustomText style={{width: '100%', textAlign: 'center'}} size={10} text={item?.name} />
			</TouchableOpacity>
		);
	};

	const renderItemOutstandingService = ({item}: {item: ServiceProps}) => {
		return (
			<TouchableOpacity onPress={() => navigation.navigate(ROUTE_KEY.DetailService, {data: item})} style={[styles.itemService, {marginRight: 0}]}>
				<Image source={{uri: item?.image}} style={styles.imageService} />

				<View style={{flex: 1, padding: widthScale(15)}}>
					<CustomText numberOfLines={1} font={FONT_FAMILY.BOLD} text={item?.name} />
					<Star star={item.star} />
					<CustomText text={item.servicerObject?.name} />
					<CustomText text={item.servicerObject?.phone} />
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<FixedContainer>
			<CustomHeader title={text.title} hideBack />
			<ScrollView
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				showsVerticalScrollIndicator={false}
				style={styles.view}>
				<TouchableOpacity disabled={refreshing || !serviceAll.length} onPress={onFocusSearch} style={styles.viewInput}>
					<Image source={ICONS.search} style={styles.iconSearch} />
					<TextInput editable={false} style={styles.input} />
				</TouchableOpacity>

				{!!outstandingService.length && (
					<>
						<CustomText style={styles.titleList} text={'Dịch vụ nổi bật'} font={FONT_FAMILY.BOLD} />
						<CustomScrollHorizontal>
							<FlatList
								scrollEnabled={false}
								keyExtractor={generateRandomId}
								showsHorizontalScrollIndicator={false}
								horizontal
								data={outstandingService}
								renderItem={renderItemOutstandingService}
							/>
						</CustomScrollHorizontal>
					</>
				)}
				{!!categories.length && (
					<>
						<CustomText style={styles.titleList} text={'Danh mục dịch vụ'} font={FONT_FAMILY.BOLD} />
						<View style={{flexDirection: 'row'}}>
							<TouchableOpacity
								onPress={() => {
									setFilterCategory(undefined);
									handleFilterService();
								}}
								style={[
									styles.itemCategory,
									{
										backgroundColor: !filterCategory ? colors.grayLine : `${colors.grayLine}50`,
									},
								]}>
								<Image style={styles.imageCategory} source={ICONS.all} />
								<CustomText style={{width: '100%', textAlign: 'center'}} size={10} text={'Tất cả'} />
							</TouchableOpacity>
							<CustomScrollHorizontal style={{flex: 1}}>
								<FlatList
									scrollEnabled={false}
									keyExtractor={generateRandomId}
									showsHorizontalScrollIndicator={false}
									horizontal
									data={categories}
									renderItem={renderItemCategories}
								/>
							</CustomScrollHorizontal>
						</View>
					</>
				)}

				<CustomText
					style={styles.titleList}
					text={filterCategory ? `Dịch Vụ ${filterCategory?.name}` : 'Tất cả dịch vụ'}
					font={FONT_FAMILY.BOLD}
				/>
				<FlatList
					scrollEnabled={false}
					columnWrapperStyle={{justifyContent: 'space-between', marginBottom: heightScale(20)}}
					numColumns={2}
					keyExtractor={generateRandomId}
					showsHorizontalScrollIndicator={false}
					data={serviceAll}
					renderItem={renderItemOutstandingService}
					ListEmptyComponent={
						<View style={{marginTop: heightScale(50)}}>
							<CustomText style={{textAlign: 'center'}} color={colors.grayText} text={'Không có dịch vụ nào'} />
						</View>
					}
				/>
			</ScrollView>
		</FixedContainer>
	);
};

export default memo(Home);
const styles = StyleSheet.create({
	viewInput: {
		borderRadius: 8,
		borderColor: colors.grayLine,
		borderWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: widthScale(5),
	},
	view: {
		marginHorizontal: widthScale(20),
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
	titleList: {
		marginTop: heightScale(15),
		marginBottom: heightScale(5),
	},
	imageCategory: {
		width: widthScale(30),
		height: heightScale(30),
		alignSelf: 'center',
		resizeMode: 'contain',
		borderRadius: 5,
	},
	itemCategory: {
		width: widthScale(60),
		height: widthScale(60),
		borderRadius: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: heightScale(5),
		marginRight: widthScale(20),
	},
	imageService: {
		width: '100%',
		height: widthScale(100),
		alignSelf: 'center',
	},
	itemService: {
		width: widthScale(150),
		borderRadius: 10,
		marginRight: widthScale(15),
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: `${colors.grayLine}50`,
	},
});
