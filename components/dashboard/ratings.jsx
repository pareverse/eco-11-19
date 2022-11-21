import NextLink from 'next/link'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import { Avatar, Flex, Icon, IconButton, Image, Link, Td, Text, Tr } from '@chakra-ui/react'
import { FiMoreHorizontal, FiStar } from 'react-icons/fi'
import Card from 'components/_card'
import Table from 'components/_table'

const Ratings = () => {
	const { data: rnr, isFetched: isRnRFetched } = useQuery(['rnr_dashboard'], () => api.all('/rnr'))

	return (
		<Card>
			<Flex justify="space-between" align="center" gap={6} mb={6}>
				<Text fontSize="xl" fontWeight="semibold" color="accent-1">
					Service Ratings
				</Text>

				<IconButton size="xs" icon={<FiMoreHorizontal size={12} />} />
			</Flex>

			<Table
				data={rnr}
				fetched={isRnRFetched}
				th={['Customer', 'Order Id', 'Stars', 'Date', '']}
				td={(rnr, index) => (
					<Tr key={index}>
						<Td maxW={200}>
							<Flex align="center" gap={3}>
								<Avatar name={rnr.name} src={rnr.avatar} />

								<Text overflow="hidden" textOverflow="ellipsis">
									{rnr.name}
								</Text>
							</Flex>
						</Td>

						<Td maxW={100}>
							<NextLink href={`/admin/orders/${rnr.order.id}`} passHref>
								<Link as="span" noOfLines={1}>
									{rnr.order.id}
								</Link>
							</NextLink>
						</Td>

						<Td>
							<Flex align="center" gap={1}>
								<Text>{rnr.ratings}</Text>
								<Icon as={FiStar} boxSize={4} fill="currentcolor" color="brand.default" />
							</Flex>
						</Td>

						<Td>
							<Text>{rnr.created.split(',')[0]}</Text>
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
