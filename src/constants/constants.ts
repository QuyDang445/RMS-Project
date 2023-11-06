import {Dimensions, Platform} from 'react-native';
export const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

export const BASE_URL = 'https://srm-afd4a-default-rtdb.asia-southeast1.firebasedatabase.app/';
export const BASE_URL_MAP = 'https://maps.googleapis.com/maps/api/';
export const WEB_API_KEY = 'AIzaSyDSkMpCqba9WUuIWpNnLK6xKokVj1slryM';
export const YOUR_SERVER_KEY =
	'AAAAJuIWbo8:APA91bE07B6xCFQEvsd8LkF6Ch_XUqix0fGVa4B_3SF8Ti2IZaNMn1K8SJYbn_wWzil6YWWt5_7uiHtBNG3nHpyooBzO5aMXvKf3SNGedQukO8admjX57rTLI4G_7L6ZbZIi5YshPTPt';

export const API_GET_INFO_COORDINATE = (lat: number, long: number) =>
	`${BASE_URL_MAP}geocode/json?latlng=${lat},${long}&language=ja&key=${WEB_API_KEY}`;

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';

export const baseWidth = 375;
export const baseHeight = 812;

export const CHANNEL_ID = 'SRM_MAIN';
