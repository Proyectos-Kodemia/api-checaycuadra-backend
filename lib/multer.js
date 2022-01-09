const multer = require('multer')
const AWS = require('aws-sdk')
const multerS3 = require('multer-s3')

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region:process.env.AWS_REGION_NAME
})

const s3Config = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region:process.env.AWS_REGION_NAME,
    Bucket: process.env.AWS_BUCKET_NAME
})

const multerS3config = multerS3({
    s3:s3Config,
    bucket: process.env.AWS_BUCKET_NAME,
    acl:'public-read',
    metadata: function(req,file,cb){
        cb(null,{fieldName: file.fieldname})
    },
    key: function (req,file,cb){
        cb(null, `${new Date().toISOString()}-${file.originalname}`)
    }
})

const upload = multer({storage:multerS3config})

module.exports = upload