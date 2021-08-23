var conn = require('./../inc/db');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {

    res.render("admin/index", {

    });

});

router.get('/login', function (req, res, next) {

    res.render("admin/login", {

    });

});

router.get('/users', function (req, res, next) {

    res.render("admin/users", {

    });

});

router.get('/reservations', function (req, res, next) {

    res.render("admin/reservations", {

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