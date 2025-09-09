const mongoose = require("mongoose");

imageSchema = new mongoose.Schema ({
    imageUrl: {
        type: String,
        required: true,
    },
    imageAlt: {
        type: String
    }
});

const cardsSchema = new mongoose.Schema({
   brandName: {
    type: String,
    required: true
   }, 
   seriesName: {
    type: String,
    required: true
   }, 
   characterName: {
    type: String,
    required: true
   } ,
   releaseYear: {
    type: Number,
    required: true
   },
   images: [imageSchema],
   category: {
    type: String,
    enum: ['common','uncommon', 'rare', 'super-rare', 'ultra-rare', 'die-cast-rare', 'parallels', 'refractor', 'autograph', 'dual-autograph', 'signature' ]
   },
   owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
   }
});



const Card = mongoose.model("Card", cardsSchema);

module.exports = Card;

