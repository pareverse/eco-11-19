import mongoose from 'mongoose'

const RatingsAndReviewsSchema = mongoose.Schema(
	{
		name: {
			type: String,
			default: ''
		},
		email: {
			type: String,
			default: ''
		},
		avatar: {
			type: String,
			default: ''
		},
		address: {
			type: Object,
			default: {}
		},
		order: {
			id: {
				type: String,
				default: ''
			}
		},
		ratings: {
			type: 'Number',
			default: 5
		},
		reviews: {
			type: String,
			default: ''
		},
		image: {
			type: String,
			default: ''
		},
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

const RatingsAndReviews = mongoose.models.RatingsAndReviews || mongoose.model('RatingsAndReviews', RatingsAndReviewsSchema)

export default RatingsAndReviews
