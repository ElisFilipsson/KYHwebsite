// Users routes
module.exports = function(app, management, jwtCheck) {

  app.get('/1/users', jwtCheck, function(req, res) {
    //promise modellen
    management.getUsers()
      .then(function (users) {
        res.json(users);
      })
      .catch(function (err) {
        res.status(err.statusCode).send(err);
      });
  });

  app.post('/1/users', jwtCheck, function(req, res) {
    //promise modellen
    management.createUser(req.body)
      .then(function (createusers) {
          res.json(createusers);
      })
      .catch(function (err) {
        res.status(err.statusCode).send(err);
      });
  });

  app.delete('/1/users/:id', jwtCheck, function(req, res) {
      var user_id = {"id": req.params.id};
    //promise modellen
    management.deleteUser(user_id)
      .then(function (deluser) {
          res.json(deluser);
      })
      .catch(function (err) {
        res.status(err.statusCode).send(err);
      });
  });

  app.patch('/1/users/:id', jwtCheck, function(req, res) {
      var user_id = {"id": req.params.id};
    //promise modellen
    management.updateUser(user_id, req.body)
      .then(function (user) {
          res.json(user);
      })
      .catch(function (err, user) {
        console.log(user);
        res.status(user);
        res.status(err.statusCode).send(err);
      });
  });

};
