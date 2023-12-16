const Navigation = require('../models/Navigation');
const fs = require('fs');

exports.createNavigation = (req, res, next) => {
    console.log(req.body);
    const navigationObject = req.body;
    delete navigationObject._id;
    delete navigationObject._userId;
    console.log('navigationObject' + navigationObject);

    const navigation = new Navigation(req.body);

    navigation.save()
        .then(() => { res.status(201).json({ message: 'Présentation enregistrée !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.modifyNavigation = (req, res, next) => {
    const navigationObject = req.file ? {
        ...JSON.parse(req.body.navigation),
    } : { ...req.body };

    delete navigationObject._userId;
    Navigation.findOne({ _id: req.params.id })
        .then((navigation) => {
            if (navigation.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé !' });
            } else {
                Navigation.updateOne({ _id: req.params.id }, { ...navigationObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Présentation modifiée !' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteNavigation = (req, res, next) => {
    Navigation.findOne({ _id: req.params.id })
        .then(navigation => {
            console.log('navigation.userId: ' + navigation.userId);
            console.log('req.auth.userId: ' + req.auth.userId);
            if (navigation.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé !' });
            } else {
                Navigation.deleteOne({ _id: req.params.id })
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

exports.getOneNavigation = (req, res, next) => {
    Navigation.findOne({ _id: req.params.id })
        .then(navigation => res.status(200).json(navigation))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllNavigations = (req, res, next) => {
    Navigation.find()
        .then(navigations => res.status(200).json(navigations))
        .catch(error => res.status(400).json({ error }));
};

