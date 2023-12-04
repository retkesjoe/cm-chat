import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'
import { IChatState, IMessage } from './Chat.interface'

const initialState: IChatState = {
	chat: [],
	status: 'idle',
}

export const chatSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		send: (state, action: PayloadAction<IMessage>) => {
			state.chat.push({ ...action.payload, status: 'idle' })
		},
	},
})

/* Actions */
export const { send } = chatSlice.actions

/* Selectors */
export const selectChat = (state: RootState) =>
	state.chat.chat.slice(0).slice(-10)

/* Reducers */
export default chatSlice.reducer
