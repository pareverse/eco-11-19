import { PayPalButtons } from '@paypal/react-paypal-js'

const PaypalButton = ({ amount, placeOrder }) => {
	const handleApprove = (orderId) => {
		console.log(orderId)
		placeOrder()
	}

	return (
		<PayPalButtons
			createOrder={(data, actions) => {
				return actions.order.create({
					purchase_units: [
						{
							amount: {
								value: amount
							},
							currency_code: 'PHP'
						}
					]
				})
			}}
			onApprove={(data, actions) => {
				handleApprove(data.orderID)
			}}
			onError={(err) => {
				console.log(err)
			}}
		/>
	)
}

export default PaypalButton
