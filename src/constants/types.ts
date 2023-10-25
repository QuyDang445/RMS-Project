import {NOTIFICATION_TYPE, TYPE_ORDER_SERVICE, TYPE_USER} from './enum';

export interface ImageProps {
	name: string;
	height?: number;
	width?: number;
	uri: string;
	type?: string;
}

export interface UserProps {
	id: string;
	name: string;
	address: string[];
	avatar: string;
	phone: string;
	tokenDevice: string;
	type: TYPE_USER;
	password: string;
	isBlocked?: boolean;
	CCCD?: {
		id: string;
		image: string;
	};
	isAccept?: boolean;
	dateRegister?: number;
}

export interface EvaluateProps {
	id: string;
	id_service: string;
	star: number;
	images: string[];
	user_id: string;
}

export interface ServiceProps {
	id: string;
	name: string;
	category: string;
	servicer: string;
	description: string;
	image: string;
	categoryObject: {idCategoryService: string; name: string};
	servicerObject: UserProps;
	evaluate: EvaluateProps[];
	star: number;
}
export interface CategoryService {
	id: string;
	name: string;
}
export interface Category {
	id: string;
	name: string;
	idCategoryService: string;
}

export interface OrderProps {
	id: string;
	idService: string;
	idUser: string;
	time: number;
	status: TYPE_ORDER_SERVICE;
	serviceObject: ServiceProps;
	servicerObject: UserProps;
	images: string[];
	nameUser: string;
	address: string;
	phone: string;
	description: string;
	timeBooking: number;
	categoryObject: Category;
	userObject: UserProps;
	statusCancel: string;
}

export interface AddressProps {
	id: string;
	name: string;
	phone: string;
	address: string;
}

export interface Notification {
	status: NOTIFICATION_TYPE;
	idUser: string;
}
