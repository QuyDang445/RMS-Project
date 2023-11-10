import {showMessage} from '.';
import {YOUR_SERVER_KEY} from '../constants/constants';
import {NOTIFICATION_TYPE, TABLE} from '../constants/enum';
import {Notification} from '../constants/types';
import API from '../services/api';

const getTokenDeviceFromID = async (id: string) => {
	const servicer = await API.get(`${TABLE.USERS}/${id}`);
	return servicer?.tokenDevice as string | undefined;
};

export const sendNotificationToDevices = async (token: string, title: string, body: string, data: Notification) => {
	try {
		fetch('https://fcm.googleapis.com/fcm/send', {
			method: 'POST',
			headers: {'Content-Type': 'application/json', Authorization: `key=${YOUR_SERVER_KEY}`},
			body: JSON.stringify({to: token, notification: {title: title, body: body}, data: data}),
		});
	} catch (error) {
		console.error('Error sending notification:', error);
	}
};

// - Thông báo USER:
// + đặt đơn thành công.
export const pushNotificationUserBookingSuccess = async (idUser: string, idService: string, idOrder: string) => {
	const token = await getTokenDeviceFromID(idUser);
	const data = {
		data: {idOrder: idOrder},
		idUser: idUser,
		status: NOTIFICATION_TYPE.BOOKING_SUCCESS,
	};
	const nameService = await API.get(`${TABLE.SERVICE}/${idService}`).then(({name}) => name);
	const title = 'Đặt đơn dịch vụ thành công!';
	const body = `Bạn đã đặt thành công đơn dịch vụ ${nameService}.`;

	API.post(`${TABLE.NOTIFICATION}/${idUser}`, {data, title, body, time: new Date().valueOf()});

	token && sendNotificationToDevices(token, title, body, data);
};

// + đơn hàng đã được xác nhận.
export const pushNotificationUserBookingConfirm = async (idUser: string, idOrder: string, nameService: string) => {
	const token = await getTokenDeviceFromID(idUser);
	const data = {
		data: {idOrder: idOrder},
		idUser: idUser,
		status: NOTIFICATION_TYPE.BOOKING_CONFIRMED,
	};
	const title = 'Đơn dịch vụ đã được xác nhận!';
	const body = `Đơn đặt hàng dịch vụ ${nameService} của bạn đã được xác nhận.`;

	API.post(`${TABLE.NOTIFICATION}/${idUser}`, {data, title, body, time: new Date().valueOf()});

	token && sendNotificationToDevices(token, title, body, data);
};

// + đơn hoàn thành.
export const pushNotificationUserBookingDone = async (idUser: string, idOrder: string, nameService: string) => {
	const token = await getTokenDeviceFromID(idUser);
	const data = {
		data: {idOrder: idOrder},
		idUser: idUser,
		status: NOTIFICATION_TYPE.BOOKING_DONE,
	};
	const title = 'Đơn dịch vụ đã được hoàn thành!';
	const body = `Đơn đặt hàng dịch vụ ${nameService} của bạn đã được hoàn thành.`;

	API.post(`${TABLE.NOTIFICATION}/${idUser}`, {data, title, body, time: new Date().valueOf()});

	token && sendNotificationToDevices(token, title, body, data);
};

// + đơn bị huỷ.
export const pushNotificationUserBookingCancelByServicer = async (idUser: string, idOrder: string, nameService: string, lídohuỷ: string) => {
	const token = await getTokenDeviceFromID(idUser);
	const data = {
		data: {idOrder: idOrder},
		idUser: idUser,
		status: NOTIFICATION_TYPE.BOOKING_CANCEL,
	};
	const title = 'Đơn dịch vụ đã bị huỷ!';
	const body = `Đơn dịch vụ ${nameService} của bạn đã bị huỷ lí do ${lídohuỷ}.`;

	API.post(`${TABLE.NOTIFICATION}/${idUser}`, {data, title, body, time: new Date().valueOf()});

	token && sendNotificationToDevices(token, title, body, data);
};

// - Servicer: ------------------------------------------
// + có đơn hàng.
export const pushNotificationServiceNewBooking = async (idUser: string, idService: string, idOrder: string, idServicer: string) => {
	const token = await getTokenDeviceFromID(idServicer);
	const data = {
		data: {idOrder: idOrder},
		idUser: idServicer,
		status: NOTIFICATION_TYPE.NEW_BOOKING,
	};
	const nameService = await API.get(`${TABLE.SERVICE}/${idService}`).then(({name}) => name);
	const title = 'Có đơn đặt dịch vụ!';
	const body = `Bạn có đơn đặt hàng dịch vụ ${nameService}.`;

	API.post(`${TABLE.NOTIFICATION}/${idServicer}`, {data, title, body, time: new Date().valueOf()});

	token && sendNotificationToDevices(token, title, body, data);
};

// + đơn hàng bị huỷ.
export const pushNotificationServiceBookingCancelByUser = async (idOrder: string, idServicer: string, nameService: string) => {
	const token = await getTokenDeviceFromID(idServicer);
	const data = {
		data: {idOrder: idOrder},
		idUser: idServicer,
		status: NOTIFICATION_TYPE.BOOKING_CANCEL,
	};
	const title = 'Đơn đặt dịch vụ bị huỷ!';
	const body = `Đơn đặt hàng dịch vụ ${nameService} đã bị huỷ.`;

	API.post(`${TABLE.NOTIFICATION}/${idServicer}`, {data, title, body, time: new Date().valueOf()});

	token && sendNotificationToDevices(token, title, body, data);
};

// + thông báo đánh giá đơn hàng.
export const pushNotificationEvaluateBooking = async (idUser: string, idService: string, idOrder: string, idServicer: string, star: number) => {
	const token = await getTokenDeviceFromID(idServicer);
	const nameUser = await API.get(`${TABLE.USERS}/${idUser}`).then(({name}) => name);
	const data = {
		data: {idOrder: idOrder},
		idUser: idServicer,
		status: NOTIFICATION_TYPE.BOOKING_EVALUATE,
	};
	const title = 'Bạn nhận được 1 đánh giá!';
	const body = `${nameUser} đã đánh giá ${star} sao cho bạn.`;

	API.post(`${TABLE.NOTIFICATION}/${idServicer}`, {data, title, body, time: new Date().valueOf()});

	token && sendNotificationToDevices(token, title, body, data);
};

// admin: ------------------------------------------
// + có 1 giao dịch cần được xác thực
export const pushNotificationAdminNewPayment = async (idServicer: string, idPayment: string, nameServicer: string) => {
	const idAdmin = 'admin';
	const token = await getTokenDeviceFromID(idAdmin);
	const data = {
		data: {idOrder: idPayment},
		idUser: idAdmin,
		status: NOTIFICATION_TYPE.NEW_PAYMENT,
	};
	const title = 'Có giao dịch cần được xác nhận!';
	const body = `Bạn có 1 giao dịch cần được xác nhận tên ${nameServicer}`;

	API.post(`${TABLE.NOTIFICATION}/${idAdmin}`, {data, title, body, time: new Date().valueOf()});
	token && sendNotificationToDevices(token, title, body, data);
};

// + có 1 tài khoản cần được duyệt
export const pushNotificationAdminNewServicer = async (idServicer: string) => {
	const idAdmin = 'admin';
	const token = await getTokenDeviceFromID(idAdmin);
	const nameServicer = await API.get(`${TABLE.USERS}/${idServicer}`).then(({name}) => name);

	const title = 'Có tài khoản dịch vụ cần được duyệt!';
	const body = `Bạn có 1 tài khoản dịch vụ cần được duyệt ${nameServicer}`;

	const data = {
		data: {idOrder: idServicer},
		idUser: idAdmin,
		status: NOTIFICATION_TYPE.NEW_SERVICER,
	};
	token && sendNotificationToDevices(token, title, body, data);
};
// có 1 báo cáo của người dùng
export const pushNotificationAdminUserReport = async (idServicer: string, reasonReport: string) => {};
