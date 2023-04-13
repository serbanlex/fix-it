var express = require('express');
var router = express.Router();
var {Client} = require('../models');
var {User} = require('../models');


router.get('/clients', function(req, res, next) {
  res.send({"message": "ayy"});
});

router.post('/clients', async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    await User.create(
        { firstName, lastName, email, phoneNumber, password }
      ).then(async (user) => {
        await Client.create({ ID: user.ID }).then((client) => {
          res.status(201).json(client);
        });
      })
    
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
