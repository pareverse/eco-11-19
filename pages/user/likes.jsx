import { Container, Flex, Text } from '@chakra-ui/react'

const Likes = () => {
	return (
		<Container>
			<Flex justify="space-between" align="center" gap={6} mb={6}>
				<Text fontSize="2xl" fontWeight="semibold" color="accent-1">
					My Likes
				</Text>
			</Flex>
		</Container>
	)
}

export default Likes
