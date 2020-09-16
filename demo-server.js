const express = require('express');
const http = require('http');
const fs = require('fs');

const app = express();
const port = process.env.PORT || '8383';

app.use(express.static(__dirname + '/demo'));

app.get('/*', (req, res) => {
  const text = fs.readFileSync(`demo/index.html`, 'utf8');
  res.send(text);
});

app.listen(port, () => console.log(`Running at http://localhost:${port}`));
