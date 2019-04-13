const mongoose = require('mongoose');
const index = require('../database/index');
const dbGenerator = require('../database/dbGenerator');


const seedDb = () => {
  if (index.photosAndComments.collection) {
    index.photosAndComments.db.dropCollection('photosandcomments');
  }
  index.photosAndComments.create(dbGenerator.dbGenerator())
    .then(() => { mongoose.connection.close(); });
};

seedDb();


module.exports.seedDb = seedDb;
