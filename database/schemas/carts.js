import mongoose from 'mongoose'

const CartsSchema = mongoose.Schema(
	{
		user: {
			id: {
				type: String,
				default: ''
			}
		},
		products: [
			{
				id: String,
				price: Number,
				discount: {
					percentage: Number
				},
				color: String,
				size: String,
				quantity: Number
			}
		],
		created: {
			type: String,
			default: ''
		},
		updated: {
			type: String,
			default: ''
		}
	},
	{ timestamps: true }
)

const Carts = mongoose.models.Carts || mongoose.model('Carts', CartsSchema)

export default Carts
