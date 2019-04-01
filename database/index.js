const mongoose = require('mongoose');
const dbAccessKey = require('./dbAccessKey');


const db = mongoose.connect(`mongodb://${dbAccessKey.DBUSER}:${dbAccessKey.DBPW}@localhost/photosAndComments`, { useNewUrlParser: true });

const photosAndCommentsSchema = mongoose.Schema([
  {
    id: { type: Number, unique: true },
    photosAndComments: [
      {
        imageUrl: String,
        comment: String,
      },
    ],
  },
]);

const photosAndComments = mongoose.model('photosAndComments', photosAndCommentsSchema);


module.exports.photosAndComments = photosAndComments;
module.exports.db = db;
module.exports.photosAndCommentsSchema = photosAndCommentsSchema;


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
