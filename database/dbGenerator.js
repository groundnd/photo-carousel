const faker = require('faker');
const { urlPrefix } = require('./imageUrls');
const { japanUrls } = require('./imageUrls');
const { italyUrls } = require('./imageUrls');
const { usUrls } = require('./imageUrls');
const { singaporeUrls } = require('./imageUrls');
const { bathroomUrls } = require('./imageUrls');
const { bedroomUrls } = require('./imageUrls');
const { kitchenUrls } = require('./imageUrls');
const { livingRoomUrls } = require('./imageUrls');
const { otherUrls } = require('./imageUrls');


// Function that generates a random number
const randomNumber = (min, max) => {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
};

// Function that checks if photo has already been selected
const photoIdx = (urlCategory, selectedPhotos) => {
  // Randomly generate a number between 0 and the amount of photos minus 1
  const currPhotoIdx = randomNumber(0, urlCategory.length - 1);
  // Iterate through the tracker array
  if (selectedPhotos.length === 0) {
    return currPhotoIdx;
  }
  for (let i = 0; i < selectedPhotos.length; i += 1) {
    // If number exists, already, rerun the function
    if (selectedPhotos[i] === photoIdx) {
      photoIdx(urlCategory);
    // Else
    } else {
      // Push number into the empty array
      selectedPhotos.push(photoIdx);
      return currPhotoIdx;
    }
  }
};

// Function that generates the room id data
const roomDataGenerator = (minNumPhoto, maxNumPhoto, urlPrefix, urlCategory, currId) => {
  // Create an empty object which will be the current data object in creation
  let roomData = {};
  // Randomly generate number between min to max
  const numPhotos = randomNumber(minNumPhoto, maxNumPhoto);
  // While counter is less than or equal to randomly generated number
  let count = 0;
  while (count <= numPhotos) {
    // Create empty array to keep track of image already used
    const selectedPhotos = [];
    // Select category photo that has not yet been used
    const urlCategoryPhoto = urlCategory[photoIdx(urlCategory, selectedPhotos)];
    // Concat urlPrefix and photo url at generated index
    const photoUrl = urlPrefix + urlCategoryPhoto;
    // Assign empty object with key as 'imageUrl' and value as that conated text
    roomData.imageUrl = photoUrl;
    // Assign object with key as 'comment' and value as randomly generated text
    roomData.comment = faker.lorem.words();
    // Push the object to 'photosAndComments' array
    currId.photosAndComments.push(roomData);
    // Reset object to be empty
    roomData = {};
    // Add one to the counter
    count += 1;
  }
};

// Function that generates all rooms data
const dbGenerator = () => {
  // Create array to store the generated objects
  const db = [];
  // Iterate from 1 to 100 which will be the id number
  for (let i = 1; i <= 100; i += 1) {
    // Create empty object for current room id
    const currId = {};
    // Assign key 'id' and the iteration number as value
    currId.id = i;
    // Assign key 'photosAndComments' with an empty array
    currId.photosAndComments = [];
    // BEDROOM
    // Randomly generate number between 1 - 2
    roomDataGenerator(1, 2, urlPrefix, bedroomUrls, currId);
    // LIVING ROOM
    // If randomly generated number between 0 - 2 is greater than 0
    roomDataGenerator(0, 2, urlPrefix, livingRoomUrls, currId);
    // COUNTRY
    // If id is between 1 to 25
    if (currId.id >= 1 && currId.id <= 25) {
      // If randomly generated number between 0 - 4 is greater than 0
      roomDataGenerator(0, 4, urlPrefix, japanUrls, currId);
    }
    // If id is between 26 to 50
    if (currId.id >= 26 && currId.id <= 50) {
      // If randomly generated number between 0 - 4 is greater than 0
      roomDataGenerator(0, 4, urlPrefix, italyUrls, currId);
    }
    // If id is between 51 to 75
    if (currId.id >= 51 && currId.id <= 75) {
      // If randomly generated number between 0 - 4 is greater than 0
      roomDataGenerator(0, 4, urlPrefix, usUrls, currId);
    }
    // If id is between 76 to 100
    if (currId.id >= 76 && currId.id <= 100) {
      // If randomly generated number between 0 - 4 is greater than 0
      roomDataGenerator(0, 4, urlPrefix, singaporeUrls, currId);
    }
    // KITCHEN
    // If randomly generated number betweem 0 - 1 is greater than 0
    roomDataGenerator(0, 1, urlPrefix, kitchenUrls, currId);
    // BATHROOM
    // If randomly generated number between 0 - 1 is greater than 0
    roomDataGenerator(0, 1, urlPrefix, bathroomUrls, currId);
    // OTHERS
    // If randomly generated number between 0 - 4 is greater than 0
    roomDataGenerator(0, 4, urlPrefix, otherUrls, currId);
    // Push current room id data to db
    db.push(currId);
  }
  // Return the array
  return db;
};


module.exports.dbGenerator = dbGenerator;
