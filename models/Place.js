const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			childPath: 'places'
		},
		tipodelugar: {
			type: String,
			enum: [
				
				'ROBO',
				'ACOSO-SEXUAL',
				'GRUPOS-SOSPECHOSOS',
				'ENFRENTAMIENTOS-ARMADOS',
				'SIN-ILUMINACION',
				'AGRESION'
			]
		},
		image: String,
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
		},
		comentario: String
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
);

module.exports = mongoose.model('Place', placeSchema);
