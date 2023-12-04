import {
	configureStore,
	ThunkAction,
	Action,
	combineReducers,
} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import chatReducer from '../features/chat/chatSlice'

const chatConfig = {
	key: 'chat',
	storage,
}

const rootReducer = combineReducers({
	chat: persistReducer(chatConfig, chatReducer),
})

const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

const persistor = persistStore(store)

const storeAndPersistor = { store, persistor }

export type AppDispatch = typeof storeAndPersistor.store.dispatch
export type RootState = ReturnType<typeof storeAndPersistor.store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>

export default storeAndPersistor
