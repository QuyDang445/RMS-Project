export enum FONT_FAMILY {
	REGULAR = 'Signika-Regular',
	SEMI_BOLD = 'Signika-SemiBold',
	BOLD = 'Signika-Bold',
}

export enum ASYNC_STORAGE_KEY {
	FIRST_OPEN = 'FIRST_OPEN',
}

export enum EMIT_EVENT {
	DATA_LOGIN = 'DATA_LOGIN',
	CHECK_SCREEN_ORDER = 'CHECK_SCREEN_ORDER',
	LOGOUT = 'LOGOUT',
}

export enum TYPE_USER {
	USER = 'USER',
	ADMIN = 'ADMIN',
	SERVICER = 'SERVICER',
}

export enum TABLE {
	USERS = 'USERS',
	ADDRESS = 'ADDRESS',
	ORDERS = 'ORDERS',
	ADMIN = 'ADMIN',
	CATEGORY_SERVICE = 'CATEGORY_SERVICE',
	SERVICE = 'SERVICE',
	CATEGORY = 'CATEGORY',
}

export enum TYPE_ORDER_SERVICE {
	OrderPending = 'OrderPending',
	OrderCanceled = 'OrderCanceled',
	OrderInProcess = 'OrderInProcess',
	OrderCompleted = 'OrderCompleted',
}

export enum TYPE_BLOCK_SERVICER {
	ReportedManyTimes = 'ReportedManyTimes',
	LatePaymentOfFees = 'LatePaymentOfFees',
	Other = 'Other',
	ThereIsUnusualSpamBehavior = 'ThereIsUnusualSpamBehavior',
}
