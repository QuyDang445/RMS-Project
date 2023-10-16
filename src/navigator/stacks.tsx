import {CardStyleInterpolators, createStackNavigator, StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import AddService from '../screens/add-service';
import AcceptServicer from '../screens/admin/accept-servicer';
import AddCategory from '../screens/admin/add-category';
import AddPayment from '../screens/admin/add-payment';
import AddServiceCategory from '../screens/admin/add-service-category';
import EditPaymentFee from '../screens/admin/edit-payment-fee';
import InfoAcceptServicer from '../screens/admin/info-accept-servicer';
import InfoDetailServicer from '../screens/admin/info-detail-servicer';
import InfoDetailUser from '../screens/admin/info-detail-user';
import ManageServicer from '../screens/admin/manage-servicer';
import ManageUser from '../screens/admin/manage-user';
import Payment from '../screens/admin/payment';
import AllReview from '../screens/all-review';
import Booking from '../screens/booking';
import ChangePassword from '../screens/change-password';
import ChangePasswordForgot from '../screens/change-password-forgot';
import DetailNotification from '../screens/detail-notification';
import DetailOrder from '../screens/detail-order';
import DetailService from '../screens/detail-service';
import ForgotPass from '../screens/forgot-pass';
import InfoServicer from '../screens/info-servicer';
import ListAddress from '../screens/list-address';
import Login from '../screens/login';
import Onboarding from '../screens/onboarding';
import Otp from '../screens/otp';
import Search from '../screens/search';
import Setting from '../screens/setting';
import SignUp from '../screens/sign-up';
import SignUpServices from '../screens/sign-up-services';
import Splash from '../screens/splash';
import Term from '../screens/term';
import UpdateInformation from '../screens/update-information';
import BottomTab from './bottom-tab';
import {RootStackScreensParams} from './params';
import {ROUTE_KEY} from './routers';

export type RootStackScreens = keyof RootStackScreensParams;
export type RootStackScreenProps<T extends RootStackScreens> = StackScreenProps<RootStackScreensParams, T>;
export type UseRootStackNavigation<T extends RootStackScreens = 'Splash'> = StackNavigationProp<RootStackScreensParams, T>;

const {Navigator, Screen} = createStackNavigator<RootStackScreensParams>();

const Stacks = () => {
	return (
		<Navigator
			screenOptions={{
				headerShown: false,
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}>
			<Screen name={ROUTE_KEY.Splash} component={Splash} />
			<Screen name={ROUTE_KEY.Onboarding} component={Onboarding} />
			<Screen name={ROUTE_KEY.Login} component={Login} />
			<Screen name={ROUTE_KEY.SignUp} component={SignUp} />
			<Screen name={ROUTE_KEY.SignUpServices} component={SignUpServices} />
			<Screen name={ROUTE_KEY.ForgotPass} component={ForgotPass} />
			<Screen name={ROUTE_KEY.Otp} component={Otp} />
			<Screen name={ROUTE_KEY.BottomTab} component={BottomTab} />
			<Screen name={ROUTE_KEY.Search} component={Search} />
			<Screen name={ROUTE_KEY.DetailService} component={DetailService} />
			<Screen name={ROUTE_KEY.Booking} component={Booking} />
			<Screen name={ROUTE_KEY.InfoServicer} component={InfoServicer} />
			<Screen name={ROUTE_KEY.AllReview} component={AllReview} />
			<Screen name={ROUTE_KEY.DetailNotification} component={DetailNotification} />
			<Screen name={ROUTE_KEY.ChangePassword} component={ChangePassword} />
			<Screen name={ROUTE_KEY.Setting} component={Setting} />
			<Screen name={ROUTE_KEY.Term} component={Term} />
			<Screen name={ROUTE_KEY.UpdateInformation} component={UpdateInformation} />
			<Screen name={ROUTE_KEY.ListAddress} component={ListAddress} />
			<Screen name={ROUTE_KEY.ChangePasswordForgot} component={ChangePasswordForgot} />
			<Screen name={ROUTE_KEY.DetailOrder} component={DetailOrder} />
			<Screen name={ROUTE_KEY.AddService} component={AddService} />
			<Screen name={ROUTE_KEY.AcceptServicer} component={AcceptServicer} />
			<Screen name={ROUTE_KEY.InfoAcceptServicer} component={InfoAcceptServicer} />
			<Screen name={ROUTE_KEY.ManageServicer} component={ManageServicer} />
			<Screen name={ROUTE_KEY.InfoDetailServicer} component={InfoDetailServicer} />
			<Screen name={ROUTE_KEY.ManageUser} component={ManageUser} />
			<Screen name={ROUTE_KEY.InfoDetailUser} component={InfoDetailUser} />
			<Screen name={ROUTE_KEY.AddCategory} component={AddCategory} />
			<Screen name={ROUTE_KEY.AddServiceCategory} component={AddServiceCategory} />
			<Screen name={ROUTE_KEY.Payment} component={Payment} />
			<Screen name={ROUTE_KEY.EditPaymentFee} component={EditPaymentFee} />
			<Screen name={ROUTE_KEY.AddPayment} component={AddPayment} />
		</Navigator>
	);
};

export default memo(Stacks);
const styles = StyleSheet.create({});
