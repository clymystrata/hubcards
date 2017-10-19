const express = require('express');
const path = require('path');
const app = express();

app.use('/', express.static(path.join(__dirname, '../build')))

app.listen(8033, () => console.log("listening on 8033.."));