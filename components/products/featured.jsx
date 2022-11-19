import NextLink from 'next/link'
import { Flex, Image, Text } from '@chakra-ui/react'
import Card from 'components/_card'

const Featured = () => {
	return (
		<Flex direction="column" gap={6}>
			{[...Array(3)].map((data, index) => (
				<NextLink href="/products/1" passHref key={index}>
					<Flex direction="column" gap={6}>
						<Card>
							<Image borderRadius={12} alt="product-name" src="/assets/product.png" />
						</Card>

						<Flex justify="space-between" align="center" gap={3}>
							<Text fontWeight="medium" color="accent-1" noOfLines={2}>
								Product Name
							</Text>

							<Text fontWeight="medium" color="brand.default">
								₱300
							</Text>
						</Flex>
					</Flex>
				</NextLink>
			))}
		</Flex>
	)
}

export default Featured
