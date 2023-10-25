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

// Bắn thông báo cho service khi người dùng đặt hàng thành công.
export const pushNotificationToServiceNewOrder = (idService: string, idUser: string, idOrder: string) => {};

// Bắn thông báo cho user khi service xác nhận đơn đặt hàng.

// Bắn thông báo cho service khi user huỷ đơn đặt hàng.
export const pushNotificationToServiceCancelOrder = (idService: string, idUser: string, idOrder: string) => {};
