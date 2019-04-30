require('newrelic');

const express = require('express');
const path = require('path');
const pool = require('../queries');

const redis = require('redis');
const client = redis.createClient();

const app = express();
const PORT = 3001;

app.use('/carousel/:id', express.static(path.join(__dirname, '../public')));

const getHome = (req, res, id) => {
  pool.query(`SELECT house_id, photo, comment FROM house_photos WHERE house_id=${id}`)
    .then(result => {
      client.setex(id, 3600, JSON.stringify(result));
      res.status(200).send(result);
    })
    .catch(err => res.status(500).send(err))
};

const getCache = (req, res) => {
  let id = req.params.id;
  client.get(id, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      getHome(req, res, id); 
    }
  })
}

app.get('/photosandcomments/:id', getCache)

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
