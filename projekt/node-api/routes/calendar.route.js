// route data

module.exports = function(app, obj) {

  // get
  // ----------
  app.get('/educations',  function(req, res){
    res.json(obj);
    console.log(obj);
  });

};
