const multer = require('multer')

// storage
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        callback(null, `img-${Date.now()}-${file.originalname}`)
    }
})

// file filtering
const fileFilter = (req, file, callback) => {
    if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        callback(null, true)
    } else {
        callback(null, false)
        return callback(new Error('Only accepts png,jpg or jpeg type files'))
    }
}

// define upload
const upload = multer({ storage, fileFilter })

module.exports = upload