import http from 'http';
import fs from 'fs';
 
const server = http.createServer((request, response) => {
  const text = fs.readFileSync('demo/index.html', 'utf8');
  response.write(text);
  response.end();
});
 
server.listen(8383, () => {
  console.log('Running at http://localhost:8383');
});