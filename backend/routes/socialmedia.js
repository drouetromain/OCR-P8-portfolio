const express = require('express');
const auth = require('../middleware/auth');
const customMulter = require('../middleware/multer-config');
const router = express.Router();
const socialmediaCtrl = require('../controllers/socialmedia');

router.get('/socialmedias', socialmediaCtrl.getAllSocialmedias);
router.get('/socialmedias/:id', socialmediaCtrl.getOneSocialmedia);

router.post('/socialmedias', auth, customMulter(100, 100), socialmediaCtrl.createSocialmedia);

router.put('/socialmedias/:id', auth, customMulter(100, 100), socialmediaCtrl.modifySocialmedia);
router.delete('/socialmedias/:id', auth, socialmediaCtrl.deleteSocialmedia);

module.exports = router;