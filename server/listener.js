const express = require('express');
const path = require('path');
const app = express();
const api = require('./api');

const authToken = process.env.HUBPORTAL_TOKEN;

app.use('/', express.static(path.join(__dirname, '../build')));

app.get('/api',(req, res) => {
    api.followers(authToken)
    .then(result => res.json(result))
    .catch(e => {
        console.log(e);
        res.json({data:[]});
    });
});


app.listen(8033, () => console.log("listening on 8033.."));