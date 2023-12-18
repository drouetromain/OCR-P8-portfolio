const mongoose = require('mongoose');

const HeroSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    anchorId: { type: String, required: true },
    imageUrl: { type: String, required: true },
    alt: { type: String, required: true },

});

module.exports = mongoose.model('Hero', HeroSchema);