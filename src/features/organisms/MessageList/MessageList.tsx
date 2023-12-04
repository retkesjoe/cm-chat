import { FC, useEffect, useState } from 'react'
import { Grid } from '@mui/material'

import { useAppSelector } from '../../../app/hooks'
import { selectChat } from '../../chat/chatSlice'
import MessageItem from '../../molecules/MessageItem/MessageItem'

/**
 * @name MessageList
 * @category Component
 * @description
 *
 * @return {JSX.Element} JSX.Element
 */
const MessageList: FC = (): JSX.Element => {
	const chatInit = useAppSelector(selectChat)
	const [chat, setChat] = useState(chatInit)

	useEffect(() => {
		const interval = setInterval(() => setChat(chatInit), 1000)
		return () => {
			clearInterval(interval)
		}
	}, [chatInit])

	return (
		<Grid
			container
			wrap={'nowrap'}
			direction={'column'}
			rowSpacing={1}
			columnSpacing={{ xs: 1, sm: 2, md: 3 }}
			sx={{
				width: '100%',
				height: 'calc(100vh - 320px)',
				overflowY: 'auto',
				bgcolor: 'background.paper',
			}}
		>
			{chat.map((value, index) => {
				return (
					<MessageItem
						key={index}
						sender={value.sender}
						message={value.message}
						date={value.date}
					/>
				)
			})}
		</Grid>
	)
}

export default MessageList
