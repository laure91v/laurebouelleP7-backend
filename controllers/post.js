const db = require("../models");
const Post = db.posts;
const User = db.users;

// Create and Save a new Post
exports.create = (req, res) => {
      Post.create({
        title: req.body.title,
        text: req.body.text,
        userId: req.body.userId,
        
      })
    .then(success => { return res.status(200).json(success); })
    .catch(err => {
        console.log('############## usercreate error...', err);
        return res.status(404).send(new Error(err));
    });

};

// Find a single Post with an id
exports.readOne = (req, res) => {

  Post.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: User,
      attributes: ['pseudo']
    }]
  })
  .then(post => {
    if (!post) {
      return res.status(404).json({ error: 'Article non trouvé !' });
    }
    return res.status(200).json(post);
     
  })
  .catch(error => res.status(500).json({ error: "Une erreur provenant de la requête est survenue", content: error }));
};

exports.readSignaled = (req, res) => {
    Post.findAll({
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
// Find all Posts
exports.readAll = (req, res) => {
    Post.findAll({
      include: [{
        model: User,
        attributes: ['pseudo']
      }],
      order: [
        ['createdAt', 'DESC'],
      ]
    })
    .then(posts => {
      if (!posts) {
          return res.status(404).json({ error: 'Aucun article trouvé !' });
      }
          res.status(200).json(posts);
        
    })
    .catch(error => res.status(500).json({ error: "Erreur dans le chargement des articles", content: error }));
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  Post.update({ text: req.body.text }, {
    where: {
      id: req.params.id
    }
  })
  .then(success => {
   
    res.status(200).json({msg: 'Votre article a bien été mis à jour !'});  
  })
  .catch(error => res.status(500).json({ error: "Erreur dans la mise à jour de l'article !", content: error }));
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  }).then(success => {
   
    return res.status(200).json({msg: 'Votre article a bien été supprimé !'});  
  })
  .catch(error => res.status(500).json({ error: "Erreur dans la mise à jour de l'article !", content: error }));
};

// Signal or unsignal a comment
exports.signal = (req, res) => {
  let signalValue;
  let successMsg;
  if(req.params.action === 'signal') {
    signalValue = true;
    successMsg = 'Ce commentaire a bien été signalé !';
  } else {
    signalValue = false;
    successMsg = 'Le signalement pour ce comentaire a bien été annulé !';
  }
  Post.update({ isSignaled: signalValue }, {
    where: {
      id: req.params.id
    }
  })
  .then(success => {
   
    res.status(200).json({msg: successMsg});  
  })
  .catch(error => res.status(500).json({ error: "Erreur dans le signalement de commentaire", content: error }));
};



