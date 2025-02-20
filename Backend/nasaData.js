const fs = require("fs");
const axios = require("axios");
const apiKey = new Promise(function (resolve) {
  fs.readFile("apiKey.json", async function (err, data) {
    if (err) throw err;
    resolve(JSON.parse(data).Api);
  });
});
 async function APOD(date) {
  let urladdress = `https://api.nasa.gov/planetary/apod?date=${date}&&api_key=${await apiKey}`;
  let data = await axios.get(urladdress).then(function (response) {
    return response.data;
  }).catch(function (error) {
    return error
  });
  return data;
}
 async function EPIC(date) {
  let urladdress = `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${await apiKey}`;
  let data = await axios.get(urladdress).then(function (response) {
    return response.data;
  }).catch(function (error) {
    return error
  });
  return data;
}
async function EPICIMAGE(date,imageID){
    let urladdress = `https://api.nasa.gov/EPIC/archive/natural/${date}/png/${imageID}.png?api_key=${await apiKey}
`;
    //let data = await axios.get(urladdress).then(function (response) {
    //  return response.data;
    //}).catch(function (error) {
    //  return error
    //});
    return urladdress;
}

module.exports = { APOD,EPIC,EPICIMAGE };


