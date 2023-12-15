const Presentation = require('../models/Presentation');
const fs = require('fs');

exports.createPresentation = (req, res, next) => {
    console.log(req.body);
    const presentationObject = req.body;
    delete presentationObject._id;
    delete presentationObject._userId;
    console.log('presentationObject' + presentationObject);

    const presentation = new Presentation(req.body);

    presentation.save()
        .then(() => { res.status(201).json({ message: 'Présentation enregistrée !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.modifyPresentation = (req, res, next) => {
    const presentationObject = req.file ? {
        ...JSON.parse(req.body.presentation),
    } : { ...req.body };

    delete presentationObject._userId;
    Presentation.findOne({ _id: req.params.id })
        .then((presentation) => {
            if (presentation.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé !' });
            } else {
                Presentation.updateOne({ _id: req.params.id }, { ...presentationObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Présentation modifiée !' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deletePresentation = (req, res, next) => {
    Presentation.findOne({ _id: req.params.id })
        .then(presentation => {
            console.log('presentation.userId: ' + presentation.userId);
            console.log('req.auth.userId: ' + req.auth.userId);
            if (presentation.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé !' });
            } else {
                    Presentation.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Présentation supprimée !' }) })
                        .catch(error => res.status(401).json({ error }));
                
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        }
    );
    console.log('req.params.id: ' + req.params.id);

};

exports.getOnePresentation = (req, res, next) => {
    Presentation.findOne({ _id: req.params.id })
        .then(presentation => res.status(200).json(presentation))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllPresentations = (req, res, next) => {
    Presentation.find()
        .then(presentations => res.status(200).json(presentations))
        .catch(error => res.status(400).json({ error }));
};

