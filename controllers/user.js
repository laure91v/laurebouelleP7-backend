const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require("../models");
const User = db.users;


function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

exports.readOne = (req, res) => {
  User.findOne({
    where: {
      id: req.params.userId
    },
    attributes: ['pseudo', 'email', 'age']
  })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé !' });
      }


      return res.status(200).json(user);

    })
    .catch(error => res.status(500).json({ error: "Une erreur provenant de la requête est survenue", content: error }));
};


exports.signup = (req, res) => {

  if (!validateEmail(req.body.email)) {
    return res.status(403).send({ message: "adresse mail non valide" });

  }
  if (req.body.password.length < 8) {
    return res.status(403).send({ message: "minimum 8 caractères pour le mdp" });

  }
  bcrypt.hash((req.body.password), 10)
    .then(hash => {
      User.create({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash,
        age: req.body.age || null
      })
        .then(success => { return res.status(200).json(success); })
        .catch(err => {
          console.log('############## usercreate error...', err.errors[0].type);
          let messageError = "une erreur inconnue est survenue";
          if (err.errors[0].type == "unique violation") {
            messageError = "pseudo et/ou adresse mail déjà pris"
          }
          return res.status(400).send({
            message: messageError
          });
        });

    })
    .catch(err => {
      console.log('############## bcrypt error...', err);
      return res.status(501).send(err);
    });
};

// Find a single Tutorial with an id
exports.login = (req, res) => {
  User.findOne({
    where: { pseudo: req.body.pseudo }
  })
    .then(user => {
      if (!user) {
        return res.status(401).send({ message: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).send({ message: 'Le mot de passe est incorrect !' });
          }
          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            token: jwt.sign(
              { userId: user.id, isAdmin: user.isAdmin },
              process.env.JWT_TOKENSECRET,
              { expiresIn: '12h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error: "Une erreur provenant du mot de passe est survenue", content: error }));
    })
    .catch(error => res.status(500).json({ error: "Une erreur provenant de l'email est survenue", content: error }));
};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {


  if ((req.body.newPassword && req.body.newPassword.trim().length < 8) ||
    !validateEmail(req.body.email) ||
    !(req.body.age < 120) ||
    req.body.pseudo.trim().length < 2
  ) {
    return res.status(403).json({ error: "Un ou plusieurs champs ne sont pas valides !", content: error })
  }

  const user = {
    age: req.body.age,
    pseudo: req.body.pseudo,
    email: req.body.email,
  };


  if (req.body.newPassword) {
    try {
      const hash = await bcrypt.hash((req.body.newPassword), 10);
      user.password = hash;
    } catch (error) {
      console.log('############## bcrypt error...', err);
      return res.status(501).send(err);
    }
  }

  User.update(
    user, {
    where: {
      id: req.params.userId
    }
  })
    .then(success => {
      res.status(200).json({ msg: 'Votre profil a bien été mis à jour !' });
    })
    .catch(err => {
      console.log('############## usercreate error...', err.errors[0].type);
      let messageError = "une erreur inconnue est survenue";
      if (err.errors[0].type == "unique violation") {
        messageError = "pseudo et/ou adresse mail déjà pris"
      }
      return res.status(400).send({
        message: messageError
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  User.destroy({
    where: {
      id: req.params.userId
    }
  }).then(success => {
    res.status(200).json({ msg: 'Votre profil a bien été suprimé !' });
  })
    .catch(error => res.status(500).json({ error: "Erreur dans la suppression du profil", content: error }));

};
