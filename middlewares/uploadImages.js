const multer = require('multer');


// Memory Storage for multer
exports.uploadSingleImage = (fieldname) => {
    const multerStorage = multer.memoryStorage();

    const multerFilter = (req, file, cb) => {
        if(file.mimetype.startsWith('image')){
            cb(null, true)
        }else{
            cb(new Error('Not an image! Please upload only images.'), false)
        }
    };

    const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

    return upload.single(fieldname)
}