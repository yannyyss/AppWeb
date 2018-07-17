const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    tipodelugar:{
        type: String,
        enum: ["Robo","Acoso Sexual","Grupos Sospechosos","Enfrentamientos Armados","Sin Iluminación","Agresión"],
    },
    location: {
        type: {
            type: String,
            default: "Point"
        },
        address: String,
        coordinates: [
            {
                type: Number
            }
        ]
    },
    comentario: String
},{
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

module.exports = mongoose.model('Place', placeSchema);