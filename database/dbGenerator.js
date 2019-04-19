const _ = require('lodash');
const faker = require('faker');
const imageUrls = require('./imageUrls');
const fs = require('fs');
const writer = fs.createWriteStream('./SeedData.csv');

const lorem = faker.lorem.words();

const photoWasSelected = (urlCategory, selectedPhotosSet) => {
  const currPhotoIdx = _.random(0, urlCategory.length - 1);
  if (selectedPhotosSet.has(currPhotoIdx) === false) {
    return currPhotoIdx;
  }
  return photoWasSelected(urlCategory, selectedPhotosSet);
};

const roomDataGenerator = (minNumPhoto, maxNumPhoto, urlPrefix, urlCategory, currId) => {
  const numPhotos = _.random(minNumPhoto, maxNumPhoto);
  const selectedPhotosSet = new Set();
  for (let i = 0; i < numPhotos; i += 1) {
    const roomData = {};
    const selectedPhoto = photoWasSelected(urlCategory, selectedPhotosSet);
    selectedPhotosSet.add(selectedPhoto);
    const urlCategoryPhoto = urlCategory[selectedPhoto];
    const photoUrl = urlPrefix + urlCategoryPhoto;
    roomData.imageUrl = photoUrl;
    roomData.comment = lorem;
    currId.photosAndComments.push(roomData);
  }
};

const dbGenerator = () => {
  const currId = {};
  currId.photosAndComments = [];
  roomDataGenerator(1, 2, imageUrls.urlPrefix, imageUrls.bedroomUrls, currId);
  roomDataGenerator(0, 2, imageUrls.urlPrefix, imageUrls.livingRoomUrls, currId);
  roomDataGenerator(1, 4, imageUrls.urlPrefix, imageUrls.allCountryUrls, currId);
  roomDataGenerator(0, 1, imageUrls.urlPrefix, imageUrls.kitchenUrls, currId);
  roomDataGenerator(0, 1, imageUrls.urlPrefix, imageUrls.bathroomUrls, currId);
  roomDataGenerator(0, 4, imageUrls.urlPrefix, imageUrls.otherUrls, currId);
  return currId;
};

const writeMany = (writer, encoding, callback) => {
  let i = 10000000;
  write();
  function write() {
    let notDead = true;
    do {
      let home = dbGenerator();
      home.id = i;
      home = JSON.stringify(home);
      i--;
      if (i === 0) {
        writer.write(`${home}\n`, encoding, callback);
      } else {
        notDead = writer.write(`${home}\n`, encoding)
      }
    } while (i > 0 && notDead);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}

/*
=========PostgreSQL=========
photos  | comments |    id
--------|----------|--------
url     |  lorem   |    1
url     |  lorem   |    1
url     |  lorem   |    1
url     |  lorem   |    1
url     |  lorem   |    1
url     |  lorem   |    2
url     |  lorem   |    2
url     |  lorem   |    2
url     |  lorem   |    2
url     |  lorem   |    2
===========================

use Object.values() to grab values
restructure generator

need to change generator to have format of:
{photo: url, comment: lorem, id: 1}

url, lorem, 1
url, lorem, 1
*/

writeMany(writer, 'utf8', () => console.log('Check the file'));

module.exports = {
  dbGenerator,
  photoWasSelected,
  roomDataGenerator,
};
