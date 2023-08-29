const express = require('express')
const bodyParser= require('body-parser')
const multer = require('multer');
const app = express();
const fs = require('fs');
 var   path = require('path');

//CREATE EXPRESS APP
app.use(bodyParser.urlencoded({extended: true}))
 
//ROUTES WILL GO HERE
app.get('/', function(req, res) {
    res.json({ message: 'WELCOME' });   
});
 
app.listen(3004, () => console.log('Server started on port 3004 '));


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+''+ file.originalname);
  }
})
 
var upload = multer({ storage: storage })

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file)
})

app.get('/book/:id',function(req,res){
	 var filename = req.params.id;
	 var fileNamedo = "/uploads"+"/" +filename;
	 var filePath1 = path.join(__dirname,fileNamedo);
	
	  try { 
            if (!fs.existsSync(filePath1)) {
				console.log("1");
                 res.sendStatus(404);
                return;
            }
          return    res.download(filePath1); // Set disposition and send it.
           
      } catch (err) {
		  console.log(err);
       return res.sendStatus(404);
     }
})