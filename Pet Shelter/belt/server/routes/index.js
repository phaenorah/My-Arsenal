const router = require('express').Router();
const apiRouter = require('express').Router();

const catchAllRoutes = require('./catch-all.routes');
const AuthRoutes = require('./auth.routes');
const PetRoutes = require('./pet.routes');

// /api/auth/login

router
  .use('/auth', AuthRoutes)
  .use('/pets', PetRoutes);

module.exports = apiRouter.use('/api', router).use(catchAllRoutes);
