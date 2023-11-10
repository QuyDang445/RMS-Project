import {Alert, Linking, PermissionsAndroid, ToastAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS, request} from 'react-native-permissions';
import {TABLE, TYPE_ORDER_SERVICE, TYPE_USER} from '../constants/enum';
import {EvaluateProps, OrderProps, ServiceProps, UserProps} from '../constants/types';
import API from '../services/api';
import {colors} from '../styles/colors';

export const parseObjectToArray = (object: any) => {
	try {
		const array = [];
		for (const key in object) {
			if (Object.prototype.hasOwnProperty.call(object, key)) {
				const element: object = object?.[key as keyof object];
				array.push({...element, id: key});
			}
		}
		return array as any[];
	} catch (error) {
		return [];
	}
};

export const isNumber = (value: string) => /^\d+$/.test(value);

export const generateRandomId = () => {
	const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

export const showMessage = (message: string) => {
	// console.log(message);
	ToastAndroid.show(message, ToastAndroid.LONG);
};
export const AlertYesNo = (title = 'THÔNG BÁO', message?: string, onYes?: () => void) =>
	Alert.alert('', message, [{text: 'HUỶ'}, {text: 'OK', onPress: onYes}], {cancelable: false});

export const getServiceFromID__ = async (id: string) => {
	const result = (await API.get(`${TABLE.SERVICE}`, true)) as ServiceProps[];

	const arr = [];

	for (let i = 0; i < result.length; i++) {
		result[i].servicer === id && arr.push(result[i]);
	}

	// get info category
	for (let i = 0; i < arr.length; i++) {
		const category = (await API.get(`${TABLE.CATEGORY}/${arr[i].category}`, undefined, true)) as any;
		arr[i].categoryObject = category;
	}

	// get info service
	for (let i = 0; i < arr.length; i++) {
		const service = (await API.get(`${TABLE.USERS}/${arr[i].servicer}`, undefined, true)) as any;
		arr[i].servicerObject = service;
	}

	// get info star evalute
	for (let i = 0; i < arr.length; i++) {
		const evaluate = (await API.get(`${TABLE.EVALUATE}/${arr[i].id}`, true, true)) as EvaluateProps[];
		arr[i].evaluate = evaluate;

		// get info star
		let totalStar = 0;
		for (let j = 0; j < evaluate.length; j++) {
			totalStar += evaluate[j].star;
		}
		arr[i].star = totalStar / (evaluate.length || 1);
	}

	return arr;
};

export const getServiceFromID = async (id: string) => {
	const result = (await API.get(`${TABLE.SERVICE}`, true)) as ServiceProps[];

	const arr = [];

	for (let i = 0; i < result.length; i++) {
		result[i].servicer === id && arr.push(result[i]);
	}

	// get info category
	const allCategory = await API.get(`${TABLE.CATEGORY}`, true);
	const getCategoryFromID = (idCategory: string) => {
		for (let i = 0; i < allCategory.length; i++) {
			if (idCategory === allCategory[i].id) return allCategory[i];
		}
	};
	for (let i = 0; i < arr.length; i++) {
		const category = getCategoryFromID(arr[i].category);
		arr[i].categoryObject = category;
	}

	// get info service
	const allServicer = await API.get(`${TABLE.USERS}`, true);
	const getServicerFromID = (idServicer: string) => {
		for (let i = 0; i < allServicer.length; i++) {
			if (idServicer === allServicer[i].id) return allServicer[i];
		}
	};
	for (let i = 0; i < arr.length; i++) {
		const service = getServicerFromID(arr[i].servicer);
		arr[i].servicerObject = service;
	}

	// get info star evalute
	for (let i = 0; i < arr.length; i++) {
		const evaluate = (await API.get(`${TABLE.EVALUATE}/${arr[i].id}`, true, true)) as EvaluateProps[];
		arr[i].evaluate = evaluate;

		// get info star
		let totalStar = 0;
		for (let j = 0; j < evaluate.length; j++) {
			totalStar += evaluate[j].star;
		}
		arr[i].star = totalStar / (evaluate.length || 1);
	}

	return arr;
};

export const getServiceAll = async () => {
	const arr = (await API.get(`${TABLE.SERVICE}`, true)) as ServiceProps[];

	// get info category
	for (let i = 0; i < arr.length; i++) {
		const category = (await API.get(`${TABLE.CATEGORY}/${arr[i].category}`, undefined, true)) as any;
		arr[i].categoryObject = category;
	}

	// get info servicer
	for (let i = 0; i < arr.length; i++) {
		const service = (await API.get(`${TABLE.USERS}/${arr[i].servicer}`, undefined, true)) as any;
		arr[i].servicerObject = service;
	}

	// get info star evalute
	for (let i = 0; i < arr.length; i++) {
		const evaluate = (await API.get(`${TABLE.EVALUATE}/${arr[i].id}`, true, true)) as EvaluateProps[];
		arr[i].evaluate = evaluate;

		// get info star
		let totalStar = 0;
		for (let j = 0; j < evaluate.length; j++) {
			totalStar += evaluate[j].star;
		}
		arr[i].star = Math.round(totalStar / (evaluate.length || 1));
	}

	return arr;
};

export const requestLocationPermission = () => {
	const getAlert = () => {
		Alert.alert('THÔNG BÁO', 'Vui lòng cung cấp quyền truy cập vị trí!', [
			{
				text: 'Đồng ý',
				onPress: () => Linking.openSettings(),
				isPreferred: true,
				style: 'cancel',
			},
			{text: 'Huỷ', onPress: () => {}},
		]);
	};

	return new Promise<boolean>(async (resolve, reject) => {
		const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			resolve(true);
		} else {
			getAlert();
			reject(false);
		}
	});
};

export const getLocationMyDevice = async () => {
	try {
		const check = await requestLocationPermission();
		if (check) {
			return (await getMyLocation()) as {lat: number; long: number};
		}
	} catch (error) {}
};

export const getMyLocation = () =>
	new Promise((resolve, reject) =>
		Geolocation.getCurrentPosition(
			position => resolve({lat: position?.coords?.latitude, long: position?.coords?.longitude}),
			error => reject(error),
			{accuracy: {android: 'high', ios: 'best'}},
		),
	);

export const getStatusOrder = (status: TYPE_ORDER_SERVICE) => {
	switch (status) {
		case TYPE_ORDER_SERVICE.OrderPending:
			return 'ĐANG CHỜ';
		case TYPE_ORDER_SERVICE.OrderInProcess:
			return 'ĐÃ XÁC NHẬN';
		case TYPE_ORDER_SERVICE.OrderCompleted:
			return 'HOÀN THÀNH';
		case TYPE_ORDER_SERVICE.OrderCanceled:
			return 'ĐÃ HUỶ';
	}
};

export const getColorStatusOrder = (status: TYPE_ORDER_SERVICE) => {
	switch (status) {
		case TYPE_ORDER_SERVICE.OrderPending:
			return colors.appColor;
		case TYPE_ORDER_SERVICE.OrderInProcess:
			return colors.appColor;
		case TYPE_ORDER_SERVICE.OrderCompleted:
			return colors.appColor;
		case TYPE_ORDER_SERVICE.OrderCanceled:
			return colors.red;
	}
};

export const getServicerALl = async () => {
	const data = (await API.get(`${TABLE.USERS}`, true)) as UserProps[];
	const newData = [];

	for (let i = 0; i < data.length; i++) {
		if (data[i].type === TYPE_USER.SERVICER) {
			newData.push(data[i]);
		}
	}
	return newData;
};

export const getUserAll = async () => {
	const data = (await API.get(`${TABLE.USERS}`, true)) as UserProps[];
	const newData = [];

	for (let i = 0; i < data.length; i++) {
		if (data[i].type === TYPE_USER.USER) {
			newData.push(data[i]);
		}
	}
	return newData;
};

export const getOrderAllFromIDServicer = async (idServicer: string) => {
	const newData: any = [];
	const allOrder = (await API.get(`${TABLE.ORDERS}`, true)) as OrderProps[];
	const allUser = (await API.get(`${TABLE.USERS}`, true)) as UserProps[];
	const allService = (await API.get(`${TABLE.SERVICE}`, true)) as ServiceProps[];

	// get info service
	for (let i = 0; i < allOrder.length; i++) {
		allOrder[i].serviceObject = allService.find(obj => obj.id === allOrder[i].idService) as any;
	}

	// filter idServicer
	for (let i = 0; i < allOrder.length; i++) {
		if (allOrder[i].serviceObject.servicer === idServicer) newData.push(allOrder[i]);
	}

	// get info user
	for (let i = 0; i < newData.length; i++) {
		newData[i].userObject = allUser.find(obj => obj.id === newData?.[i].idUser) as any;
	}

	return newData as OrderProps[];
};
