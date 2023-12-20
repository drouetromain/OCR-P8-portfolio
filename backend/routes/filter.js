const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const filterCtrl = require('../controllers/filter');

router.get('/filters', filterCtrl.getAllFilters);
router.get('/filters/:id', filterCtrl.getOneFilter);

router.post('/filters', auth, filterCtrl.createFilter);

router.put('/filters/:id', auth, filterCtrl.modifyFilter);
router.delete('/filters/:id', auth, filterCtrl.deleteFilter);

module.exports = router;