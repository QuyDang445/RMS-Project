import axios from 'axios';
import {SEND_MAIL_KEY} from '../constants/constants';

export const sendMail = async (subject: string, to: string, bodyText: string) => {
	const body = {
		subject: subject,
		to: to,
		// from: 'your-email@example.com',
		bodyText: bodyText,
		apiKey: SEND_MAIL_KEY,
	};

	return axios
		.post('https://api.elasticemail.com/v2/email/send', body)
		.then(response => {
			console.log(response.data);
		})
		.catch(error => {
			console.error(error);
		});
};
