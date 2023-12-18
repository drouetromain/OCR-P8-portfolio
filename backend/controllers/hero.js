const Hero = require('../models/Hero');
const fs = require('fs');

exports.createHero = (req, res, next) => {
    const heroObject = JSON.parse(req.body?.hero);
    delete heroObject._id;
    delete heroObject._userId;

    const hero = new Hero({
        ...heroObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    hero.save()
        .then(() => { res.status(201).json({ message: 'Hero enregistrée !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.modifyHero = (req, res, next) => {
    let heroObject = JSON.parse(req.body.hero) ;
    delete heroObject._userId;

    Hero.findOne({ _id: req.params.id })
        .then((hero) => {
            if (hero.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé !' });
            } else {

                if (req?.file) {
                    const filePath = `controllers/images/${hero.imageUrl.split('/').slice(-1)[0]}`;
                    if (fs.existsSync(filePath)) {
                        try {
                            fs.unlinkSync(filePath)
                            console.log('File deleted successfully')
                            heroObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

                        } catch (err) { console.error(err) }
                    } else {
                        console.log('File not found')
                        heroObject.imageUrl = "File not found";
                    }
                }else{
                    heroObject.imageUrl = hero.imageUrl;
                }

                heroObject._id = req.params.id;

                hero.updateOne({ _id: req.params.id }, { ...heroObject })
                    .then(() => res.status(200).json({ message: 'Hero modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteHero = (req, res, next) => {
    Hero.findOne({ _id: req.params.id })
        .then(hero => {
            if (hero.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé !' });
            } else {
                const filePath = './controllers/images/' + hero.imageUrl.split('/').slice(-1)[0];
                fs.unlink(`${filePath}`, () => {
                    Hero.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Hero supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        }
        );

};

exports.getOneHero = (req, res, next) => {
    Hero.findOne({ _id: req.params.id })
        .then(hero => res.status(200).json(hero))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllHeros = (req, res, next) => {
    Hero.find()
        .then(heros => res.status(200).json(heros))
        .catch(error => res.status(400).json({ error }));
};

