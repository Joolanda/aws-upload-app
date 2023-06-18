import { useState, useEffect } from 'react';
import '../styles.css';
import AWS from 'aws-sdk';

const S3_BUCKET ='jols-bucket';
const REGION ='us-east-1';
const API_ACCESS = process.env.REACT_APP_ACCESS;
const API_SECRET = process.env.REACT_APP_SECRET;

AWS.config.update({
  accessKeyId: API_ACCESS,
  secretAccessKey: API_SECRET,
  region: REGION,
});

const s3 = new AWS.S3();

const params = {
  Bucket: S3_BUCKET,
  Delimiter: '',
//   Prefix: 'images/',
};

const ShowBucket = () => {
  const [listFiles, setListFiles] = useState([]);

  useEffect(() => {
    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        setListFiles(data.Contents);
        console.log(data.Contents);
      }
    });
  }, []);

  return (
    <div className='card'>
      <div className='card-header'>Listing all objects in {S3_BUCKET}:</div>
      <ul className='list-group'>
        {listFiles &&
          listFiles.map((name, index) => (
            <li className='list-group-item' key={index}>
              {name.Key}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ShowBucket;
