const mongoose = require('mongoose');

const RatingSchema = mongoose.Schema({
    ratings: [{
        userId: { type: String, required: true },
        grade: { type: Number, required: true },
    }],
});

module.exports = mongoose.model('Rating', RatingSchema);