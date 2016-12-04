import passport from 'passport';
import passportHttp from 'passport-http';
import verify from 'business-chat-backend/authentication/verify';

export default () => {
  passport.use(new passportHttp.BasicStrategy(
    (username, password, done) => {
      verify(username, password)
        .then(user => done(null, user))
        .catch(() => done(null, false));
    }
  ));

  return [
    passport.initialize(),
    passport.authenticate('basic', { session: false }),
  ];
};
