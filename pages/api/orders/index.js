import connect from 'database/connect'
import Carts from 'database/schemas/carts'
import Orders from 'database/schemas/orders'

export default async (req, res) => {
	const { method } = req
	await connect()

	switch (method) {
		case 'GET':
			try {
				const data = await Orders.find({}).sort({ createdAt: -1 })
				res.status(200).send(data)
			} catch (error) {
				return res.status(400).send('request failed.')
			}

			break

		case 'POST':
			try {
				const { data } = req.body

				await Orders.create({
					...data,
					to_pay: {
						status: true,
						date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
					},
					created: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }),
					updated: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
				})

				await Carts.findOneAndUpdate(
					{ user: { id: data.user.id } },
					{
						products: [],
						updated: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
					}
				)

				res.status(200).send('request success.')
			} catch (error) {
				return res.status(400).send('request failed.')
			}

			break

		case 'PATCH':
			try {
				const { id, data } = req.body

				switch (data.type) {
					case 'to_ship':
						if (data.status) {
							await Orders.findByIdAndUpdate(
								{ _id: id },
								{
									to_ship: {
										status: true,
										date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
									},
									status: 'ship'
								}
							)
						} else {
							await Orders.findByIdAndUpdate(
								{ _id: id },
								{
									to_ship: {
										status: false,
										date: ''
									},
									status: 'pay'
								}
							)
						}

						break

					case 'to_receive':
						if (data.status) {
							await Orders.findByIdAndUpdate(
								{ _id: id },
								{
									to_receive: {
										status: true,
										date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
									},
									status: 'receive'
								}
							)
						} else {
							await Orders.findByIdAndUpdate(
								{ _id: id },
								{
									to_receive: {
										status: false,
										date: ''
									},
									status: 'ship'
								}
							)
						}

						break

					case 'completed':
						if (data.status) {
							await Orders.findByIdAndUpdate(
								{ _id: id },
								{
									completed: {
										status: true,
										date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
									},
									status: 'completed'
								}
							)
						} else {
							await Orders.findByIdAndUpdate(
								{ _id: id },
								{
									completed: {
										status: false,
										date: ''
									},
									status: 'receive'
								}
							)
						}

						break

					case 'cancelled':
						if (data.status) {
							await Orders.findByIdAndUpdate(
								{ _id: id },
								{
									cancelled: {
										status: true,
										date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
									},
									status: 'cancelled'
								}
							)
						} else {
							await Orders.findByIdAndUpdate(
								{ _id: id },
								{
									cancelled: {
										status: false,
										date: ''
									},
									status: 'pay'
								}
							)
						}

						break

					case 'to_rate':
						await Orders.findByIdAndUpdate(
							{ _id: id },
							{
								to_rate: {
									status: true,
									date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
								},
								status: 'rate'
							}
						)

						break

					default:
						return res.status(400).send('request failed.')
						break
				}

				res.status(200).send('request success.')
			} catch (error) {
				return res.status(400).send('request failed.')
			}

			break

		case 'DELETE':
			try {
				res.status(200).send('request success.')
			} catch (error) {
				return res.status(400).send('request failed.')
			}

			break

		default:
			res.status(400).send('request failed.')
			break
	}
}
