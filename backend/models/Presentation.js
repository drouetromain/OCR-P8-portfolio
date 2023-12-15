const mongoose = require('mongoose');

const PresentationSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    anchorId: { type: String, required: true }
});

module.exports = mongoose.model('Presentations', PresentationSchema);