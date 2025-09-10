const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Card = require("../models/cards.js")

// we will build out our router logic here
router.get('/', async (req, res) => {
  try {
    const cards = await Card.find({ owner: req.session.user._id });
    res.render('cards/index.ejs', {cards});
    console.log("Fetched cards:", cards);
  } catch (error) {
    console.log(error);
    res.redirect(`/`);
  }
});


router.get('/new', async (req, res) => {
  const categoryOptions = Card.schema.path('category').enumValues;
  res.render('cards/new.ejs', {categoryOptions});
});


router.get('/:cardId', async (req, res) => {
  try {
      const card = await Card.findOne({
      _id: req.params.cardId,
      owner: req.session.user._id
    });
      res.render("cards/show.ejs", { card });
      console.log("Card images:", card.images);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get("/:cardId/edit", async (req,res) => {
    try {
        const card = await Card.findOne({
        _id: req.params.cardId,
        owner: req.session.user._id
        });
        const categoryOptions = Card.schema.path('category').enumValues;
        res.render('cards/edit.ejs', { 
          card, categoryOptions 
        });
    }catch (error){
        console.log(error);
        res.redirect(`/`);
    }
})

router.put('/:cardId', async (req, res) => {
  try {
    const updatedImages = [];
      if (req.body['image-front']) {
        updatedImages.push({
          imageUrl: req.body['image-front'],
          imageAlt: 'front'
       });
      }
      if (req.body['image-back']) {
        updatedImages.push({
          imageUrl: req.body['image-back'],
          imageAlt: 'back'
        });
      }
    const card = await Card.findOne({
        _id: req.params.cardId,
        owner: req.session.user._id
        });
    card.set({
      ...req.body,
      owner: req.session.user._id,
      images: updatedImages,
    });
    
    await card.save();
    res.redirect(`/cards/${card._id}`);
  
  } catch (error) {
    console.log(error);
    res.redirect(`/`);
  }
});

router.post("/", async (req,res) => {
  try {
    const images = [];

    if (req.body['image-front']) {
      images.push({
        imageUrl: req.body['image-front'],
        imageAlt: 'front'
      });
    }

    if (req.body['image-back']) {
      images.push({
        imageUrl: req.body['image-back'],
        imageAlt: 'back'
      });
    }  
    const newCard = new Card ({
        ...req.body,
        owner: req.session.user._id,
        images
      })
      console.log("form submission: ", req.body);
      await newCard.save();
      res.redirect('/cards');
      console.log("new card: ", newCard)
      console.log("images:", JSON.stringify(card.images, null, 2));
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});
    


router.delete("/:cardId", async (req,res) => {
    try {
        const card = await Card.findOneAndDelete({
        _id: req.params.cardId,
        owner: req.session.user._id
        });

        res.redirect(`/cards`);
    } catch (error) {
        console.log(error);
        res.redirect(`/`);
    }
});


module.exports = router;
