import {Dimensions, Platform} from 'react-native';
export const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

export const BASE_URL = 'https://srm-afd4a-default-rtdb.asia-southeast1.firebasedatabase.app/';
export const YOUR_SERVER_KEY = '';

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';

export const baseWidth = 375;
export const baseHeight = 812;
