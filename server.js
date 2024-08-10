// 서버 객체 만들기 ( cjs 스타일로 )
const http = require("http"); // http 객체 만들기
// 서버 객체 만들기
const server = http.createServer((req, res) => {
    res.writeHead( 200, {'Content-Type' : 'text/plain'});
    res.write("Hello World");
    res.end();
});

// 서버가 응답 하도록 한다. 보통 노드는 3000포트로 돌리기때문에 이걸로 정함
server.listen( 3000, () => {
    console.log("server is listen on 3000 port")
});