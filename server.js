const fs = require(`fs`);
const express = require(`express`);
const bodyParser = require(`body-parser`);
const { json } = require("body-parser");
const app = express();
const port = process.env.port || 5000;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require(`mysql`);

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password : conf.password,
  port : conf.port,
  database: conf.database
});
connection.connect();

//multer 는 중복되지않는 선에서 파일을 업로드 할 수 있게 만드는 방법이다.
const multer = require('multer');
const upload = multer({dest: './upload'});

app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM customer",
    (err, rows, fields) =>{ 
      res.send(rows);
    }
  );
});

//업로드 폴더의 경로를 매핑하는 방법
app.use('/image', express.static('./upload')); 

app.post('/api/customers', upload.single('image'), (req,res)=> {
  let sql = 'INSERT INTO customer VALUES(NULL, ?,?,?,?,?)';
  let image = '/image/' + req.file.filename; 
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];
   
    connection.query(sql, params, (err, rows, fields) =>{
      res.send(rows);
      console.log(err);
      console.log(rows);
    }
  );

})

app.listen(port, function(){ console.log(`Listening on port ${port}`);
});

