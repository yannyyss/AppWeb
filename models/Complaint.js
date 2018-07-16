const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			childPath: 'complaint'
		},
		text: {
			type: String,
			required: true
		},
		location: {
			type: {
				type: String,
				default: 'Point'
			},
			address: String,
			coordinates: [
				{
					type: Number
				}
			]
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
);

module.exports = mongoose.model('Complaint', complaintSchema);
