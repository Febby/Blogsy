const dotenv = require('dotenv');
dotenv.config();

const submitForm = (req, res) => {
  if (!req.method === 'POST') {
    //disable any request that’s not a POST request
    res.status(405).end(); //Method Not Allowed
    return;
  }
  const { name, email, blogurl, feedurl, notes } = req.body;

  const Airtable = require('airtable');
  Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.API_KEY,
  });

  const base = require('airtable').base('appZdzJtNiOFWTeO3');

  base('Table 1').create(
    [{ fields: { name, email, blogurl, feedurl, notes } }],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).end();
        return;
      }
    }
  );

  res.json({
    success: true,
  });
};

export default submitForm;
