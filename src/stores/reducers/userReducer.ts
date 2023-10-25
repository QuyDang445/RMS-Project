import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserProps} from '../../constants/types';

interface userInfoState {
	userInfo?: UserProps;
}

const initialState: userInfoState = {
	userInfo: undefined,
};

const userInfo = createSlice({
	name: 'userInfo',
	initialState,
	reducers: {
		clearUserData: () => initialState,
		cacheUserInfo: (state, action: PayloadAction<any>) => {
			state.userInfo = action.payload;
		},
		updateUserInfo: (state, action: PayloadAction<any>) => {
			state.userInfo = {...state.userInfo, ...action.payload};
		},
	},
});

export const {cacheUserInfo, clearUserData, updateUserInfo} = userInfo.actions;
const userInfoReducer = userInfo.reducer;
export default userInfoReducer;
