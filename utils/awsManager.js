const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

// SET UP AWS S3 middleware

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

exports.uploadFile = (file, foldername, fileName) => {
  // const myFile = file.originalname.split(".");
  // const fileType = myFile[myFile.length - 1];

  const file_name = fileName ? fileName : uuidv4();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${foldername}/${file_name}-${file.originalname}`,
    Body: file.buffer,
  };
  console.log(params);
  return s3.upload(params).promise();
};

exports.getDownloadUrl = (key) => {
  const options = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Expires: 3600, // expire in 1 hour
  };
  const url = s3.getSignedUrl("getObject", options);

  return url;
};
