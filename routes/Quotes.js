const express = require('express');
const quoteRouter = express.Router();
const User = require('../models/User');

quoteRouter.route('/:userId')
.get((req,res) => {
 User.findById(req.params.userId)
 .then(response => {
  if (!response) {
   res.json({'quotes': false}); 
  } else {
   res.json({response}); 
  }
 }).catch(err => console.log(err))
})

quoteRouter.route('/:userId')
.post((req,res) => {
 let {quote, author} = req.body;
 User.findById(req.params.userId)
 .then(User => {
  User.quotes.push({quote,author})
  User.save()
 }).catch(err => console.log(err))
  .then(User => {
   res.json({User});
  }).catch(err => console.log(err))
})

quoteRouter.route('/:userId/:favoriteId')
.delete((req,res) => {
 User.findById(req.params.userId)
  .then(User => {
   User.quotes.id(req.params.favoriteId).remove()
   User.save()
  })
  .catch(err => console.log(err))
  .then(User => {
   res.json({User});
  }).catch(err => console.log(err))
})



    
module.exports = quoteRouter;