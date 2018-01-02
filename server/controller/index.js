const axios = require('axios');
const baseURL = [
  'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/',
  '?format=json&modelyear=',
];

module.exports = {
  getVinData: {
    get: (req, res) => {
      console.log('here', req.query.vin);

      decode(req.query.vin)
        .then((d) => {
          const results = sortData(d.data.Results[0]);
          return res.send(results);
        })
        .catch((e) => {
          console.error('e', e);
          return res.send(e);
        });
    },
  },
};

function decode(vin) {
  if (vin === undefined || vin.length < 1 || vin === null) {
    return { results: false };
  }
  const url = baseURL[0] + vin + baseURL[1];
  console.log('url 31', url);
  return axios(url);
}

const sortData = (data) => {
  const nonEmptyData = {};
  for (const key in data) {
    if (data[key] !== '') {
      nonEmptyData[key] = data[key];
    }
  }
  nonEmptyData.results = true;
  return nonEmptyData;
};
