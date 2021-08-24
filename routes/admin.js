var conn = require('./../inc/db');
var express = require('express');
var users = require('./../inc/users');

var router = express.Router();

router.use(function (req, res, next) {
    if (['/login', '/lostpassword'].indexOf(req.url) === -1 && !req.session.user) {
        users.render(req, res, "Necessario Autenticação !");
    } else {
        next();
    }


});

/* GET users listing. */
router.get('/logout', function (req, res, next) {
    delete req.session.user;
    res.redirect('admin/login');
});

router.get('/', function (req, res, next) {

    res.render("admin/index", {

    });

});

router.post('/login', function (req, res, next) {

    if (!req.body.email) {
        users.render(req, res, "Preencha o campo e-mail.");
    } else if (!req.body.password) {
        users.render(req, res, "Preencha o campo password.");
    } else {
        users.login(req.body.email, req.body.password).then(user => {
            req.session.user = user;
            res.redirect('/admin');
        }).catch(err => {
            users.render(req, res, err.message || err);
        });
    }

});

router.get('/login', function (req, res, next) {

    if (!req.session.views) req.session.views = 0;

    console.log("SESSION: ", req.session.views++);

    users.render(req, res);

});

router.get('/users', function (req, res, next) {

    res.render("admin/users", {

    });

});

router.get('/reservations', function (req, res, next) {

    res.render("admin/reservations", {
        date: {}
    });

});

router.get('/menus', function (req, res, next) {

    res.render("admin/menus", {

    });

});

router.get('/emails', function (req, res, next) {

    res.render("admin/emails", {

    });

});

router.get('/contacts', function (req, res, next) {

    res.render("admin/contacts", {

    });

});


module.exports = router;