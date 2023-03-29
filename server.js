const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/bukkinyulsz-andular'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname + '/dist/bukkinyulsz-andular/index.html'));
});
app.listen(80);


