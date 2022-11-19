import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from 'instance'
import { Avatar, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, Input, Select, Text, useToast } from '@chakra-ui/react'
import Card from 'components/_card'
import Toast from 'components/_toast'

const Profile = () => {
	const { data: session } = useSession()
	const [isLoading, setIsLoading] = useState(false)
	const toast = useToast()

	const {
		register,
		setValue,
		formState: { errors },
		clearErrors,
		handleSubmit
	} = useForm()

	const profile = useMutation((data) => api.update('/users', session.user.id, data), {
		onSuccess: () => {
			clearErrors()
			setIsLoading(false)

			toast({
				position: 'top',
				render: () => <Toast title="Success" description="" />
			})
		}
	})

	const onSubmit = (data) => {
		setIsLoading(true)
		profile.mutate(data)
	}

	useEffect(() => {
		setValue('name', session.user.name)
		setValue('contact', session.user.contact)
		setValue('gender', session.user.gender)
		setValue('date_of_birth', session.user.date_of_birth)
	}, [])

	return (
		<Container>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid templateColumns="1fr" gap={6}>
					<GridItem>
						<Text fontSize="2xl" fontWeight="semibold" color="accent-1">
							My Profile
						</Text>
					</GridItem>

					<GridItem>
						<Card>
							<Flex direction="column" gap={6}>
								<Flex p={6} w="full">
									<Avatar name={session.user.name} src={session.user.image} size="xl" />
								</Flex>

								<FormControl isInvalid={errors.name}>
									<FormLabel>Full Name</FormLabel>
									<Input size="lg" {...register('name', { required: true })} />
									<FormErrorMessage>This field is required.</FormErrorMessage>
								</FormControl>

								<FormControl>
									<FormLabel>Email Address</FormLabel>
									<Input size="lg" defaultValue={session.user.email} cursor="not-allowed" readOnly />
								</FormControl>

								<FormControl isInvalid={errors.contact}>
									<FormLabel>Mobile Number</FormLabel>
									<Input size="lg" {...register('contact', { required: true })} />
									<FormErrorMessage>This field is required.</FormErrorMessage>
								</FormControl>

								<FormControl isInvalid={errors.gender}>
									<FormLabel>Gender</FormLabel>

									<Select size="lg" {...register('gender', { required: true })}>
										<option value="male">Male</option>
										<option value="female">Female</option>
										<option value="other">Other</option>
									</Select>

									<FormErrorMessage>This field is required.</FormErrorMessage>
								</FormControl>

								<FormControl isInvalid={errors.date_of_birth}>
									<FormLabel>Date of Birth</FormLabel>
									<Input type="date" size="lg" {...register('date_of_birth', { required: true })} />
									<FormErrorMessage>This field is required.</FormErrorMessage>
								</FormControl>
							</Flex>
						</Card>
					</GridItem>

					<GridItem>
						<Flex justify="end" align="center" gap={3}>
							<Button type="submit" size="lg" colorScheme="brand" isLoading={isLoading}>
								Save Changes
							</Button>
						</Flex>
					</GridItem>
				</Grid>
			</form>
		</Container>
	)
}

export default Profile
