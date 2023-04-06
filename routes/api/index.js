const router = require('express').Router();
// require thoughts route
const userRoutes = require('./userRoutes');

// add thoughts route 
router.use('/users', userRoutes);

module.exports = router;
