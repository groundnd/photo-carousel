function randomHome(userContext, events, done) {
  let id = Math.ceil(Math.random() * 10000000);
  userContext.vars.id = id;
  return done();
}

module.exports = { randomHome };