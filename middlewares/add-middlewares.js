'use strict';
const models = require('./../models/index');
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

function addMiddlewares(router, role) {
    passport.use(new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            const foundUsers = await role.getEmail(email);
            if(foundUsers.length === 0) {
                return done(400, 'Error. Email not found!');
            } else {
                if(bcrypt.compareSync(password, foundUsers[0].password)) {
                    return done(null, foundUsers[0]);
                } else {
                    return done(400, 'Error. Password not correct!');
                }
            }
        }
    ));

    router.use(bodyParser.urlencoded({ extended: false })); // Form data
    router.use(bodyParser.json()); // JSON
    router.use(session({
        genid: (req) => {
            return uuid(); // use UUIDs for session IDs
        },
        store: new FileStore(),
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 10*60*10000 }
    }));
    router.use(passport.initialize());
    router.use(passport.session());
    passport.serializeUser((user, done) => {
        const currentUser = {
            username: user.username,
            id: user.id,
            email: user.email
        }
        done(null, currentUser);
    });
    passport.deserializeUser( async (user, done) => {
        done(null, user);
    });
}

module.exports = addMiddlewares;