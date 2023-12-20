const Cv = require('../models/Cv');
const fs = require('fs');

exports.createCv = (req, res, next) => {
    console.log(req.body);
    const cvObject = req.body;
    delete cvObject._id;
    delete cvObject._userId;
    console.log('cvObject' + cvObject);

    const cv = new Cv(req.body);

    cv.save()
        .then(() => { res.status(201).json({ message: 'CV enregistrée !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.modifyCv = (req, res, next) => {
    const cvObject = req.file ? {
        ...JSON.parse(req.body.cv),
    } : { ...req.body };

    delete cvObject._userId;
    Cv.findOne({ _id: req.params.id })
        .then((cv) => {
            if (cv.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé !' });
            } else {
                Cv.updateOne({ _id: req.params.id }, { ...cvObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'CV modifiée !' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteCv = (req, res, next) => {
    Cv.findOne({ _id: req.params.id })
        .then(cv => {
            console.log('cv.userId: ' + cv.userId);
            console.log('req.auth.userId: ' + req.auth.userId);
            if (cv.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé !' });
            } else {
                Cv.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'CV supprimée !' }) })
                        .catch(error => res.status(401).json({ error }));
                
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        }
    );
    console.log('req.params.id: ' + req.params.id);

};

exports.getOneCv = (req, res, next) => {
    Cv.findOne({ _id: req.params.id })
        .then(cv => res.status(200).json(cv))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllCvs = (req, res, next) => {
    Cv.find()
        .then(cvs => res.status(200).json(cvs))
        .catch(error => res.status(400).json({ error }));
};

