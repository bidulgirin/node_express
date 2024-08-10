// 서버 객체 만들기 ( EMS 스타일로 )
import { createServer } from 'http'; // 모듈에서 http 가져오기 

// 서버 객체 만들기
const server = createServer((req, res) => {
    res.writeHead( 200, {'Content-Type' : 'text/plain'});
    res.write("Hello World2");
    res.end();
});

// 서버가 응답 하도록 한다. 보통 노드는 3000포트로 돌리기때문에 이걸로 정함
server.listen( 3000, () => {
    console.log("server is listen on 3000 port")
});