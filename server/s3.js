// import aws from 'aws-sdk';
const aws = require('aws-sdk')
const dotenv = require('dotenv')

// const dotenv = require('dotenv');
// import crypto, { randomBytes } from 'crypto';
// import { promisify } from "util";

dotenv.config();
// const randomBytes = promisify(crypto.randomBytes)

const region = "us-east-2";
const bucketName = "spinal-stim-forum-test-bucket";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

async function generateUploadURL() {
    // const rawBytes = await randomBytes(16);
    const imageName = 'image Name'; //rawBytes.toString('hex');
    
    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })
    console.log(params);
    

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL;
}

module.exports = generateUploadURL;