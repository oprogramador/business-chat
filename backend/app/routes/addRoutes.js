import bodyParser from 'body-parser';
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
    .use(passport.authenticate('basic', { session: false }));
};
