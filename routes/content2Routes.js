const express = require('express');
const content2Controller = require('../controllers/content2Controller');

const router = express.Router();

router.get('/', content2Controller.getAll);
router.get('/:id', content2Controller.getOne);
router.post('/', content2Controller.upsert);
router.delete('/:id', content2Controller.remove);

module.exports = router; 