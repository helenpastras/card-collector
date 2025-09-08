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
   charactername: {
    type: String,
    required: true
   } ,
   releaseYear: {
    type: Date,
    required: true
   },
   images: [imageSchema],
   catgory: {
    type: String,
    enum: ['common','uncommon', 'rare', 'super-rare', 'ultra-rare', 'die-cast-rare', 'parallels', 'refractor', 'autograph', 'dual-autograph', 'signature' ]
   },
   owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    equired: true
   }
});



const Card = mongoose.model("Card", cardsSchema);

module.exports = Card;

