const mongoose = require('mongoose');
const { DBUSER, DBPW } = require('./dbAccessKey');


const db = mongoose.connect(`mongodb://${DBUSER}:${DBPW}@localhost/photosAndComments`, { useNewUrlParser: true });

const photosAndCommentsSchema = mongoose.Schema([
  {
    id: { type: Number, unique: true },
    photosAndComments: [
      {
        imageUrl: String,
        comment: String,
        _id: false,
      },
    ],
  },
]);

const photosAndComments = mongoose.model('photosAndComments', photosAndCommentsSchema);


module.exports = {
  photosAndComments,
  db,
  photosAndCommentsSchema,
};


// const allData = (callback) => {
//   console.log('what', callback);
//   photosAndComments.find().
//     exec((err, data) => {
//       if (err) {
//         console.log('ERROR finding data from db: ', err);
//       } else {
//         console.log('cb: ', callback);
//         callback(JSON.stringify(data));
//       }
//     });
// };
