const AWS = require('aws-sdk');
const sharp = require('sharp');
// const s3 = new AWS.S3(); using S3Client instead, refactoring below
const { S3Client, CopyObjectCommand } = require('@aws-sdk/client-s3')
// , PutObjectCommand
const DEST_BUCKET ='jols-bucket'
const REGION ='us-east-1';
const API_ACCESS = process.env.REACT_APP_ACCESS;
const API_SECRET = process.env.REACT_APP_SECRET;

AWS.config.update({
  accessKeyId: API_ACCESS,
  secretAccessKey: API_SECRET,
  region: REGION,
});

exports.handler = async(event) => {
  // Read data from event object.
  const region = event.Records[0].awsRegion
  const sourceBucket = event.Records[0].s3.bucket.name
  const sourceKey = event.Records[0].s3.object.key
  
  // let newSourceKey = `${sourceKey}-copy`
  console.log('sourceKey: ', sourceKey);
  // Instantiate a new S3 client.
  const s3Client = new S3Client({
    region: region,
  })

  try {
    const copyObjectParams = {
      Bucket: DEST_BUCKET,
      Key: sourceKey,
      CopySource: `${sourceBucket}/${sourceKey}`
    };
    console.log('copyObjectParams: ', copyObjectParams);
    
    const putObjectParams = {
      Bucket: `${bucket}-resized`, /* global bucket */
      Key: `resized-${key}`, /* global key */
      Body: resizedImage,
    };
    const data = await s3Client.send(new GetObjectCommand(params)); /* global GetObjectCommand */  /* global params */
    const resizedImage = await sharp(data.Body)
      .resize(200, 200)
      .toBuffer();
    const putObjectResult = await s3Client.send(new PutObjectCommand(putObjectParams));
    const copyObjectResult = s3Client.send(new CopyObjectCommand(copyObjectParams));

    // Execute object copy between buckets and return the result.
    return s3Client.send(new CopyObjectCommand(copyObjectParams)),
      console.log('copyObjectResult: ', copyObjectResult);
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        body: JSON.stringify('Error resizing and uploading img'),
      };
    }
  };

// Path: src\components\ImageShark.js