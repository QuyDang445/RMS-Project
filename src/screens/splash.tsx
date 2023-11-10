import messaging from '@react-native-firebase/messaging';
import LottieView from 'lottie-react-native';
import React, {memo, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {ANIMATIONS} from '../assets/image-paths';
import FixedContainer from '../components/fixed-container';
import {TABLE} from '../constants/enum';
import {ROUTE_KEY} from '../navigator/routers';
import {RootStackScreenProps} from '../navigator/stacks';
import API from '../services/api';
import {updateUserInfo} from '../stores/reducers/userReducer';
import {useAppDispatch, useAppSelector} from '../stores/store/storeHooks';
import {widthScale} from '../styles/scaling-utils';
import {sleep} from '../utils/time';

const Splash = (props: RootStackScreenProps<'Splash'>) => {
	const {navigation} = props;
	const dispatch = useAppDispatch();

	const userInfo = useAppSelector(state => state.userInfoReducer.userInfo);

	const updateTokenDevice = async (isNull?: boolean) => {
		const userCurrent = await API.get(`${TABLE.USERS}/${userInfo?.id}`);

		const token = await messaging().getToken();
		const newUser = await API.put(`${TABLE.USERS}/${userInfo?.id}`, {...userCurrent, tokenDevice: isNull ? '' : token});
		console.log('TOKEN FCM-->', token);

		dispatch(updateUserInfo(newUser));
	};

	useEffect(() => {
		(async () => {
			await sleep(__DEV__ ? 0 : 1000);
			if (userInfo && !userInfo?.isBlocked) {
				await updateTokenDevice(true);
				navigation.replace(ROUTE_KEY.BottomTab);
			} else {
				navigation.replace(ROUTE_KEY.Login);
			}
		})();
	}, []);

	return (
		<FixedContainer style={styles.view}>
			<LottieView style={styles.image} source={ANIMATIONS.SPLASH} autoPlay loop speed={1.5} />
		</FixedContainer>
	);
};
export default memo(Splash);
const styles = StyleSheet.create({
	view: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: widthScale(300),
		height: widthScale(300),
	},
});
