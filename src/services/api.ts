import axios from 'axios';
import {BASE_URL} from '../constants/constants';
import {parseObjectToArray} from '../utils';
import {logAPI} from '../utils/logger';

const initializeAxios = () => axios.create({baseURL: BASE_URL, timeout: 10000, validateStatus: () => true});

const API_AXIOS = initializeAxios();

API_AXIOS.interceptors.response.use(response => response.data);

const API = {
	get: async (url: string, isParseArray?: boolean) => {
		try {
			logAPI('GET', url);
			const data = await API_AXIOS.get(url + '.json');
			return isParseArray ? parseObjectToArray(data) : data;
		} catch (error) {
			console.error(error);
			return isParseArray ? [] : undefined;
		}
	},

	post: async (url: string, data?: any, isParseArray?: boolean) => {
		try {
			logAPI('POST', url, data);
			const res = await API_AXIOS.post(url + '.json', data);
			return isParseArray ? parseObjectToArray(res) : res;
		} catch (error) {
			console.error(error);
			return isParseArray ? [] : undefined;
		}
	},

	put: async (url: string, data?: any, isParseArray?: boolean) => {
		try {
			logAPI('PUT', url, data);
			const res = await API_AXIOS.put(url + '.json', data);
			return isParseArray ? parseObjectToArray(res) : res;
		} catch (error) {
			console.error(error);
			return isParseArray ? [] : undefined;
		}
	},
};

export default API;
