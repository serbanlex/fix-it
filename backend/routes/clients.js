var express = require('express');
const clientRepo = require('../data-access/client.repo');
var router = express.Router();
var { Client, User } = require('../models');
const { FixItError } = require('../exceptions');

// TODO: Clean architecture - move the contents to a service/controller

router.get('/clients', async function (req, res, next) {
  //  #swagger.tags = ['Clients']
  try {
    const userData = await clientRepo.getAll();
    res.status(200).json(userData);
  }
  catch (error) {
    if (error instanceof FixItError) {
      res.status(error.statusCode).json({ "error": error.message });
    }
    console.log(error);
    res.status(500).json({ "error": error.message });
  };
});


router.get('/clients/:id', async function (req, res, next) {
  // #swagger.tags = ['Clients']
  try {
    const userData = await clientRepo.getById(req.params.id);
    res.status(200).json(userData);
  }
  catch (error) {
    if (error instanceof FixItError) {
      res.status(error.statusCode).json({ "error": error.message });
    }
    console.log(error);
    res.status(500).json({ "error": error.message });
  };
});


router.post('/clients', async (req, res) => {
  /*  #swagger.parameters['client'] = {
                in: 'body',
                description: 'Basic user details of the client',
                schema: {
                    $firstName: 'Jhon',
                    $lastName: 'Doe',
                    $email: 'bla@bla.com',
                    $phoneNumber: '123-456-7890',
                    $password: '123456',
                }
        } 
      #swagger.tags = ['Clients']
        */


  await clientRepo.create(req.body)
    .then((client) => {
      res.status(200).json(client);
    })
    .catch((error) => {
      if (error instanceof FixItError) {
        res.status(error.statusCode).json({ "error": error.message });
      }
      console.log(error);
      res.status(500).json({ "error": error.message });
    });
});

module.exports = router;
