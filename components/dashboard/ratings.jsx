import { Avatar, Flex, Icon, IconButton, Image, Td, Text, Tr } from '@chakra-ui/react'
import { FiMoreHorizontal, FiStar } from 'react-icons/fi'
import Card from 'components/_card'
import Table from 'components/_table'

const Ratings = () => {
	return (
		<Card>
			<Flex justify="space-between" align="center" gap={6} mb={6}>
				<Text fontSize="xl" fontWeight="semibold" color="accent-1">
					Product Ratings
				</Text>

				<IconButton size="xs" icon={<FiMoreHorizontal size={12} />} />
			</Flex>

			<Table
				data={['', '', '', '', '']}
				fetched={true}
				th={['Customer', 'Product', 'Stars', 'Date', '']}
				td={(data, index) => (
					<Tr key={index}>
						<Td maxW={200}>
							<Flex align="center" gap={3}>
								<Avatar name="" />

								<Text overflow="hidden" textOverflow="ellipsis">
									Customer Name
								</Text>
							</Flex>
						</Td>

						<Td>
							<Image boxSize={8} alt="product-name" src="/assets/product.png" />
						</Td>

						<Td>
							<Flex align="center">
								<Icon as={FiStar} boxSize={4} fill="currentcolor" color="brand.default" />
								<Icon as={FiStar} boxSize={4} fill="currentcolor" color="brand.default" />
								<Icon as={FiStar} boxSize={4} fill="currentcolor" color="brand.default" />
								<Icon as={FiStar} boxSize={4} fill="currentcolor" color="brand.default" />
								<Icon as={FiStar} boxSize={4} fill="currentcolor" color="brand.default" />
							</Flex>
						</Td>

						<Td>
							<Text>Dec 25, 2022</Text>
						</Td>

						<Td textAlign="right">
							<IconButton size="xs" icon={<FiMoreHorizontal size={12} />} />
						</Td>
					</Tr>
				)}
				settings={{
					search: 'off',
					controls: 'off',
					show: [5]
				}}
			/>
		</Card>
	)
}

export default Ratings
