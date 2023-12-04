import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import storeAndPersistor from './app/store.ts'
import SocketProvider from './features/socket-provider/SocketProvider'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={storeAndPersistor.store}>
			<PersistGate loading={null} persistor={storeAndPersistor.persistor}>
				<SocketProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</SocketProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
)
