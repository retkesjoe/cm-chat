import { IMessageItem } from '../molecules/MessageItem/MessageItem.interface'

export interface IMessage extends IMessageItem {
	sender: string
	message: string
	date: string
	status: 'idle' | 'loading' | 'failed'
}

export interface IChatState {
	chat: IMessage[]
	status: 'idle' | 'loading' | 'failed'
}
