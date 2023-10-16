import React, {memo, useState} from 'react';
import {FlatList, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../assets/image-paths';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import FixedContainer from '../components/fixed-container';
import CustomScrollHorizontal from '../components/home/custom-scroll-horizontal';
import Star from '../components/star';
import {FONT_FAMILY} from '../constants/enum';
import {ROUTE_KEY} from '../navigator/routers';
import {RootStackScreenProps} from '../navigator/stacks';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';
import {generateRandomId} from '../utils';

const Categories = [
	{
		id: generateRandomId(),
		name: 'Điện',
		image: 'https://media.istockphoto.com/id/488310618/vi/vec-to/th%E1%BB%A3-%C4%91i%E1%BB%87n.jpg?s=1024x1024&w=is&k=20&c=0ylzYKN5SBZKPDmCisolukQmudeFwKp0CqoD1zjEygY=',
	},
	{
		id: generateRandomId(),
		name: 'Điện lạnh',
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmc5INwFivVODAZpPpqhY2dhTEEaoIO5rAcHer0gbP&s',
	},
	{
		id: generateRandomId(),
		name: 'Điện tử',
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr_ssRg1VmwVJ2oOsiki6X3A9IkBvAr9kGL0eONMUf&s',
	},
	{
		id: generateRandomId(),
		name: 'Điện nước',
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2zmLHMDBkeEaUS4fXKE9xOE1_RIAJ2F0G7w7eEwV1NA&s',
	},
	{
		id: generateRandomId(),
		name: 'IT',
		image: 'https://top10dongnai.com/wp-content/uploads/2019/12/Vi-t%C3%ADnh-%C4%90%E1%BB%93ng-Nai.jpg',
	},
];

const outstandingService = [
	{
		id: '',
		image: 'https://cdn.vietnammoi.vn/171464242508312576/2022/1/4/1-1641288954484112203685.jpg',
		name: 'dich vụ mua bán',
		star: 0,
		services: {name: 'tên thợ', phone: '0384756556'},
	},
	{
		id: '',
		image: 'https://cdn.vietnammoi.vn/171464242508312576/2022/1/4/1-1641288954484112203685.jpg',
		name: 'dich vụ mua bán',
		star: 0,
		services: {name: 'tên thợ', phone: '0384756556'},
	},
	{
		id: '',
		image: 'https://cdn.vietnammoi.vn/171464242508312576/2022/1/4/1-1641288954484112203685.jpg',
		name: 'dich vụ mua bán',
		star: 0,
		services: {name: 'tên thợ', phone: '0384756556'},
	},
	{
		id: '',
		image: 'https://cdn.vietnammoi.vn/171464242508312576/2022/1/4/1-1641288954484112203685.jpg',
		name: 'dich vụ mua bán',
		star: 0,
		services: {name: 'tên thợ', phone: '0384756556'},
	},
];

const Home = (props: RootStackScreenProps<'Home'>) => {
	const {navigation} = props;

	const [filterCategory, setfilterCategory] = useState<string>();

	const onFocusSearch = () => {
		navigation.navigate(ROUTE_KEY.Search);
	};

	const renderItemCategories = ({item}: any) => {
		return (
			<TouchableOpacity
				onPress={() => setfilterCategory(item.id)}
				style={[
					styles.itemCategory,
					{
						backgroundColor: filterCategory === item.id ? colors.grayLine : `${colors.grayLine}50`,
					},
				]}>
				<Image style={styles.imageCategory} source={{uri: item?.image}} />
				<CustomText style={{width: '100%', textAlign: 'center'}} size={10} text={item?.name} />
			</TouchableOpacity>
		);
	};

	const renderItemOutstandingService = ({item}: any) => {
		return (
			<TouchableOpacity onPress={() => navigation.navigate(ROUTE_KEY.DetailService)} style={styles.itemService}>
				<Image source={{uri: item?.image}} style={styles.imageService} />

				<View style={{flex: 1, padding: widthScale(15)}}>
					<CustomText text={item?.name} />
					<Star star={4} />
					<CustomText text={item?.services?.name} />
					<CustomText text={item?.services?.phone} />
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<FixedContainer>
			<CustomHeader title="TRANG CHỦ" hideBack />
			<ScrollView showsVerticalScrollIndicator={false} style={styles.view}>
				<TouchableOpacity onPress={onFocusSearch} style={styles.viewInput}>
					<Image source={ICONS.search} style={styles.iconSearch} />
					<TextInput editable={false} style={styles.input} />
				</TouchableOpacity>

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

				<CustomText style={styles.titleList} text={'Danh mục dịch vụ'} font={FONT_FAMILY.BOLD} />
				<View style={{flexDirection: 'row'}}>
					<TouchableOpacity
						onPress={() => setfilterCategory('ALL')}
						style={[
							styles.itemCategory,
							{
								backgroundColor: filterCategory === 'ALL' ? colors.grayLine : `${colors.grayLine}50`,
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
							data={Categories}
							renderItem={renderItemCategories}
						/>
					</CustomScrollHorizontal>
				</View>

				<CustomText style={styles.titleList} text={'Tất cả dịch vụ'} font={FONT_FAMILY.BOLD} />
				<FlatList
					scrollEnabled={false}
					columnWrapperStyle={{justifyContent: 'space-between', marginBottom: heightScale(20)}}
					numColumns={2}
					keyExtractor={generateRandomId}
					showsHorizontalScrollIndicator={false}
					data={[...outstandingService, ...outstandingService, ...outstandingService]}
					renderItem={renderItemOutstandingService}
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
		width: widthScale(120),
		height: widthScale(80),
		alignSelf: 'center',
		backgroundColor: 'blue',
		borderRadius: 5,
		marginTop: widthScale(15),
	},
	itemService: {
		width: widthScale(150),
		height: heightScale(220),
		backgroundColor: `${colors.blackGray}10`,
		borderRadius: 10,
		marginRight: widthScale(15),
	},
});
