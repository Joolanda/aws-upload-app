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
  Delimiter: '/',
};

const ShowBucket = () => {
  const [listFiles, setListFiles] = useState([]);

  useEffect(() => {
    s3.listObjectsV2(showBucketparams, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        setListFiles(data.Contents);
        console.log(data.Contents);
        return setListFiles(data.Contents);
      }
    });
  }, []);

  return (
    <div className='card'>
      <div className='container-image-gallery'><h3>Listing all objects in {S3_BUCKET}:</h3></div>
      <h3>The easiest way to download an images, is to click the one you like to retrieve!</h3>
      {/* <ul className='list-group'> */}
      <ul className='image-gallery'>
        {listFiles &&
          listFiles.map((name, index) => (
            <li className='list-group-item' key={index} data-key={name.Key}>
              <a href={`https://${S3_BUCKET}.s3.amazonaws.com/${name.Key}`} onClick={() => {
                const dowloadImageparams = {
                  Bucket: S3_BUCKET,
                  Key: name.Key,
                  Expires: 60 * 60 // time in seconds
                };
                const url = s3.getSignedUrl('getObject', dowloadImageparams);
                const modified_url = url.replace(`https://${S3_BUCKET}.s3.amazonaws.com/`, '');
                console.log(modified_url);
              }}>
                <div className='overlay'><span>{name.Key} </span></div>
                <div><img src={`https://${S3_BUCKET}.s3.amazonaws.com/${name.Key}`} alt='My Image' /></div> 
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ShowBucket;
