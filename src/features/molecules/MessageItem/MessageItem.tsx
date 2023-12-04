import { FC } from 'react'
import { ListItem, ListItemText, Typography } from '@mui/material'

import { Props } from './MessageItem.interface'

/**
 * @name MessageItem
 * @category Component
 * @description Simple component responsible to render a single message element
 * that contains the name of the sender, the date-time and the message.
 *
 * @param {string} props.sender - Name of the message sender.
 * @param {string} props.date - Sending date.
 * @param {string} props.message - Message sent by the user.
 *
 * @returns {JSX.Element} JSX.Element
 */
const MessageItem: FC<Props> = (props: Props): JSX.Element => {
	return (
		<ListItem alignItems='flex-start'>
			<ListItemText
				primary={
					<>
						<Typography
							component='div'
							variant='body1'
							fontSize='1.5rem'
							color='text.primary'
						>
							{props.sender}
						</Typography>
						<Typography
							component='small'
							fontSize='.8rem'
							color='text.secondary'
						>
							{props.date}
						</Typography>
					</>
				}
				secondary={<>{props.message}</>}
			/>
		</ListItem>
	)
}

export default MessageItem
