const mongoose = require('mongoose');

const FilterSchema = mongoose.Schema({
        filter: { type: String, required: true },
});

module.exports = mongoose.model('Filter', FilterSchema);