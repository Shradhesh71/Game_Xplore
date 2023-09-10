const multer = require('multer');
const path = require('path');
const fs = require('fs');

// import formidable from 'formidable';  // "type": "module", add this in package.json

// Check if the directory exists, if not, create it
// const uploadDirectory = './uploads';
// if (!fs.existsSync(uploadDirectory)) {
//   fs.mkdirSync(uploadDirectory);
// }
// const storage = multer.diskStorage({
//   destination: './uploads', // Specify your upload directory here
//   filename: (req, file, callback) => {
//     console.log('Finished uploading!');
//     callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // for file extension
//   },
// });
const storage = multer.diskStorage({
  destination:  (req, file, callback) => {
      fs.opendir('./uploads', (err) => {
          if(err) {
              console.log(err.stack)
          } else {
              callback(null, './uploads');
          }
          console.log('Finished uploading!');
      })
  },
  filename: (req, file, callback) =>{
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // for file extension
  }
});

exports.uploadfile =(req,res)=>{
  const uploadDirectory = './uploads';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}
const storage = multer.diskStorage({
  destination: './uploads', // Specify your upload directory here
  filename: (req, file, callback) => {
    console.log('Finished uploading!');
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // for file extension
  },
});
  var upload = multer({ storage : storage,
    fileFilter: (req, file, callback) =>{    // this function is used to filter upload by extension
        var ext = path.extname(file.originalname+".jpg");
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        console.log("at before callback ; "+ext);
        callback(null, true)
    }
  }).single('userFile');
  upload(req,res,(err) =>{
    if(err) {
        return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
});
};
// exports.upload = multer({
//   storage: storage,
//   fileFilter: (req, file, callback) =>{
//   var ext = path.extname(file.originalname);
//   if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
//     return callback(new Error('Only images are allowed'))
//   }
//   callback(null, true)
//   }
//   });