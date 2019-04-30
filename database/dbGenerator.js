const _ = require('lodash');
const faker = require('faker');
const fs = require('fs');
const imageUrls = require('./imageUrls');

const photoWriter = fs.createWriteStream('./PhotoInfo.csv');
const idWriter = fs.createWriteStream('./houseId.csv');

const lorem = faker.lorem.words();
let photoId = 0;

const roomDataGenerator = (urlPrefix, urlCategory, houseId) => {
  const info = [];
  const randomIndex = _.random(0, urlCategory.length - 1);
  const urlCategoryPhoto = urlCategory[randomIndex];
  // const lorem = faker.lorem.words();
  photoId += 1;
  info.push(photoId);
  info.push(houseId);
  info.push(urlPrefix + urlCategoryPhoto);
  info.push(lorem);
  return info;
};

const dbGenerator = (houseId) => {
  const house = {};
  for (let i = 0; i < _.random(1, 2); i += 1) {
    house[`bedroom${i}`] = roomDataGenerator(imageUrls.urlPrefix, imageUrls.bedroomUrls, houseId);
  }
  for (let i = 0; i < _.random(0, 2); i += 1) {
    house[`living${i}`] = roomDataGenerator(imageUrls.urlPrefix, imageUrls.livingRoomUrls, houseId);
  }
  for (let i = 0; i < _.random(1, 4); i += 1) {
    house[`country${i}`] = roomDataGenerator(imageUrls.urlPrefix, imageUrls.allCountryUrls, houseId);
  }
  for (let i = 0; i < _.random(0, 1); i += 1) {
    house[`kitchen${i}`] = roomDataGenerator(imageUrls.urlPrefix, imageUrls.kitchenUrls, houseId);
  }
  for (let i = 0; i < _.random(0, 1); i += 1) {
    house[`bath${i}`] = roomDataGenerator(imageUrls.urlPrefix, imageUrls.bathroomUrls, houseId);
  }
  for (let i = 0; i < _.random(0, 4); i += 1) {
    house[`other${i}`] = roomDataGenerator(imageUrls.urlPrefix, imageUrls.otherUrls, houseId);
  }
  return house;
};

const formatPhotoInfoToCSV = (home) => {
  const keys = Object.keys(home);
  let data = '';
  for (let i = 0; i < keys.length; i += 1) {
    data += `${home[keys[i]]}\n`;
  }
  return data;
};

const writeManyPhotos = (writer, encoding, callback) => {
  let i = 1000000;
  function write() {
    let ok = true;
    do {
      let home = dbGenerator(i);
      home = formatPhotoInfoToCSV(home);
      i -= 1;
      if (i === 0) {
        writer.write(home, encoding, callback);
      } else {
        ok = writer.write(home, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
};

const writeManyIds = (writer, encoding, callback) => {
  let i = 1000;
  function write() {
    let ok = true;
    do {
      let id = `${_.random(1, 10000000)}\n`;
      i -= 1;
      if (i === 0) {
        writer.write(id, encoding, callback);
      } else {
        ok = writer.write(id, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
};

// writeManyPhotos(photoWriter, 'utf8', () => console.log('Wrote photo info.'));
writeManyIds(idWriter, 'utf8', () => console.log('Wrote house ID info.'));

module.exports = {
  dbGenerator,
  roomDataGenerator,
};
