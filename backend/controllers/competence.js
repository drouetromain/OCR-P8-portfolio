const Competence = require('../models/Competence');
const fs = require('fs');

exports.createCompetence = (req, res, next) => {
    const competenceObject = JSON.parse(req.body?.competence);
    delete competenceObject._id;
    delete competenceObject._userId;

    const competence = new Competence({
        ...competenceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    competence.save()
        .then(() => { res.status(201).json({ message: 'Competence enregistrée !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.modifyCompetence = (req, res, next) => {
    let competenceObject = JSON.parse(req.body.competence) ;
    delete competenceObject._userId;

    Competence.findOne({ _id: req.params.id })
        .then((competence) => {
            if (competence.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé !' });
            } else {

                if (req?.file) {
                    const filePath = `controllers/images/${competence.imageUrl.split('/').slice(-1)[0]}`;
                    if (fs.existsSync(filePath)) {
                        try {
                            fs.unlinkSync(filePath)
                            console.log('File deleted successfully')
                            competenceObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

                        } catch (err) { console.error(err) }
                    } else {
                        console.log('File not found')
                        competenceObject.imageUrl = "File not found";
                    }
                }else{
                    competenceObject.imageUrl = competence.imageUrl;
                }

                competenceObject._id = req.params.id;

                Competence.updateOne({ _id: req.params.id }, { ...competenceObject })
                    .then(() => res.status(200).json({ message: 'Compétence modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteCompetence = (req, res, next) => {
    Competence.findOne({ _id: req.params.id })
        .then(competence => {
            if (competence.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé !' });
            } else {
                const filePath = './controllers/images/' + competence.imageUrl.split('/').slice(-1)[0];
                fs.unlink(`${filePath}`, () => {
                    Competence.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Compétence supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        }
        );

};

exports.getOneCompetence = (req, res, next) => {
    Competence.findOne({ _id: req.params.id })
        .then(competence => res.status(200).json(competence))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllCompetences = (req, res, next) => {
    Competence.find()
        .then(competences => res.status(200).json(competences))
        .catch(error => res.status(400).json({ error }));
};

