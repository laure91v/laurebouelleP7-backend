const db = require("../models");
const Comment = db.comments;
const User = db.users;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  Comment.create({
    text: req.body.text,
    userId: req.body.userId,
    postId: req.body.postId
  })
    .then(success => { return res.status(200).json(success);
     })

    .catch(err => {
      console.log('############## usercreate error...', err.errors[0].message);
      return res.status(404).send(new Error(err.errors[0].message));
    });

};

exports.readSignaled = (req, res) => {
  Comment.findAll({
    where: {
      isSignaled: true
    },
    include: [{
      model: User,
      attributes: ['pseudo']
    }],
    order: [
      ['createdAt', 'DESC'],
    ],
  })
    .then(comments => {
      if (!comments) {
        return res.status(404).json({ error: 'Aucun commentaire signalé !' });
      }
      res.status(200).json(comments);

    })
    .catch(error => res.status(500).json({ error: "Erreur dans le chargement des commentaire", content: error }));
  
};


exports.readAll = (req, res) => {
  
  Comment.findAll({
    where: {
      postId: req.params.postId
    },
    include: [{
      model: User,
      attributes: ['pseudo']
    }],
    order: [
      ['createdAt', 'DESC'],
    ],
  })
    .then(comments => {
      if (!comments) {
        return res.status(404).json({ error: 'Aucun commentaire trouvé !' });
      }
      res.status(200).json(comments);

    })
    .catch(error => res.status(500).json({ error: "Erreur dans le chargement des commentaire", content: error }));
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  Comment.update({ text: req.body.text }, {
    where: {
      id: req.params.id
    }
  })
    .then(success => {

      res.status(200).json({ msg: 'Votre commentaire a bien été mis à jour !' });
    })
    .catch(error => res.status(500).json({ error: "Erreur dans la mise à jour du commentaire", content: error }));
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  }).then(success => {

    return res.status(200).json({ msg: 'Votre commentaire a bien été supprimé !' });
    
  })
  .catch(error => res.status(500).json({ error: "Erreur dans la mise à jour du commentaire", content: error }));
};

// Signal comment
exports.signal = (req, res) => {
  let signalValue;
  let successMsg;
  if (req.params.action === 'signal') {
    signalValue = true;
    successMsg = 'Ce commentaire a bien été signalé !';
  } else {
    signalValue = false;
    successMsg = 'Le signalement pour ce comentaire a bien été annulé !';
  }
  Comment.update({ isSignaled: signalValue }, {
    where: {
      id: req.params.id
    }
  })
    .then(success => {

      res.status(200).json({ msg: successMsg });
    })
    .catch(error => res.status(500).json({ error: "Erreur dans le signalement de commentaire", content: error }));
};
