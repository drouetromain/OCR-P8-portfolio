const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const presentationCtrl = require('../controllers/presentation');

router.get('/presentations', presentationCtrl.getAllPresentations);
router.get('/presentations/:id', presentationCtrl.getOnePresentation);

router.post('/presentations', auth, presentationCtrl.createPresentation);

router.put('/presentations/:id', auth, presentationCtrl.modifyPresentation);
router.delete('/presentations/:id', auth, presentationCtrl.deletePresentation);

module.exports = router;