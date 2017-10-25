const express = require('express');
const path = require('path');
const app = express();
const guid = require('guid');
const axios = require('axios');
const api = require('./api.js');

const clientId = process.env.HUBPORTAL_CID;
const clientSecret = process.env.HUBPORTAL_CS;

let authToken = null;
let state = null;


app.use('/portal', express.static(path.join(__dirname, '../build')));

app.use('/authorize',(req, res, next) => {  
    if(state === req.query.state) {
        const code = req.query.code;
        
        axios.post('https://github.com/login/oauth/access_token',{
            client_id: clientId,
            client_secret: clientSecret,
            code: code
        },{
            headers: {'Accept':'application/json'}  
        }).then(ares => {
            authToken = ares.data;
            next();
        }).catch(e => {
            console.log(e);
            res.send("Error: " + e.Message);
        });
    }
    else {
        res.send("Invalid State");
    }
});

app.use((req, res) => {
    if(!authToken) {
        state = guid.raw();
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo&state=${state}`);
    } 
});

app.get('/api',(req, res) => {
    api.getFollowing(req.query.user, authToken.access_token).then(data => res.json(data));
});


app.listen(8033, () => console.log("listening on 8033.."));