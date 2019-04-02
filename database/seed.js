const index = require('../database/index');
const dbGenerator = require('../database/dbGenerator');


const seedDb = () => {
  index.photosAndComments.create(dbGenerator.dbGenerator());
};

seedDb();


module.exports.seedDb = seedDb;
