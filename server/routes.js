const controller = require('./controller');
const router = require('express').Router();
// Connect controller methods to their corresponding routes

router.get('/getVinData', controller.getVinData.get);

module.exports = router;
