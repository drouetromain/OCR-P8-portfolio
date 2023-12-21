const express = require('express');
const auth = require('../middleware/auth');
const customMulter = require('../middleware/multer-config');
const router = express.Router();
const portfolioCtrl = require('../controllers/portfolio');

router.get('/portfolios', portfolioCtrl.getAllPortfolios);
router.get('/portfolios/:id', portfolioCtrl.getOnePortfolio);


router.post('/portfolios', auth, customMulter(400, 225), portfolioCtrl.createPortfolio);

router.put('/portfolios/:id', auth, customMulter(400, 225), portfolioCtrl.modifyPortfolio);
router.delete('/portfolios/:id', auth, portfolioCtrl.deletePortfolio);

module.exports = router;