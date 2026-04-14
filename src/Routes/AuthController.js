const AuthService = require('../Service/AuthService');

module.exports = function(app) {

    app.post('/api/auth/signup', function(req, res){
        AuthService.createAccount(req);
    });

    app.post('/api/auth/login', function(req, res){
        AuthService.login(req);
    });

}