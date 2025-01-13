const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

const { index, show, storeReview } = movieController;

//index
router.get('/', index);

//show
router.get('/:id', show);

//post
router.post('/:id', storeReview);

module.exports = router;
