const express = require('express');
const auth = require('../middleware/auth');
const customMulter = require('../middleware/multer-config');
const router = express.Router();
const competenceCtrl = require('../controllers/competence');

router.get('/competences', competenceCtrl.getAllCompetences);
router.get('/competences/:id', competenceCtrl.getOneCompetence);

router.post('/competences', auth, customMulter(120, 100), competenceCtrl.createCompetence);

router.put('/competences/:id', auth, customMulter(120, 100), competenceCtrl.modifyCompetence);
router.delete('/competences/:id', auth, competenceCtrl.deleteCompetence);

module.exports = router;