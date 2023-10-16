import {Image, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import FixedContainer from '../components/fixed-container';
import CustomHeader from '../components/custom-header';
import {RootStackScreenProps} from '../navigator/stacks';
import Filter from '../components/search/filter';
import {colors} from '../styles/colors';
import {ICONS} from '../assets/image-paths';
import {widthScale} from '../styles/scaling-utils';
import {FONT_FAMILY} from '../constants/enum';

const Search = (props: RootStackScreenProps<'Search'>) => {
	const {navigation} = props;

	const [textSearch, setTextSearch] = useState('');
	const [isShow, setIsShow] = useState(false);

	return (
		<FixedContainer>
			<CustomHeader title="TÌM KIẾM" />
			<ScrollView showsVerticalScrollIndicator={false} style={styles.view}>
				<View style={styles.viewInput}>
					<Image source={ICONS.search} style={styles.iconSearch} />
					<TextInput autoFocus onChangeText={setTextSearch} style={styles.input} value={textSearch} />
				</View>

				<Filter
					onPressShow={() => setIsShow(!isShow)}
					isOn={isShow}
					title="Sắp xếp"
					filter={['Sắp xếp theo giá', 'Sắp xếp theo đánh giá', 'Sắp xếp theo']}
				/>
				{/* <Filter isOn title="Sắp xếp" filter={['Sắp xếp theo giá', 'Sắp xếp theo đánh giá', 'Sắp xếp theo']} /> */}
			</ScrollView>
		</FixedContainer>
	);
};

export default Search;
const styles = StyleSheet.create({
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
	view: {
		marginHorizontal: widthScale(20),
	},
});
