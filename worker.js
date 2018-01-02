// const axios = require("axios");
// const request = require("request");
// // axios
// //   .get("localhost:3000", { data: "5YJSA1DG9DFP14705" })
// //   .then(res => console.log("res", res))
// //   .catch(e => console.error("e", e));
// console.log("about to start");
// // axios({
// //   method: "POST",
// //   url: "http://localhost:3000/part",
// //   data: {
// //     vin: "5YJSA1DG9DFP14705"
// //   }
// // });

// axios
//   .post("http://localhost:3000/part?vin=5YJSA1DG9DFP14705")
//   .then(function(response) {
//     console.log("response.data", response.data);
//   })
//   .catch(function(error) {
//     console.log("error", error);
//   });

// // // Optionally the request above could also be done as
// // axios.get('/user', {
// //     params: {
// //       ID: 12345
// //     }
// //   })
// //   .then(function (response) {
// //     console.log(response);
// //   })
// //   .catch(function (error) {
// //     console.log(error);
// //   });
const request = require('request');

function work(vin) {
  return request({
    method: 'GET',
    uri: 'http://localhost:' + '3000' + '/getVinData?vin=5YJSA1DG9DFP14705',
    json: vin,
    function(err, response, body) {
      if (err) {
        console.log('body inside forloop', body);
        console.error(err);
      }
      if (response) {
        console.log('response', response);
      }
    },
  });
  // concatEmptySpaces(toBeSaved['genDesc'])
}

work('5YJSA1DG9DFP14705');
