const router = require('express').Router();
const apiRouter = require('express').Router();

const catchAllRoutes = require('./catch-all.routes');
const ProductRoutes = require('./product.routes');

router.use('/products', ProductRoutes);

module.exports = apiRouter.use('/api', router).use(catchAllRoutes);
