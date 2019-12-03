const { ProductController } = require('../controllers');
const router = require('express').Router();

module.exports = router
  .get('/', ProductController.index)
  .post('/', ProductController.create)
  .get('/:product_id', ProductController.show)
  .put('/:product_id', ProductController.update)
  .delete('/:product_id', ProductController.destroy);
