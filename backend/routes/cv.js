const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const cvCtrl = require('../controllers/cv');

router.get('/cvs', cvCtrl.getAllCvs);
router.get('/cvs/:id', cvCtrl.getOneCv);

router.post('/cvs', auth, cvCtrl.createCv);

router.put('/cvs/:id', auth, cvCtrl.modifyCv);
router.delete('/cvs/:id', auth, cvCtrl.deleteCv);

module.exports = router;