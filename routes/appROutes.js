const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

router.get('/', ensureAuthenticated, appController.renderIndex);

module.exports = router;
