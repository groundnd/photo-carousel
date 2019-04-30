const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'bk',
  host: 'localhost',
  database: 'carousel',
  port: 5432,
});

module.exports = pool;