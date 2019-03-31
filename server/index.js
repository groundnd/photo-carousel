const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const photosAndComments = require('../database/index').photosAndComments;

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/photosandcomments/:id', (req, res) => {
  photosAndComments.find().
    exec((err, data) => {
      if (err) {
        console.log('ERROR finding data from db: ', err);
      } else {
        res.send(JSON.stringify(data));
      }
    });
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});


// app.get('/photosandcomments/:id', (req, res) => {
//   console.log(allData());
//   const callback = (data) => {
//     res.send(data);
//   };
//   console.log('here', typeof callback);
//   allData(callback);
//   // res.send(`hi ${req.params.id}`);
// });
