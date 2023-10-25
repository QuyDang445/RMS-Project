import {BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CommonActions} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {AppState, DeviceEventEmitter, Image, Keyboard, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../assets/image-paths';
import FixedContainer from '../components/fixed-container';
import {WIDTH} from '../constants/constants';
import {EMIT_EVENT, TYPE_USER} from '../constants/enum';
import OrderAdmin from '../screens/admin/order-admin';
import userAdmin from '../screens/admin/user-admin';
import Home from '../screens/home';
import HomeAdmin from '../screens/home-admin';
import HomeServicer from '../screens/home-servicer';
import Notification from '../screens/notification';
import Order from '../screens/order';
import OrderServicer from '../screens/order-servicer';
import User from '../screens/user';
import {clearUserData} from '../stores/reducers/userReducer';
import {useAppDispatch, useAppSelector} from '../stores/store/storeHooks';
import {colors} from '../styles/colors';
import {heightScale, widthScale} from '../styles/scaling-utils';
import {RootStackScreensParams} from './params';
import {ROUTE_KEY} from './routers';
import {RootStackScreenProps} from './stacks';

const Tab = createBottomTabNavigator<RootStackScreensParams>();

const CusTomTabBar = memo((props: BottomTabBarProps) => {
	const {state, navigation} = props;

	const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setIsShowKeyBoard(true));
		const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setIsShowKeyBoard(false));

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	const getIcon = useCallback((i: number) => {
		switch (i) {
			case 0:
				return ICONS.home;
			case 1:
				return ICONS.notification;
			case 2:
				return ICONS.bill;
			default:
				return ICONS.user;
		}
	}, []);

	if (isShowKeyBoard) {
		return <></>;
	}

	return (
		<View style={styles.tabBar}>
			{state.routes.map((r, i) => {
				const isFocused = state.index === i;
				const icon = getIcon(i);
				return (
					<TouchableOpacity key={JSON.stringify(r)} onPress={() => !isFocused && navigation.navigate(r.name)} style={styles.viewIcon}>
						<View
							style={[
								styles.pressIcon,
								{
									backgroundColor: isFocused ? colors.appColor : undefined,
								},
							]}>
							<Image
								style={[
									styles.icon,
									{
										tintColor: isFocused ? colors.white : colors.black,
									},
								]}
								source={icon}
								resizeMode={'contain'}
							/>
						</View>
					</TouchableOpacity>
				);
			})}
		</View>
	);
});

const BottomTab = (props: RootStackScreenProps<'BottomTab'>) => {
	const {navigation} = props;
	const dispatch = useAppDispatch();

	const appState = useRef(AppState.currentState);
	const userInfo = useAppSelector(state => state.userInfoReducer.userInfo);

	const renderTabBar = useCallback((props: BottomTabBarProps) => <CusTomTabBar {...props} />, []);

	useEffect(() => {
		const sub = AppState.addEventListener('change', async nextAppState => {
			if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
			} else {
			}
			appState.current = nextAppState;
		});

		return () => sub.remove();
	}, []);

	useEffect(() => {
		DeviceEventEmitter.addListener(EMIT_EVENT.LOGOUT, logout);
	}, []);

	const logout = () => {
		navigation.dispatch(CommonActions.reset({index: 0, routes: [{name: ROUTE_KEY.Login}]}));
		setTimeout(() => {
			dispatch(clearUserData());
		}, 600);
	};

	const HOME = useMemo(() => {
		switch (userInfo?.type) {
			case TYPE_USER.USER:
				return Home;
			case TYPE_USER.ADMIN:
				return HomeAdmin;
			default:
				return HomeServicer;
		}
	}, [userInfo]);

	const ORDER = useMemo(() => {
		switch (userInfo?.type) {
			case TYPE_USER.USER:
				return Order;
			case TYPE_USER.ADMIN:
				return OrderAdmin;
			default:
				return OrderServicer;
		}
	}, [userInfo]);

	const USER = useMemo(() => {
		switch (userInfo?.type) {
			case TYPE_USER.ADMIN:
				return userAdmin;
			default:
				return User;
		}
	}, [userInfo]);

	return (
		<FixedContainer>
			<Tab.Navigator tabBar={renderTabBar} screenOptions={{tabBarShowLabel: false, headerShown: false}}>
				<Tab.Screen name="Home" component={HOME} />
				<Tab.Screen name="Notification" component={Notification} />
				<Tab.Screen name="Order" component={ORDER} />
				<Tab.Screen name="User" component={USER} />
			</Tab.Navigator>
		</FixedContainer>
	);
};

export default memo(BottomTab);
const styles = StyleSheet.create({
	tabBar: {
		flexDirection: 'row',
		width: WIDTH,
		height: heightScale(60),
		backgroundColor: colors.white,
		borderTopColor: colors.grayLine,
		borderTopWidth: 1,
	},
	icon: {width: widthScale(25), height: widthScale(25)},
	viewIcon: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	pressIcon: {
		width: widthScale(43),
		height: widthScale(43),
		paddingHorizontal: widthScale(10),
		paddingVertical: heightScale(10),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
	},
});
