const { photosAndComments } = require('../database/index');
const { dbGenerator } = require('../database/dbGenerator');


const seedDb = () => {
  photosAndComments.create(dbGenerator());
};

seedDb();
