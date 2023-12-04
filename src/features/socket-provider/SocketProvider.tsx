import React, {
	createContext,
	FunctionComponent,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'
import io, { ManagerOptions, Socket, SocketOptions } from 'socket.io-client'

export const SocketContext = createContext<Socket | null>(null)

const SocketProvider: FunctionComponent<{ children: ReactNode }> = ({
	children,
}: {
	children: ReactNode
}) => {
	const [connection, setConnection] = useState<Socket | null>(null)

	const options: Partial<ManagerOptions & SocketOptions> | undefined = useMemo(
		() => ({}),
		[],
	)

	useEffect(() => {
		try {
			const socketConnection = io('http://127.0.0.1:9000', options)
			setConnection(socketConnection)
		} catch (err) {
			console.log(err)
		}
	}, [options])

	return (
		<SocketContext.Provider value={connection}>
			{children}
		</SocketContext.Provider>
	)
}

export const useSocket = (): Socket | null => {
	const ctx = useContext(SocketContext)
	if (ctx === undefined) {
		throw new Error('useSocket can only be used inside SocketContext')
	}
	return ctx
}

export default SocketProvider
