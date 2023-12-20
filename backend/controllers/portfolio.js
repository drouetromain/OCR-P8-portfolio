const Portfolio = require('../models/Portfolio');
const fs = require('fs');

exports.createPortfolio = (req, res, next) => {
    const portfolioObject = JSON.parse(req.body?.portfolio);
    delete portfolioObject._id;
    delete portfolioObject._userId;

    const portfolio = new Portfolio({
        ...portfolioObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    portfolio.save()
        .then(() => { res.status(201).json({ message: 'Portfolio enregistrée !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.modifyPortfolio = (req, res, next) => {
    let portfolioObject = JSON.parse(req.body.portfolio) ;
    delete portfolioObject._userId;

    Portfolio.findOne({ _id: req.params.id })
        .then((portfolio) => {
            if (portfolio.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé !' });
            } else {

                if (req?.file) {
                    const filePath = `controllers/images/${portfolio.imageUrl.split('/').slice(-1)[0]}`;
                    if (fs.existsSync(filePath)) {
                        try {
                            fs.unlinkSync(filePath)
                            console.log('File deleted successfully')
                            portfolioObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

                        } catch (err) { console.error(err) }
                    } else {
                        console.log('File not found')
                        portfolioObject.imageUrl = "File not found";
                    }
                }else{
                    portfolioObject.imageUrl = portfolio.imageUrl;
                }

                portfolioObject._id = req.params.id;

                Portfolio.updateOne({ _id: req.params.id }, { ...portfolioObject })
                    .then(() => res.status(200).json({ message: 'Portfolio modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deletePortfolio = (req, res, next) => {
    Portfolio.findOne({ _id: req.params.id })
        .then(portfolio => {
            if (portfolio.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé !' });
            } else {
                const filePath = './controllers/images/' + portfolio.imageUrl.split('/').slice(-1)[0];
                fs.unlink(`${filePath}`, () => {
                    Portfolio.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Portfolio supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        }
        );

};

exports.getOnePortfolio = (req, res, next) => {
    Portfolio.findOne({ _id: req.params.id })
        .then(portfolio => res.status(200).json(portfolio))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllPortfolios = (req, res, next) => {
    Portfolio.find()
        .then(portfolios => res.status(200).json(portfolios))
        .catch(error => res.status(400).json({ error }));
};

