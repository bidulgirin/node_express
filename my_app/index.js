
import express, { json } from 'express';
import nunjucks from 'nunjucks';
import path from 'path';
import bodyParser from 'body-parser';
import fs from 'fs';
import mongoose  from 'mongoose';

const app = express();

const __dirname = path.resolve();

const filePath = path.join(__dirname + '/data', 'writing.json'); // 지금 경로 기준으로 data 라는 폴더 안에 있는 writing.json 파일을 경로변수에 담습니다.
console.log("????>>>>", filePath);
// body parser set
app.use(bodyParser.urlencoded({ extended: false })); // express 기본 모듈 사용
app.use(bodyParser.json());

// view engine set
app.set('view engine', 'html'); // main.html -> main(.html)

// nunjucks
nunjucks.configure('views', {
    watch: true, // html 파일이 수정될 경우, 다시 반영 후 렌더링
    express: app
})

// mongoose connect
mongoose
    .connect('mongodb://127.0.0.1:27017')
    .then( () => { console.log('연결 성공')})
    .catch( e => console.error(e))
// mongoose set
const { Schema } = mongoose;

// 스키마 규칙 작성
const WritingSchema = new Schema({
    title : String,
    contents : String,
    date : {
        type : Date,
        default : Date.now
    }
})

// 모델 작성 
const Writing = mongoose.model('Writing', WritingSchema);

// middleware
// main page GET
app.get('/', async (req, res) => {

    const fileData = fs.readFileSync(filePath); // 긁 읽어오기
    const writings = JSON.parse(fileData); // 읽을 수 있게 끔 변환
    res.render('main', {list : writings}); // main 페이지에 랜더할 값으로 list 라는 이름으로 객체 데이터를 넘겨줌
});

app.get('/write', (req, res) => {
    res.render('write');
});

app.post('/write', async (req, res) => {
    const title = req.body.title;
    const contents = req.body.contents;
    const date = req.body.date;

    // db 대신에 json 안에 저장하게끔 하장
    const fileData = fs.readFileSync(filePath); // filePath 를 담아서 그 fileData를 읽어와서 변수에 담음
    console.log(fileData);

    // json 읽을려고
    const fileWrites = JSON.parse(fileData); // 파일을 변환함
    console.log(fileWrites);

    fileWrites.push(
        {
            title : title,
            contents :  contents,
            date: date,
        }
    );

    // 파일의 데이터를 객체로 배열에 푸쉬하려고함 푸쉬 준비....!
    // data/writing.json 에 값 저장하기
    fs.writeFileSync(filePath, JSON.stringify(fileWrites)); // json 파일을 다시 버퍼화 시켜서 경로에 있는파일에 작성하게함

    // 푸쉬할것임

    res.render('detail', { 'detail': { title: title, contents: contents, date: date } });
});

app.get('/detail', async (req, res) => {
    res.render('detail');
})

app.listen(3000, () => {
    console.log('Server is running');
});
