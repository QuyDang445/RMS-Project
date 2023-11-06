import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Category, CategoryService, OrderProps, ServiceProps, UserProps} from '../constants/types';

export type RootStackScreensParams = {
	Splash: undefined;
	BottomTab: undefined;
	Login: undefined;
	Onboarding: undefined;
	SignUp: undefined;
	SignUpServices: undefined;
	ForgotPass: undefined;
	Otp: {confirm: FirebaseAuthTypes.PhoneAuthSnapshot; userPhone: UserProps};

	Home: undefined;
	Notification: undefined;
	Order: undefined;
	User: undefined;

	Search: {data: ServiceProps[]; categories: Category[]};
	DetailService: {data: ServiceProps};
	Booking: {service: ServiceProps};
	InfoServicer: {idServicer: string};
	AllReview: {idService: string};
	DetailNotification: undefined;
	ChangePassword: undefined;
	Setting: undefined;
	Term: undefined;
	UpdateInformation: undefined;
	ListAddress: undefined | {onChoose: (text: string) => void};
	ChangePasswordForgot: {userPhone: UserProps};
	DetailOrder: {data: OrderProps};
	AddService: undefined | {data: ServiceProps};
	AcceptServicer: {data: UserProps[]};
	InfoAcceptServicer: {data: UserProps};
	ManageServicer: undefined;
	InfoDetailServicer: undefined;
	ManageUser: undefined;
	InfoDetailUser: {data: UserProps};
	AddCategory: undefined | {category: CategoryService};
	AddServiceCategory: undefined | {categoryService: Category};
	Payment: undefined;
	EditPaymentFee: undefined;
	AddPayment: undefined;
	EvaluateService: {data: OrderProps};
};
