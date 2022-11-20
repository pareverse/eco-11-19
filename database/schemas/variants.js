import mongoose from 'mongoose'

const VariantsSchema = mongoose.Schema(
	{
		product: {
			id: {
				type: String,
				default: ''
			}
		},
		variants: [
			{
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

const Variants = mongoose.models.Variants || mongoose.model('Variants', VariantsSchema)

export default Variants
