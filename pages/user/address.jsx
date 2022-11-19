import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from 'instance'
import { Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, Input, Select, Text, useToast } from '@chakra-ui/react'
import Card from 'components/_card'
import Toast from 'components/_toast'

const Address = () => {
	const { data: session } = useSession()
	const [isLoading, setIsLoading] = useState(false)
	const toast = useToast()

	const {
		register,
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

		profile.mutate({
			address: {
				...data
			}
		})
	}

	return (
		<Container>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid templateColumns="1fr" gap={6}>
					<GridItem>
						<Text fontSize="2xl" fontWeight="semibold" color="accent-1">
							My Address
						</Text>
					</GridItem>

					<GridItem>
						<Card>
							<Flex direction="column" gap={6}>
								<Flex align="start" direction={{ base: 'column', lg: 'row' }} gap={6}>
									<FormControl isInvalid={errors.region}>
										<FormLabel>Region</FormLabel>

										<Select placeholder="⠀" defaultValue={session.user.address.region} size="lg" {...register('region', { required: true })}>
											<option>Metro Manila</option>
										</Select>

										<FormErrorMessage>This field is required.</FormErrorMessage>
									</FormControl>

									<FormControl isInvalid={errors.city}>
										<FormLabel>City</FormLabel>

										<Select placeholder="⠀" defaultValue={session.user.address.city} size="lg" {...register('city', { required: true })}>
											<option>Las Pinas City</option>
										</Select>

										<FormErrorMessage>This field is required.</FormErrorMessage>
									</FormControl>

									<FormControl isInvalid={errors.barangay}>
										<FormLabel>Barangay</FormLabel>

										<Select placeholder="⠀" defaultValue={session.user.address.barangay} size="lg" {...register('barangay', { required: true })}>
											<option>Pulang Lupa Uno</option>
											<option>Pulang Lupa Dos</option>
										</Select>

										<FormErrorMessage>This field is required.</FormErrorMessage>
									</FormControl>
								</Flex>

								<FormControl isInvalid={errors.address}>
									<FormLabel>Street Name, Building, House No.</FormLabel>
									<Input defaultValue={session.user.address.address} size="lg" {...register('address', { required: true })} />
									<FormErrorMessage>This field is required.</FormErrorMessage>
								</FormControl>

								<FormControl isInvalid={errors.postal}>
									<FormLabel>Postal Code</FormLabel>
									<Input type="number" defaultValue={session.user.address.postal} size="lg" {...register('postal', { required: true })} />
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

export default Address
