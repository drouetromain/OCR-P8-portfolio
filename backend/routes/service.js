const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const serviceCtrl = require('../controllers/service');

router.get('/services', serviceCtrl.getAllServices);
router.get('/services/:id', serviceCtrl.getOneService);

router.post('/services', serviceCtrl.createService);

router.put('/services/:id', auth, serviceCtrl.modifyService);
router.delete('/services/:id', auth, serviceCtrl.deleteService);

module.exports = router;