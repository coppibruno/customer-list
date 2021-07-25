const express = require('express');
const router = express.Router();

const CustomerController = require('../controller/Customer');
const CustomerValidation = require('../middlewares/CustomerValidationCreate');
const CustomerValidationUpdate = require('../middlewares/CustomerValidationUpdate');

//insert
router.post('/', CustomerValidation, CustomerController.create);

//get
router.get('/', CustomerController.all);

//by id
router.get('/:id', CustomerController.getById);

//filter by name
router.get('/filter/:name', CustomerController.getByName);

//update by id
router.put('/:id', CustomerValidationUpdate, CustomerController.update);

//delete by id
router.delete('/:id', CustomerController.delete);

module.exports = router;