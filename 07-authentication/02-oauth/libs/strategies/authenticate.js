const User = require('../../models/User');

module.exports = async function authenticate(strategy, email, displayName, done) {
  if (!email) {
    return done(null, false, 'Не указан email');
  }

  const user = await User.findOne({email: email});

  if (user) {
    return done(null, user);
  } else {
    try {
      const newUser = await User.create({
        email: email,
        displayName: displayName,
      });

      return done(null, newUser);
    } catch (err) {
      return done(err);
    }
  }
};
