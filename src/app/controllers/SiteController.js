//const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    //[GET] /
    index(req, res, next) {
        res.redirect('login');
    }

    // [GET] /login
    login(req, res, next) {
        res.render('login', { layout: 'login' });
    }

    // [POST] /login account
    loginAccount(req, res, next) {
        res.send(req.body);
    }
}

module.exports = new SiteController();
