const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', async (req, res) => {
    const apiId = '064c476898f31aa8b42ca92eb8ccdb90';
    const depCity = req.body.depCity;
  
    try {
      const response = await axios.get(
        `https://api.aviationstack.com/v1/flights`,
        {
          params: {
            access_key: apiId,
            dep_iata: depCity
          }
        }
      );
      const flightData = response.data;
  
      res.render('result', { flights: flightData.data });
    } catch (error) {
      console.log('Error:', error);
      res.send('An error occurred');
    }
  });
  

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
