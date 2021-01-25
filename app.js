//app gere toutes les requetes envoyées au serveur
//plugin externes
require('dotenv').config();
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

//declaration des routes
const userRoutes    = require('./routes/user');
const postRoutes    = require('./routes/post');
const commentRoutes = require('./routes/comment');

//mise en place de la fonction express
const app = express();

const db = require("./models");

db.sequelize.sync();

 //db.sequelize.sync({ force: true }).then(() => {
  // console.log("Drop and re-sync db.");
 //});

app.use(helmet());
app.use(cors());

// communiquer entre les ports. acces des utilisateurs
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

    

  app.use(bodyParser.json());         // parsé automatique le corps requete, permettra d'extraire l'objet JSON de la demande. il est mis "middleware global"
   
 // declaration des fichiers routes 
  app.use('/api/auth', userRoutes);
  app.use('/api/post', postRoutes);
  app.use('/api/comment', commentRoutes);
  

module.exports = app;