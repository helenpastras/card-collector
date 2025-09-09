const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const bcrypt = require("bcrypt");





router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs");
});

router.get("/sign-out", (req,res) => {
    req.session.destroy();
    res.redirect("/");
})


router.post("/sign-up", async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
        return res.send("Username already taken.");
    }
    if (req.body.password !== req.body.confirmPassword) {
        return res.send("Password and Confirm Password must match");
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    // create the user 
    const user = await User.create(req.body);
    console.log(user)
    res.send(`Thanks for signing up ${user.username}`);
});

router.post('/sign-in', async (req, res) => {
  try {
    // First, get the user from the database
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      return res.send('Account not found. Please sign up.');
    }

    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    );
    if (!validPassword) {
      return res.send('Incorrect username/password match. Please try again.');
    }
    console.log(userInDatabase)
    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
    };
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



module.exports = router;