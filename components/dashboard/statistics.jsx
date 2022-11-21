import { Box, Flex, GridItem, Icon, Text } from '@chakra-ui/react'
import { FiDollarSign, FiGrid, FiPackage, FiUsers } from 'react-icons/fi'
import Card from 'components/_card'

const Statistics = () => {
	return (
		<>
			<GridItem colSpan={{ base: 12, md: 6, '2xl': 3 }}>
				<Card>
					<Flex justify="space-between" align="center">
						<Flex direction="column" gap={1} w="calc(100% - 76px)">
							<Text fontSize="2xl" fontWeight="semibold" color="accent-1" noOfLines={1}>
								0
							</Text>

							<Text fontSize="sm" fontWeight="medium" color="accent-1">
								Total Customers
							</Text>
						</Flex>

						<Flex bg="brand.default" justify="center" align="center" borderRadius="full" h={16} w={16}>
							<Icon as={FiUsers} boxSize={6} color="white" />
						</Flex>
					</Flex>
				</Card>
			</GridItem>

			<GridItem colSpan={{ base: 12, md: 6, '2xl': 3 }}>
				<Card>
					<Flex justify="space-between" align="center">
						<Flex direction="column" gap={1} w="calc(100% - 76px)">
							<Text fontSize="2xl" fontWeight="semibold" color="accent-1" noOfLines={1}>
								0
							</Text>

							<Text fontSize="sm" fontWeight="medium" color="accent-1">
								Total Products
							</Text>
						</Flex>

						<Flex bg="brand.default" justify="center" align="center" borderRadius="full" h={16} w={16}>
							<Icon as={FiGrid} boxSize={6} color="white" />
						</Flex>
					</Flex>
				</Card>
			</GridItem>

			<GridItem colSpan={{ base: 12, md: 6, '2xl': 3 }}>
				<Card>
					<Flex justify="space-between" align="center">
						<Flex direction="column" gap={1} w="calc(100% - 76px)">
							<Text fontSize="2xl" fontWeight="semibold" color="accent-1" noOfLines={1}>
								0
							</Text>

							<Text fontSize="sm" fontWeight="medium" color="accent-1">
								Total Orders
							</Text>
						</Flex>

						<Flex bg="brand.default" justify="center" align="center" borderRadius="full" h={16} w={16}>
							<Icon as={FiPackage} boxSize={6} color="white" />
						</Flex>
					</Flex>
				</Card>
			</GridItem>

			<GridItem colSpan={{ base: 12, md: 6, '2xl': 3 }}>
				<Box bg="brand.default" borderRadius={12} p={6}>
					<Flex justify="space-between" align="center">
						<Flex direction="column" gap={1} w="calc(100% - 76px)">
							<Text fontSize="2xl" fontWeight="semibold" color="white" noOfLines={1}>
								₱0.00
							</Text>

							<Text fontSize="sm" fontWeight="medium" color="white">
								Total Sales
							</Text>
						</Flex>

						<Flex bg="white" justify="center" align="center" borderRadius="full" h={16} w={16}>
							<Icon as={FiDollarSign} boxSize={6} color="brand.default" />
						</Flex>
					</Flex>
				</Box>
			</GridItem>
		</>
	)
}

export default Statistics
