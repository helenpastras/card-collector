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
  res.render('cards/new.ejs');
});


// router.get('/:cardId', async (req, res) => {
//   try {
//       const card = await Card.find({owner: req.session.user._id});
//       console.log(allCards);
//       res.render("cards/show.ejs", {cards: allCards});
//   } catch (error) {
//     // If any errors, log them and redirect back home
//     console.log(error);
//     res.redirect('/');
//   }
// });

router.get("/:cardId/edit", async (req,res) => {
    try {
        const owner = await User.findById(req.session.user._id);
        const card = owner.cards.id(req.params.cardId);
        res.render("cards/edit.ejs", {
            card:card,
        });
    }catch (error){
        console.log(error);
        res.redirect(`/`);
    }
})

router.put('/:cardId', async (req, res) => {
  try {
    const owner = await User.findById(req.session.user._id);
    const cards = owner.cards.id(req.params.cardId);
    card.set(req.body);
    
    await card.save();
    
    res.redirect(`/cards/${req.params.cardId}`);
  } catch (error) {
    console.log(error);
    res.redirect(`/`);
  }
});

router.post("/", async (req,res) => {
  try {
      const newCard = new Card ({
        ...req.body,
        owner: req.session.user._id,
      })
      console.log("form submission: ", req.body);
      await newCard.save();
      res.redirect('/cards');
      console.log("new card: ", newCard)
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});
    


router.delete("/:cardId", async (req,res) => {
    try {
        const owner = await User.findById(req.session.user._id);
        owner.cards.id(req.params.cardId).deleteOne();
        await owner.save()
        res.redirect(`/cards`);
    } catch (error) {
        console.log(error);
        res.redirect(`/`);
    }
});


module.exports = router;
