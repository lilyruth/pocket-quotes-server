const express = require('express');
const router = express.Router();

// BcryptJS
const bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);

//User model 
const User = require('../models/User');

// Register
router.post('/register', (req, res) => {
 let {name, email, password} = req.body;
 name = name.trim();
 email = email.trim();
 password = password.trim();

 User.findOne({email})
  .then(result =>   {
     if (result) {
      res.json({message: 'The email aready exists'})
     } else if (!result) {
      bcrypt.genSalt(10, function(err, salt) {
         bcrypt.hash(password, salt, function(err, hash) {
            const newUser = new User({
             name,
             email,
             password: hash
            })
  
      newUser.save().then(record => {
        res.json({status: 'success', message: 'login successful', record})
      
      }).catch(err => {
       console.log(err)
      })
     })
    })  

     }
  })
  .catch(err => {
    console.log(err)
    res.json(err)
   })

})

// Sign in 
router.post('/login', (req, res) => {
   let {email, password} = req.body;

   email = email.trim();
   password = password.trim();
  
   User.findOne({email})
    .then(record =>   {
       if (record) {
         let hash = record.password;
         bcrypt.compare(password, hash)
            .then(result => {
               if (result) {  
                  res.json({status: 'success', message: 'login successful', record})
               } else {
                  res.json({status: 'failed', message: 'invalid password entered'})
               }
            })
            .catch(err => console.log(err))
       } else {
         res.json({status: 'failed', message: 'no user found'})
       }
    })
    .catch(err => {
      console.log(err)
      res.json(err)
     })
  
   })

module.exports = router;