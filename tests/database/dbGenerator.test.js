/* eslint-disable no-undef */
const dbGenerator = require('../../database/dbGenerator');
const imageUrls = require('../../database/imageUrls');


test('Should return a number', () => {
  expect(typeof dbGenerator.photoIdx(imageUrls.bedroomUrls, [])).toBe('number');
  expect(typeof dbGenerator.photoIdx(imageUrls.bathroomUrls, [])).toBe('number');
});

test('Should generate an array of 100 elements', () => {
  expect(dbGenerator.dbGenerator().length).toBe(100);
});
