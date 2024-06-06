const http = require('http');

const Server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world');
});

const port = 8086;

Server.listen(port, ()=>{
  console.log(`server listening on port ${port}`)
})

