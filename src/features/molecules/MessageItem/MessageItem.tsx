import { FC } from 'react'
import { ListItem, ListItemText, Typography } from '@mui/material'

import { Props } from './MessageItem.interface'

/**
 * @name MessageItem
 * @category Component
 * @description
 *
 * @param {string} props.sender - Name of the message sender.
 * @param {string} props.date - Sending date.
 * @param {string} props.message -
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
