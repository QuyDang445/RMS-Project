import {Alert} from 'react-native';

export const parseObjectToArray = (object: any) => {
	const array = [];
	for (const key in object) {
		if (Object.prototype.hasOwnProperty.call(object, key)) {
			const element: object = object[key as keyof object];
			array.push({...element, id: key});
		}
	}
	return array as any[];
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
	console.log(message);
};
export const AlertYesNo = (title = 'THÔNG BÁO', message?: string, onYes?: () => void) =>
	Alert.alert('', message, [{text: 'HUỶ'}, {text: 'OK', onPress: onYes}], {cancelable: false});
