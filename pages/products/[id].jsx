import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from 'instance'
import { Badge, Button, Container, Flex, FormControl, FormErrorMessage, Grid, GridItem, Icon, Image, Input, InputGroup, InputLeftElement, InputRightElement, Select, Spinner, Text, useToast } from '@chakra-ui/react'
import { FiHeart, FiMinus, FiPlus, FiShoppingCart, FiStar } from 'react-icons/fi'
import Overview from 'components/products/overview'
import Featured from 'components/products/featured'
import Toast from 'components/_toast'

const Product = () => {
	const router = useRouter()
	const { id } = router.query
	const { data: session } = useSession()
	const queryClient = useQueryClient()
	const { data: product, isFetched: isProductFetched } = useQuery(['products', id], () => api.get('/products', id))
	const { data: variants, isFetched: isVariantsFetched } = useQuery(['variants'], () => api.get('/variants', id))
	const [mounted, setMounted] = useState(false)
	const [quantity, setQuantity] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const toast = useToast()

	const {
		register,
		watch,
		formState: { errors },
		handleSubmit
	} = useForm()

	const colors = (data) => {
		let color = []

		data.map((data) => {
			if (color !== data.color) {
				color.push(data.color)
			}
		})

		return color.filter((value, index) => color.indexOf(value) === index)
	}

	const qty = (data) => {
		let size = 0

		if (watch('colors') && watch('sizes')) {
			data.filter((data) => watch('colors') === data.color && watch('sizes') === data.size).map((data) => {
				size = data.quantity
			})

			return size
		} else {
			return size
		}
	}

	const cartMutation = useMutation((data) => api.create('/carts', data), {
		onSuccess: () => {
			queryClient.invalidateQueries('cart')
			setIsLoading(false)

			toast({
				position: 'top',
				render: () => <Toast title="Success" description="Product successfully added to cart." />
			})
		}
	})

	const addToCart = (data) => {
		setIsLoading(true)

		cartMutation.mutate({
			user: {
				id: session.user.id
			},
			product: {
				id: id,
				price: product.price,
				discount: product.discount,
				color: data.colors,
				size: data.sizes,
				quantity: quantity
			}
		})
	}

	useEffect(() => {
		if (isProductFetched) {
			setMounted(true)
		}
	}, [isProductFetched])

	if (!mounted || !isProductFetched || !isVariantsFetched) {
		return (
			<Flex p={6}>
				<Spinner color="brand.default" />
			</Flex>
		)
	}

	return (
		<Container>
			<Grid alignItems="start" templateColumns="repeat(12, 1fr)" gap={{ base: '48px 0', lg: '48px 24px' }}>
				<GridItem colSpan={{ base: 12, lg: 6 }}>
					<Image alt={product.name} src={product.image} />
				</GridItem>

				<GridItem colSpan={{ base: 12, lg: 6 }}>
					<Flex direction="column" gap={12}>
						<Flex align="center" direction="column" gap={3}>
							<Text fontSize="2xl" fontWeight="semibold" color="accent-1">
								{product.name}
							</Text>

							<Flex align="center" gap={1}>
								<Text fontSize="sm" fontWeight="medium" color="brand.default">
									5.0
								</Text>

								<Flex align="center">
									<Icon as={FiStar} boxSize={4} fill="currentcolor" color="brand.default" />
									<Icon as={FiStar} boxSize={4} fill="currentcolor" color="brand.default" />
									<Icon as={FiStar} boxSize={4} fill="currentcolor" color="brand.default" />
									<Icon as={FiStar} boxSize={4} fill="currentcolor" color="brand.default" />
									<Icon as={FiStar} boxSize={4} fill="currentcolor" color="brand.default" />
								</Flex>
							</Flex>

							<Flex align="center" gap={6}>
								<Text fontSize="sm" fontWeight="medium" color="accent-1">
									99 Ratings
								</Text>

								<Text fontSize="sm" fontWeight="medium" color="accent-1">
									99 Sold
								</Text>

								<Text fontSize="sm" fontWeight="medium" color="accent-1">
									99 Views
								</Text>
							</Flex>

							<Flex align="center" gap={3}>
								{product.discount.percentage && (
									<Text fontSize="sm" fontWeight="medium" textDecoration="line-through">
										₱{product.price}
									</Text>
								)}

								<Text fontSize="2xl" fontWeight="semibold" color="brand.default">
									₱{(product.price - product.price * (product.discount.percentage / 100)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
								</Text>

								{product.discount.percentage && <Badge colorScheme="red">{product.discount.percentage}% OFF</Badge>}
							</Flex>
						</Flex>

						<form onSubmit={handleSubmit(addToCart)}>
							<Flex direction="column" gap={6} mx="auto" w="full" maxW={{ lg: 364 }}>
								<Flex direction="column" gap={3}>
									<Text fontWeight="semibold" color="accent-1">
										Colors
									</Text>

									<FormControl isInvalid={errors.colors}>
										<Select placeholder="Select Colors" size="lg" {...register('colors', { required: true })}>
											{colors(variants).map((color, index) => (
												<option key={index} value={color}>
													{color}
												</option>
											))}
										</Select>

										<FormErrorMessage>Please select a color.</FormErrorMessage>
									</FormControl>
								</Flex>

								<Flex direction="column" gap={3}>
									<Text fontWeight="semibold" color="accent-1">
										Sizes
									</Text>

									<FormControl isInvalid={errors.sizes}>
										<Select placeholder="Select Sizes" size="lg" {...register('sizes', { required: true })}>
											{watch('colors') &&
												variants
													.filter((variant) => (watch('colors') ? watch('colors') === variant.color : variant))
													.map((variant, index) => (
														<option key={index} value={variant.size}>
															{variant.size}
														</option>
													))}
										</Select>

										<FormErrorMessage>Please select a size.</FormErrorMessage>
									</FormControl>
								</Flex>

								<Flex direction="column" gap={3}>
									<Text fontWeight="semibold" color="accent-1">
										Quantity
									</Text>

									<FormControl isInvalid={errors.quantity}>
										<InputGroup>
											<InputLeftElement type="button" as="button" pt={1} pl={1} color="accent-1" cursor={quantity === 1 ? 'not-allowed' : 'pointer'} disabled={quantity === 1 ? true : false} onClick={() => setQuantity(quantity - 1)}>
												<FiMinus size={16} />
											</InputLeftElement>

											<Input type="number" value={quantity} size="lg" textAlign="center" cursor="default" readOnly />

											<InputRightElement type="button" as="button" pt={1} pr={1} color="accent-1" cursor={quantity >= qty(variants) ? 'not-allowed' : 'pointer'} disabled={quantity >= qty(variants)} onClick={() => setQuantity(quantity + 1)}>
												<FiPlus size={16} />
											</InputRightElement>
										</InputGroup>

										<FormErrorMessage>Please add one or more items.</FormErrorMessage>
									</FormControl>
								</Flex>

								<Text fontSize="sm" fontWeight="medium" color="accent-1" key={1}>
									{qty(variants)} Items available
								</Text>

								<Flex justify="center" gap={6}>
									<Button type="submit" size="lg" colorScheme="brand" w="full" leftIcon={<FiShoppingCart size={16} />} isLoading={isLoading}>
										Add to Cart
									</Button>

									<Button type="button" size="lg" w="full" leftIcon={<FiHeart size={16} />}>
										Add to Likes
									</Button>
								</Flex>
							</Flex>
						</form>
					</Flex>
				</GridItem>

				<GridItem colSpan={{ base: 12, lg: 8, xl: 9 }}>
					<Overview id={id} product={product} />
				</GridItem>

				<GridItem colSpan={{ base: 12, lg: 4, xl: 3 }}>
					<Featured />
				</GridItem>
			</Grid>
		</Container>
	)
}

export default Product
