// route data

module.exports = function(app, file, fs, fileName) {

  // get everything
  app.get('/educations/', function(req, res){
      res.json(file);
  });
  
  // get one education
  app.get('/educations/:type', function(req, res){
    var educationType = req.params.type;
    var value = file[educationType];
    if (value) {
      res.json(value);
    } else {
      res.send('Did not find the education ' + educationType);
    }
  });

  // lägg till en utbildning
  app.patch('/educations/add/:type', function(req, res){
    var key = req.params.type;
    var boo = false;

    for(var index in file) { 
      console.log(index);
      if(index === key) {
        boo = true;
        file[key].content = req.body;
        fs.writeFile(fileName, JSON.stringify(file, null, 2), function (err) {
          if (err) {
            res.send(err);
          }
        });
        res.send('200');
      }
    }
    if(boo === true) {
        res.send('Education does not exist! Not updated.');
    }

  });

  app.delete('/educations/delete/:type/:title', function(req, res){
      var key = req.params.type,
          title = req.params.title;
          

          for(var index in file) {
            
              if(index === key) {
                  file[key].content.forEach(function (value,index) {
                    
                     if (value.title === title){ 
                        file[key].content.splice(index, 1);
                        
                        fs.writeFile(fileName, JSON.stringify(file, null, 2), function (err) {
                            if (err) {
                              res.send(err);
                            }
                        });
                        res.send('200');
                     }
                  });  
              }
          }

          

  });


  

};
