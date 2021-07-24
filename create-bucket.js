const AWS = require('aws-sdk');
const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET_NAME } = require('./config/config.js');

const s3 = new AWS.S3({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY
});

const params = {
  Bucket: BUCKET_NAME,
  CreateBucketConfiguration: {
    LocationConstraint: 'us-east-2'
  }
};

s3.createBucket(params, (err, data) => {
  if (err) console.log(err, err.message);
  else console.log('Bucket Created Successfully', data.Location);
});