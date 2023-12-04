import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Button, TextField, Paper, Grid, Typography } from '@mui/material'

import { useAppDispatch } from '../../app/hooks'
import { useSocket } from '../socket-provider/SocketProvider'
import { send } from './chatSlice'
import { IMessageItem } from '../molecules/MessageItem/MessageItem.interface'

const defaultValues = {
	sender: '',
	message: '',
}

const Chat: React.FC = (): JSX.Element => {
	const {
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm({ defaultValues })
	const dispatch = useAppDispatch()
	const socket = useSocket()
	const [messages, setMessages] = useState<IMessageItem[]>([])

	const onSubmit = (data: Omit<IMessageItem, 'date'>) => {
		reset(defaultValues)
		socket?.emit('chat message', {
			...data,
			date: format(new Date(), `do MMM yyyy - HH:mm`, { locale: enGB }),
		})
	}

	useEffect(() => {
		socket?.on('chat message', data => {
			dispatch(send(data))
			setMessages([...messages, data])
		})
		return () => {
			socket?.off('chat message')
		}
	}, [messages, socket, dispatch])

	return (
		<Paper
			style={{ position: 'fixed', bottom: 0, width: '100%' }}
			sx={{ p: 3 }}
		>
			<Grid
				container
				component='form'
				direction='column'
				noValidate
				autoComplete='off'
				rowGap='12px'
			>
				<Grid container direction='column' rowGap={'12px'}>
					<Controller
						defaultValue={''}
						name={'sender'}
						control={control}
						rules={{ required: true, maxLength: 40 }}
						render={({ field }) => (
							<Grid container direction='column' rowGap={'6px'}>
								<TextField
									{...field}
									error={
										errors.message?.type === 'required' ||
										errors.message?.type === 'maxLength'
									}
									label={'Full Name'}
									size='small'
								/>
								{errors.sender?.type === 'required' && (
									<Typography
										component='small'
										fontSize='.6rem'
										color='text.secondary'
									>
										{'*The name is required'}
									</Typography>
								)}

								{errors.sender?.type === 'maxLength' && (
									<Typography
										component='small'
										fontSize='.6rem'
										color='text.secondary'
									>
										{'*The name maximum length exceeded'}
									</Typography>
								)}
							</Grid>
						)}
					/>
					<Controller
						defaultValue={''}
						name={'message'}
						control={control}
						rules={{ required: true, maxLength: 2048 }}
						render={({ field }) => (
							<Grid container direction='column' rowGap={'6px'}>
								<TextField
									{...field}
									multiline
									error={
										errors.message?.type === 'required' ||
										errors.message?.type === 'maxLength'
									}
									aria-label='Message textbox'
									minRows={3}
									placeholder='Enter your message...'
								/>
								{errors.message?.type === 'required' && (
									<Typography
										component='small'
										fontSize='.6rem'
										color='text.secondary'
									>
										{'*The message field is required'}
									</Typography>
								)}

								{errors.sender?.type === 'maxLength' && (
									<Typography
										component='small'
										fontSize='.6rem'
										color='text.secondary'
									>
										{'*The message field maximum length exceeded'}
									</Typography>
								)}
							</Grid>
						)}
					/>
				</Grid>
				<Button onClick={handleSubmit(onSubmit)} variant='outlined'>
					Submit
				</Button>
			</Grid>
		</Paper>
	)
}

export default Chat
