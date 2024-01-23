const multer = require('multer');

const multerOptions = () =>{
    const multerStorage = multer.memoryStorage();

    const multerFilter = (req, file, cb) => {
        if(file.mimetype.startsWith('image')){
            cb(null, true)
        }else{
            cb(new Error('Not an image! Please upload only images.'), false)
        }
    };

    const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
    return upload;
}

// Memory Storage for multer
exports.uploadSingleImage = (fieldname) => multerOptions().single(fieldname)

exports.uploadMixOfImages = (arrayOfFields) =>
 multerOptions().fields(arrayOfFields);