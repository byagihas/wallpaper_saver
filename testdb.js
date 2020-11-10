const { Client } = require('pg');
const client = new Client();
(async () => {
  await client.connect();
  const res = await client.query('SELECT $1::text as message', ['Hello world!']);
  console.log(res.rows[0].message); // Hello world!
  await client.end();
})();