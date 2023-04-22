const path = require('path');
const express = require("express");
const admin = require("firebase-admin");
const {spawn} = require('child_process');
const multer = require('multer');
var dataToSend='ye';


const storage = multer.diskStorage({
  destination(req, file, cb) {
    
    const dir = file.fieldname;
    cb(null, dir);
  },
   filename(req, file, cb) {
   const fileNameArr = file.originalname;
   cb(null, `${fileNameArr}`);
  },
});



const upload = multer({ storage });

//auth
const bodyParser=require('body-parser')
const ejs=require('ejs');
const app = express(); 
const port = process.env.PORT || 3008;
app.use(bodyParser.json())

app.engine('html',require("ejs").renderFile);
app.get("/signup",function(req,res){
  res.render("index.html");
})

app.get("/profile", function (req, res) {
  res.render("new.html");
});







app.use(express.static('views/assets'));
app.use(express.static('Enroll'));
app.use(express.static('validation'));
app.use(express.static('views'))
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname, 'views/index.html'));
  res.sendFile(path.join(__dirname,'views/new.html'));
});
app.get('/dat',(req,res)=>{

  const python = spawn('python', ['E:/mini project/script.py']);
  python.stdout.on('data', function (data) {
   dataToSend = data.toString();
  });
  python.on('close', (code) => {
  let dat = {result:dataToSend};
  res.json(dat);

  }); 
}); 
app.post('/record', upload.any(), (req, res) => res.json({ success: true }));

// app.post('/record', upload.single('validation'), (req, res) => res.json({ success: true }));
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});