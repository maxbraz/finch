const express = require("express");
const cors = require("cors");
const axios = require("axios");
const router = express.Router();
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
path = require('path');
app.use(express.static(path.join(__dirname, '/../public')));

//to do better - store these in the db
let access_token;
let providerName;
let company_id;

// get driver connection
const dbo = require("./db/conn");

app.get('/company', (request,response) => {
  var axios = require("axios").default;

  var options = {
    method: 'GET',
    url: 'https://finch-sandbox-se-interview.vercel.app/api/employer/company',
    headers: {
      'Content-Type': 'application/json',
      'Finch-API-Version': '2020-09-17',
      Authorization: `Bearer ${access_token}`
    }
  };

  axios.request(options).then(function (res) {
    console.log('*****Good Company GET response**************');
    response.send(res.data);
  }).catch(function (error) {
    console.error(error);
  });
})

app.get('/employees', (request, response) => {
  var axios = require("axios").default;

  var options = {
    method: 'GET',
    url: 'https://finch-sandbox-se-interview.vercel.app/api/employer/directory',
    headers: {
      'Content-Type': 'application/json',
      'Finch-API-Version': '2020-09-17',
      Authorization: `Bearer ${access_token}`
    }
  };

  axios.request(options).then(function (res) {
    console.log('*****good employeee GET response******');
    // console.log('********employee response data: ',res.data)
    response.send(res.data);
  }).catch(function (error) {
    console.error(error);
  }); 
});

// This section will help you post a token to the db
app.post('/createToken', (request, response) => {
  // console.log('*********This is the request.body*******************: ', request.body);
  
  let provider = request.body.provider;
  console.log('this is the provider passed to the server: ', provider);
  
  axios.post(
    'https://finch-sandbox-se-interview.vercel.app/api/sandbox/create',
    // '{\n    "provider": "gusto",\n    "products": ["company", "directory", "individual", "employment", "payment", "pay_statement"]\n  }',
    {
        'provider': provider,
        'products': [
            'company',
            'directory',
            'individual',
            'employment',
            'payment',
            'pay_statement'
        ]
    },
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
  )
  .then(function(provider) {
    console.log(provider.data);
    let db_connect = dbo.getDb("tokens");

    db_connect.collection("records").insertOne(provider.data, function (err, res) {
      console.log(provider.data.access_token);
      access_token = provider.data.access_token;
      console.log('this is the access token variable at the top of server.js: ',access_token)

      let responsePayload = {"payroll_provider_id": provider.payroll_provider_id,
        "company_id": provider.company_id,
      }

      if (err) throw err;
      response.json(responsePayload);
    });
  })
  .catch(err => console.log('*******THIS IS THE POST ERROR***********: ', err))
  });
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});