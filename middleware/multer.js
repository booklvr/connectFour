const path = require('path');
const multer = require('multer');

const uploadImage = multer();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './dist/img/uploads');
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     let filename = file.originalname.replace(/\s+/g, '-');
//     console.log(filename);
//     filename = filename.split('.');
//     console.log(filename);
//     filename.pop();
//     filename += '-' + Date.now() + '.jpg';
//     console.log(filename);

//     cb(null, filename);
//   },
// });
// // MULTER MIDDLEWARE for POST /user/me/avatar
// // MULTER middlware for POST /user/me/avatar
// const uploadImage = multer({
//   storage: storage,
//   // dest: 'avatars',  // provide file for uploaded images in route directory (remove to pass file through function)
//   limits: {
//     // fileSize: 1000000/
//   },
//   fileFilter(req, file, cb) {
//     console.log('inside multer filefilter function'); // req, file-info, callback
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       // restrict file type to jpg jpeg or png -> originalname from multer docs
//       return cb(new Error('File must be .jpg, .jpeg, or .png file type'));
//     }

//     cb(undefined, true); // success
//     // cb(undefined, false); // silently reject
//   },
// });

module.exports = uploadImage;
