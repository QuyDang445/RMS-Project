export interface UserProps {
  name: string;
  phone: string;
  mail: string;
  login: LoginProps;
  devices: DeviceUserProps[];
}

export interface LoginProps {
  username: string;
  password: string;
}

export interface DeviceProps {
  name: string;
  hash: [number, number];
  fee: number; // phí hàng ngày sẽ trả tiền điện;
  price: number;
  discount: number; // giảm giá theo %
}

export interface DeviceUserProps {
  device: DeviceProps;
  timeStart: Date;
}

// sau cuối ngày thì sẽ tính toán thời gian chạy của các thiết bị của user và trả ra số coin cho user, và cộng vào số dư
// sau đó reset thiết bị đào đó về thời gian mà nó đã tính toán xong, để hôm sau tính tiếp dựa theo thời gian đó.

/*
* 1. Phase 1:
- Tạo tài khoản.
- Mua thiết bị đào.
- Tính coin đã đào được cho user sau mỗi ngày.
- Nạp tiền vào app.


* 2. Phase 2:





*/
