import axios from 'axios';
import {YOUR_SERVER_KEY} from '../constants/constants';

export const sendNotificationToDevices = async (token: string, title: string, body: any) => {
	try {
		const response = await axios.post(
			'https://fcm.googleapis.com/fcm/send',
			{
				to: token,
				notification: {
					title: title,
					body: body,
				},
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `key=${YOUR_SERVER_KEY}`,
				},
			},
		);

		console.log('Notification sent:', response.data);
	} catch (error) {
		console.error('Error sending notification:', error);
	}
};
