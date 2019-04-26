require('newrelic');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
// const index = require('../database/index');
const pool = require('../queries');

const app = express();
const PORT = 3001;

app.use(compression());
app.use(bodyParser.json());
app.use('/carousel/:id', express.static(path.join(__dirname, '../public')));

app.get('/photosandcomments/:id', (req, res) => {
  let id = req.params.id;
  pool.query(`SELECT house_id, photo, comment FROM house_photos WHERE house_id=${id}`, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(results);
    }
  });
});

// app.get('/photosandcomments/:id', (req, res) => {
//   index.photosAndComments.findOne({ id: parseInt(req.params.id, 10) }, { _id: 0 })
//     .select('photosAndComments')
//     .exec((err, data) => {
//       if (err) {
//         console.log('ERROR finding data from db: ', err);
//       } else {
//         res.setHeader('Content-Type', 'application/json');
//         res.json(data);
//       }
//     });
// });

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});


// module.exports = {
//   app,
//   PORT,
// };


// app.get('/photosandcomments/:id', (req, res) => {
//   index.photosAndComments.find()
//     .exec((err, data) => {
//       if (err) {
//         console.log('ERROR finding data from db: ', err);
//       } else {
//         res.setHeader('Content-Type', 'application/json');
//         res.json(data);
//       }
//     });
// });

// app.get('/photosandcomments/:id', (req, res) => {
//   console.log(allData());
//   const callback = (data) => {
//     res.send(data);
//   };
//   console.log('here', typeof callback);
//   allData(callback);
//   // res.send(`hi ${req.params.id}`);
// });
