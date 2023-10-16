import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Category, CategoryService, UserProps} from '../constants/types';

export type RootStackScreensParams = {
	Splash: undefined;
	BottomTab: undefined;
	Login: undefined;
	Onboarding: undefined;
	SignUp: undefined;
	SignUpServices: undefined;
	ForgotPass: undefined;
	Otp: {confirm: FirebaseAuthTypes.ConfirmationResult; userPhone: UserProps};

	Home: undefined;
	Notification: undefined;
	Order: undefined;
	User: undefined;

	Search: undefined;
	DetailService: undefined;
	Booking: undefined;
	InfoServicer: undefined;
	AllReview: undefined;
	DetailNotification: undefined;
	ChangePassword: undefined;
	Setting: undefined;
	Term: undefined;
	UpdateInformation: undefined;
	ListAddress: undefined;
	ChangePasswordForgot: {userPhone: UserProps};
	DetailOrder: undefined;
	AddService: undefined;
	AcceptServicer: undefined;
	InfoAcceptServicer: undefined;
	ManageServicer: undefined;
	InfoDetailServicer: undefined;
	ManageUser: undefined;
	InfoDetailUser: undefined;
	AddCategory: undefined | {category: CategoryService};
	AddServiceCategory: undefined | {categoryService: Category};
	Payment: undefined;
	EditPaymentFee: undefined;
	AddPayment: undefined;
};
