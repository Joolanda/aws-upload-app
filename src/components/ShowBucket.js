import { useState, useEffect } from 'react';
import '../styles.css';
import AWS from 'aws-sdk';
// import DownloadImages from "./DownloadImages";

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

const showBucketparams = {
  Bucket: S3_BUCKET,
  Delimiter: '',
//Prefix: 'images/',
};
const doSomething = () => {
  alert('Your selected image is probably not downloaded, maybe next time!');
}
const ShowBucket = () => {
  const [listFiles, setListFiles] = useState([]);

  useEffect(() => {
    s3.listObjectsV2(showBucketparams, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        setListFiles(data.Contents);
        console.log(data.Contents);
      }
    });
  }, []);

  const dowloadImageparams = {
    // ACL: 'public-read',
    Bucket: 'jols-bucket',
    Key:  `${listFiles.name}`,
    // Key: 'images/IMG_20210606_123456.jpg',
    Expires: 60 * 60 // time in seconds
  };
  
  const url = s3.getSignedUrl('getObject', dowloadImageparams);
  console.log(url);
  // <Dropdown.Item onSelect={() => setImage('DV1')}>
  return (
    <div className='card'>
      <div className='card-header'><h3>Listing all objects in {S3_BUCKET}:</h3></div>
      <h3>Click on the image to download it</h3>
      <ul className='list-group'>
        {listFiles &&
          listFiles.map((name, index) => (
            <li className='list-group-item' key={index} onClick={doSomething}>
              <a href={url}> {name.Key}</a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ShowBucket;
