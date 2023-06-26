const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const key = 'example.txt';

const params = {
  Bucket: 'my-bucket',
  Key: key,
  Expires: 60 * 60 // time in seconds
};

const url = s3.getSignedUrl('getObject', params);
console.log(url);

return (
  <div>
    <a href={url}>Download file</a>
  </div>
);