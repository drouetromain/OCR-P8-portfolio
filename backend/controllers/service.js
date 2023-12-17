const Service = require('../models/Service');
const fs = require('fs');

exports.createService = (req, res, next) => {
    console.log(req.body);
    const serviceObject = req.body;
    delete serviceObject._id;
    delete serviceObject._userId;
    console.log('serviceObject' + serviceObject);

    const service = new Service(req.body);

    service.save()
        .then(() => { res.status(201).json({ message: 'Service enregistrée !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.modifyService = (req, res, next) => {
    const serviceObject = req.file ? {
        ...JSON.parse(req.body.service),
    } : { ...req.body };

    delete serviceObject._userId;
    Service.findOne({ _id: req.params.id })
        .then((service) => {
            if (service.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé !' });
            } else {
                Service.updateOne({ _id: req.params.id }, { ...serviceObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Service modifiée !' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteService = (req, res, next) => {
    Service.findOne({ _id: req.params.id })
        .then(service => {
            console.log('service.userId: ' + service.userId);
            console.log('req.auth.userId: ' + req.auth.userId);
            if (service.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé !' });
            } else {
                Service.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Service supprimée !' }) })
                        .catch(error => res.status(401).json({ error }));
                
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        }
    );
    console.log('req.params.id: ' + req.params.id);

};

exports.getOneService = (req, res, next) => {
    Service.findOne({ _id: req.params.id })
        .then(service => res.status(200).json(service))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllServices = (req, res, next) => {
    Service.find()
        .then(services => res.status(200).json(services))
        .catch(error => res.status(400).json({ error }));
};

