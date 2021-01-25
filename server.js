 
'use strict';

//importer plugin
const http = require('http');
require('dotenv').config();
const app = require('./app');


//fonction pour configurer le port de connection selon l'environnment.

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//function gestion des erreurs
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);   //s'il y a une erreur au demarrage de server, on est bloqué ici
server.on('listening', () => {      //sinon, si tout va bien, cela se poursuit
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;//on lie le port sur lequel le serveur va tourner
  console.log('Listening on ' + bind);//et onconfirme que c'est un succès
});

server.listen(port);
