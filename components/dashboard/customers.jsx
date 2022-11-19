import { Avatar, Flex, IconButton, Td, Text, Tr } from '@chakra-ui/react'
import { FiMoreHorizontal } from 'react-icons/fi'
import Card from 'components/_card'
import Table from 'components/_table'

const Customers = () => {
	return (
		<Card>
			<Flex justify="space-between" align="center" gap={6} mb={6}>
				<Text fontSize="xl" fontWeight="semibold" color="accent-1">
					New Customers
				</Text>

				<IconButton size="xs" icon={<FiMoreHorizontal size={12} />} />
			</Flex>

			<Table
				data={['', '', '', '', '']}
				fetched={true}
				th={['Customer', , '']}
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

export default Customers
