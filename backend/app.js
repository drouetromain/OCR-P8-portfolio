const express = require('express');
const app = express();
const mongoose = require('mongoose');
const presentationRoutes = require('./routes/presentation');
const navigationRoutes = require('./routes/navigation');
const heroRoutes = require('./routes/hero');
const competenceRoutes = require('./routes/competence');
const serviceRoutes = require('./routes/service');
const cvRoutes = require('./routes/cv');
const socialmediaRoutes = require('./routes/socialmedia');
const userRoutes = require('./routes/user');
const path = require('path');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// app.use(bodyParser.json());


app.use('/api', presentationRoutes);
app.use('/api', navigationRoutes);
app.use('/api', heroRoutes);
app.use('/api', competenceRoutes);
app.use('/api', serviceRoutes);
app.use('/api', socialmediaRoutes);
app.use('/api', cvRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'controllers/images')));

module.exports = app;