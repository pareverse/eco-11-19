import NextLink from 'next/link'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import { AspectRatio, Container, Flex, Image, Input, InputGroup, InputLeftElement, InputRightElement, SimpleGrid, Skeleton, Text } from '@chakra-ui/react'
import { FiSearch, FiSliders } from 'react-icons/fi'
import Card from 'components/_card'

const Products = () => {
	const { data: products, isFetched: isProductsFetched } = useQuery(['products'], () => api.all('/products'))

	return (
		<Container>
			<Flex direction="column" gap={6}>
				<form>
					<InputGroup>
						<InputLeftElement pt={2} pl={1} color="accent-1" pointerEvents="none">
							<FiSearch size={16} />
						</InputLeftElement>

						<Input placeholder="Search Products" size="xl" />

						<InputRightElement pt={2} pr={1} color="accent-1" cursor="pointer">
							<FiSliders size={16} />
						</InputRightElement>
					</InputGroup>
				</form>

				<SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
					{isProductsFetched
						? products.map((product) => (
								<NextLink href={`/products/${product._id}`} passHref key={product._id}>
									<Flex direction="column" gap={6}>
										<Card>
											<Image borderRadius={12} alt={product.name} src={product.image} />
										</Card>

										<Flex justify="space-between" align="center" gap={3}>
											<Text fontWeight="medium" color="accent-1" noOfLines={1}>
												{product.name}
											</Text>

											<Text fontWeight="medium" color="brand.default">
												₱{product.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
											</Text>
										</Flex>
									</Flex>
								</NextLink>
						  ))
						: [...Array(12)].map((data, index) => (
								<AspectRatio key={index}>
									<Skeleton borderRadius={12} />
								</AspectRatio>
						  ))}
				</SimpleGrid>
			</Flex>
		</Container>
	)
}

export default Products
