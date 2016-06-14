// route data

module.exports = function(app, obj) {

  // get everything
  app.get('/educations/', function(req, res){
      res.json(obj);
  });
  
  // get one education
  app.get('/educations/:type', function(req, res){
    var educationType = req.params.type;
    var value = obj[educationType];
    if (value) {
      res.json(value);
    } else {
      res.send('Did not find the education ' + educationType);
    }
  });

};
