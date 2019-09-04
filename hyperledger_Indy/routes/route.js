
module.exports = function(app) {
  var indy = require('../controllers/controller');
  


//   app.route('/indy/student')
//     .post(indy.student);

  app.route('/indy/generateDid')
    .post(indy.generateDid);
   

    app.route('/indy/registration')
    .post(indy.registration);
//   app.route('/indy/get_transaction/:txid')
//     .get(indy.getTransaction);

//   app.route('/indy/payment')
//     .post(indy.performTransfer);

}; 

