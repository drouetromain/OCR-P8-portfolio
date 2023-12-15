const mongoose = require('mongoose');

const NavigationSchema = mongoose.Schema({
    userId: { type: String, required: true },
    label: { type: String, required: true },
    link: { type: String, required: true },
    target: { type: String, required: true }
});

module.exports = mongoose.model('Navigations', NavigationSchema);