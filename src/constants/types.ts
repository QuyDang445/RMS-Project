import {TYPE_USER} from './enum';

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
	type: string;
	name: string;
	image: string;
	description: string;
	idServicer: string;
	servicer: UserProps;
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
	idService: ServiceProps;
	time: number;
}

export interface AddressProps {
	id: string;
	name: string;
	phone: string;
	address: string;
}
