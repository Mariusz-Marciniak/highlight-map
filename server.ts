//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/highlight-map-demo'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/highlight-map-demo/index.html'));
});

app.listen(process.env.PORT || 80);
