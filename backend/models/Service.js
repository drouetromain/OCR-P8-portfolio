const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    titleTag: { type: String, required: true },
    tag: { type: String, required: true },
    anchorId: { type: String, required: true }
});

module.exports = mongoose.model('Services', ServiceSchema);