const mongoose = require('mongoose');

const SocialMediaSchema = mongoose.Schema({
    userId: { type: String, required: true },
    anchorId: { type: String, required: true },
    link: { type: String, required: true },
    imageUrl: { type: String, required: true },
    alt: { type: String, required: true },
});

module.exports = mongoose.model('SocialMedias', SocialMediaSchema);