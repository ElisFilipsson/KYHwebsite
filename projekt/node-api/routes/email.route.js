// route data

module.exports = function(app, transporter) {
      
  // get everything
  app.post('/email/', function(req, res){
      // send mail with defined transport object
      transporter.sendMail(req.body, function(error, info){
        if(error){
            console.log(error);
            res.send(error);
        }
        console.log('Message sent: ' + info.response);
        res.send('Status 200');
      });
  });

};
