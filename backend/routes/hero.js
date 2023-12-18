const express = require('express');
const auth = require('../middleware/auth');
const customMulter = require('../middleware/multer-config');
const router = express.Router();
const heroCtrl = require('../controllers/hero');

router.get('/heros', heroCtrl.getAllHeros);
router.get('/heros/:id', heroCtrl.getOneHero);

router.post('/heros', auth, customMulter(206, 260), heroCtrl.createHero);

router.put('/heros/:id', auth, customMulter(206, 260), heroCtrl.modifyHero);
router.delete('/heros/:id', auth, heroCtrl.deleteHero);

module.exports = router;