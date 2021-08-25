var conn = require('./../inc/db');
var express = require('express');
var users = require('./../inc/users');
var admin = require('../inc/admin');
var menus = require('../inc/menus');

const { getParams } = require('../inc/admin');

var router = express.Router();

router.use((req, res, next) => {

    if (['/login'].indexOf(req.url) === -1 && (req.session && !req.session.user)) {
        res.redirect('/admin/login');
    } else {
        next();
    }

});

router.use(function (req, res, next) {

    req.menus = admin.getMenus(req);
    next();

});

/* GET users listing. */
router.get('/logout', (req, res, next) => {

    delete req.session.user;

    res.redirect('/admin/login');

});

router.get('/', (req, res, next) => {

    admin.dashboard().then(data => {

        res.render('admin/index', getParams(req, {
            data: data
        }));

    }).catch(err => {
        console.error(err);
    });

});

router.post("/login", function (req, res, next) {

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

router.get("/login", function (req, res, next) {

    if (!req.session.views) req.session.views = 0;

    console.log("SESSION: ", req.session.views++);

    users.render(req, res, null);

});

router.get('/users', function (req, res, next) {

    res.render("admin/users", getParams(req));

});

router.get('/reservations', function (req, res, next) {

    res.render("admin/reservations", getParams(req, {
        date: {}
    }));

});

router.get('/menus', function (req, res, next) {

    menus.getMenus().then(data => {
        
        res.render("admin/menus", getParams(req, {
            data
        }));
    });

});

router.post("/menus", function (req, res, next) {
    res.send(req.body);
});

router.get('/emails', function (req, res, next) {

    res.render("admin/emails", getParams(req));

});

router.get('/contacts', function (req, res, next) {

    res.render("admin/contacts", getParams(req));

});


module.exports = router;