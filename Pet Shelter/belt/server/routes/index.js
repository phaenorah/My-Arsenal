const router = require('express').Router();
const apiRouter = require('express').Router();

const catchAllRoutes = require('./catch-all.routes');
const PetRoutes = require('./pet.routes');

router.use('/pets', PetRoutes);

module.exports = apiRouter.use('/api', router).use(catchAllRoutes);
