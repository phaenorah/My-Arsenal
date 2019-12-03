const { PetController } = require('../controllers');
const router = require('express').Router();

module.exports = router
  .get('/', PetController.index)
  .post('/', PetController.create)
  .get('/:pet_id', PetController.show)
  .put('/:pet_id', PetController.update)
  .delete('/:pet_id', PetController.destroy);
