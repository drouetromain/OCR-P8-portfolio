const Socialmedia = require('../models/Socialmedia');
const fs = require('fs');

exports.createSocialmedia = (req, res, next) => {
    const socialmediaObject = JSON.parse(req.body?.socialmedia);
    delete socialmediaObject._id;
    delete socialmediaObject._userId;

    const socialmedia = new Socialmedia({
        ...socialmediaObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    socialmedia.save()
        .then(() => { res.status(201).json({ message: 'Réseau Social enregistrée !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.modifySocialmedia = (req, res, next) => {
    let socialmediaObject = JSON.parse(req.body.socialmedia) ;
    delete socialmediaObject._userId;

    Socialmedia.findOne({ _id: req.params.id })
        .then((socialmedia) => {
            if (socialmedia.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé !' });
            } else {

                if (req?.file) {
                    const filePath = `controllers/images/${socialmedia.imageUrl.split('/').slice(-1)[0]}`;
                    if (fs.existsSync(filePath)) {
                        try {
                            fs.unlinkSync(filePath)
                            console.log('File deleted successfully')
                            socialmediaObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

                        } catch (err) { console.error(err) }
                    } else {
                        console.log('File not found')
                        socialmediaObject.imageUrl = "File not found";
                    }
                }else{
                    socialmediaObject.imageUrl = socialmedia.imageUrl;
                }

                socialmediaObject._id = req.params.id;

                Socialmedia.updateOne({ _id: req.params.id }, { ...socialmediaObject })
                    .then(() => res.status(200).json({ message: 'Réseau social modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteSocialmedia = (req, res, next) => {
    Socialmedia.findOne({ _id: req.params.id })
        .then(socialmedia => {
            if (socialmedia.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé !' });
            } else {
                const filePath = './controllers/images/' + socialmedia.imageUrl.split('/').slice(-1)[0];
                fs.unlink(`${filePath}`, () => {
                    Socialmedia.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Réseau social supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        }
        );

};

exports.getOneSocialmedia = (req, res, next) => {
    Socialmedia.findOne({ _id: req.params.id })
        .then(socialmedia => res.status(200).json(socialmedia))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllSocialmedias = (req, res, next) => {
    Socialmedia.find()
        .then(socialmedias => res.status(200).json(socialmedias))
        .catch(error => res.status(400).json({ error }));
};

