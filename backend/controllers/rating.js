const Book = require('../models/Book');
const Rating = require('../models/Rating');

exports.modifyRating = (req, res, next) => {

    const ratingObject = { userId: req.body.userId, grade: req.body.rating };

    Book.findOne({ _id: req.params.id })
        .then(async (book) => {
            if (book.userId === req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé !' });
            } else {
                const currentBook = await Book.findById(req.params.id);
                const arrayRatings = currentBook.ratings;
                let sum = 0;
                arrayRatings.map((rating) => {
                    sum = sum + rating.grade

                });
                const averageRating = (sum + req.body.rating) / (arrayRatings.length + 1);
                let bbBook = await Book.findOneAndUpdate({ _id: req.params.id }, { "$push": { "ratings": ratingObject }, "$set": { "averageRating": averageRating.toFixed(1) }}, {new: true});
                res.status(200).json({ message: 'Note ajoutée!',  ...bbBook?._doc});
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({ error });
        });
};

exports.getBestRating = async (req, res, next) => {
    try {
        const arrayBooks = await Book.find({}).sort({ averageRating: -1 }).limit(3) || {};
        res.status(200).json(arrayBooks);   
    } catch (error) {
        res.status(401).json({ error })
    }
};

