import { messageModel, roomModel, teamModel, userModel } from 'business-chat-backend/model/Models';
import bodyParser from 'body-parser';
import createRoutesFromModel from 'business-chat-backend/routes/createRoutesFromModel';
import express from 'express';
import passport from 'passport';
import passportHttp from 'passport-http';
import verify from 'business-chat-backend/authentication/verify';

export default (app) => {
  passport.use(new passportHttp.BasicStrategy(
    (username, password, done) => {
      verify(username, password)
        .then(user => done(null, user))
        .catch(() => done(null, false));
    }
  ));

  return app.use(bodyParser.json())
    .use(passport.initialize())
    .use(passport.authenticate('basic', { session: false }))
    .use('/message', createRoutesFromModel(express.Router(), messageModel))
    .use('/room', createRoutesFromModel(express.Router(), roomModel))
    .use('/team', createRoutesFromModel(express.Router(), teamModel))
    .use('/user', createRoutesFromModel(express.Router(), userModel));
};
