const mongoose = require('mongoose');

const PortfolioSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    alt: { type: String, required: true },
    filters: { type: String, required: true },
    // filters: [{
    //     filter: { type: String, required: true },
    // }],
    anchorId: { type: String, required: true },
    link: { type: String, required: true },
});

module.exports = mongoose.model('Portfolios', PortfolioSchema);