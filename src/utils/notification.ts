import {YOUR_SERVER_KEY} from '../constants/constants';
import {TABLE} from '../constants/enum';
import API from '../services/api';

const getTokenFromIdService = async (id: string) => {
	const idServicer = await API.get(`${TABLE.SERVICE}/${id}`);
	const servicer = await API.get(`${TABLE.USERS}/${idServicer?.servicer}`);
	return servicer?.tokenDevice as string;
};

export const sendNotificationToDevices = async (token: string, title: string, body: string, data: any) => {
	try {
		fetch('https://fcm.googleapis.com/fcm/send', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `key=${YOUR_SERVER_KEY}`,
			},
			body: JSON.stringify({
				to: token,
				notification: {
					title: title,
					body: body,
				},
				data: data,
			}),
		});
	} catch (error) {
		console.error('Error sending notification:', error);
	}
};

// SERVICER
// Bắn thông báo cho service khi người dùng đặt hàng thành công.
export const pushNotificationToServiceNewOrder = async (idService: string, idUser: string, idOrder: string) => {
	const title = 'Có đơn đặt hàng dịch vụ!';
	const content = 'Bạn có 1 đơn đặt hàng dịch vụ mới.';
	const tokenDevice = await getTokenFromIdService(idService);
	// tokenDevice && sendNotificationToDevices(tokenDevice, title, content);
};
// Bắn thông báo cho service khi user huỷ đơn đặt hàng.
export const pushNotificationToServiceCancelOrder = async (idService: string, idUser: string, idOrder: string) => {};

// USER
// Thông báo cho user khi đặt hàng thành công!
export const pushNotificationToUserWhenBookingDone = () => {};
