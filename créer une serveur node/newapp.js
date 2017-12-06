const http = require ('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res)=>{
  switch (req){
    case "/home";
    response.writeHead(200, {"Content.Type": "text/html"})

    break;
    case "/admin":
    break;
    case "404":
    break;

  }
});

server.listen(port, hostname, ()=>{

})
