const Filter = require('../models/Filter');
const fs = require('fs');

exports.createFilter = (req, res, next) => {
    console.log(req.body);
    const filterObject = req.body;
    delete filterObject._id;
    delete filterObject._userId;
    console.log('filterObject' + filterObject);

    const filter = new Filter(req.body);

    filter.save()
        .then(() => { res.status(201).json({ message: 'Filtre enregistrée !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.modifyFilter = (req, res, next) => {
    const filterObject = req.file ? {
        ...JSON.parse(req.body.filter),
    } : { ...req.body };

    delete filterObject._userId;
    Filter.findOne({ _id: req.params.id })
        .then(() => {
        Filter.updateOne({ _id: req.params.id }, { ...filterObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Filtre modifiée !' }))
            .catch(error => res.status(401).json({ error }));
            
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteFilter = (req, res, next) => {
    Filter.findOne({ _id: req.params.id })
        .then(() => {  
        Filter.deleteOne({ _id: req.params.id })
                .then(() => { res.status(200).json({ message: 'Filtre supprimée !' }) })
                .catch(error => res.status(401).json({ error }));
                
        
        })
        .catch(error => {
            res.status(500).json({ error });
        }
    );
    console.log('req.params.id: ' + req.params.id);

};

exports.getOneFilter = (req, res, next) => {
    Filter.findOne({ _id: req.params.id })
        .then(filter => res.status(200).json(filter))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllFilters = (req, res, next) => {
    Filter.find()
        .then(filters => res.status(200).json(filters))
        .catch(error => res.status(400).json({ error }));
};

