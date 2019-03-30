const photosAndComments = require('../database/index').photosAndComments;
const dbGenerator = require('../database/dbGenerator').dbGenerator;


const seedDb = () => {
  photosAndComments.create(dbGenerator());
};

seedDb();
