const express = require('express');
const models = require('../models/index');
const bcrypt = require('bcrypt');
const addMiddlewares = require('../middlewares/add-middlewares');
const router = express.Router();
const passport = require('passport');
const getUserName = require('../helpers/functions');

addMiddlewares(router, models.User);
const saltRounds = 10;

router.get('/add', (req,res) => {
    res.render('signup')
});

router.get('/enter', function(req, res) {
    res.render('signin');
});

// get user log out
router.get('/logout', (req,res)=> {
    req.logout();
    res.redirect('/')
})

router.get('/profile', async (req,res) => {
    let profileName = await getUserName(req);
    res.render('profile', {userName: profileName.username})
});

router.post('/add', async (req, res) => {
    let curName = await models.User.getName(req.body.username);
    let curEmail = await models.User.getEmail(req.body.email);
    if((curEmail.length && curName.length) === 0) {
        models.User.create({
            "username": req.body.username,
            "email": req.body.email,
            "password": bcrypt.hashSync(req.body.password, saltRounds)})
        res.send(200, "Ok")
    }
    else {
        if(curName.length === 0) {
            res.send(400, 'This name is already used')
        }
        else {
            res.send(400, 'This email is already used')
        }
    }
})


router.post('/enter', (req, res) => {
    addMiddlewares(router, models.User);
    passport.authenticate('local', (err, user) => {
        if (err) {
            return res.sendStatus(400).send(err);
        }
        req.login(user, (err) => {
            if (err) {
                return res.send(400 , err);
            }
            return res.json(user)
        })
    })(req, res);
});



module.exports = router;
