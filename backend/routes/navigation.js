const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const navigationCtrl = require('../controllers/navigation');

router.get('/navigations', navigationCtrl.getAllNavigations);
router.get('/navigations/:id', navigationCtrl.getOneNavigation);

router.post('/navigations', navigationCtrl.createNavigation);

router.put('/navigations/:id', auth, navigationCtrl.modifyNavigation);
router.delete('/navigations/:id', auth, navigationCtrl.deleteNavigation);

module.exports = router;