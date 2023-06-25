import React, { useState } from 'react';
import { ListGroup, Dropdown } from 'react-bootstrap';
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
const DownloadImages = () => {
  const [image, setImage] = useState('Choose an image');

const handleClick = (e) => {
    e.preventDefault();
  };

  const handleDownload = () => {
    const s3 = new AWS.S3();

    const params = {
      Bucket: S3_BUCKET,
      Key: `${image}`,
    };


    function downloadBlob(blob, name = `${image}.csv`) {
      // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
      const blobUrl = URL.createObjectURL(blob);
      // Create a link element
      const link = document.createElement('a');
      // Set link's href to point to the Blob URL
      link.href = blobUrl;
      link.download = name;
      // Append link to the body
      document.body.appendChild(link);
      // Dispatch click event on the link
      // This is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );

      // Remove link from body
      document.body.removeChild(link);
    }

    s3.getObject(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        let csvBlob = new Blob([data.Body.toString()], {
          type: 'text/csv;charset=utf-8;',
        });
        downloadBlob(csvBlob, `${image}`);
      }
    });

}

  return (
    <>
    <div className='card'>
      <div className='card-header'>Upload objects in {S3_BUCKET}:</div>
      <ul>
          <li className='list-group-item' key={image} onClick={handleDownload}>
            {image}
          </li>
      </ul>
    </div>
 {/*      <form className='bg-white my-4' onSubmit={handleClick}>
        <Dropdown>
          <Dropdown.Toggle variant='secondary' id='dropdown-basic'>
            {image}
          </Dropdown.Toggle>
name
          <Dropdown.Menu>
            <Dropdown.Item onSelect={() => setImage('T1')}>
              T1</Dropdown.Item>
            <Dropdown.Item onSelect={() => setImage('IV1')}>
              IV1
            </Dropdown.Item>
            <Dropdown.Item onSelect={() => setImage('IV2')}>
              IV2
            </Dropdown.Item>
            <Dropdown.Item onSelect={() => setImage('DV1')}>
              DV1
            </Dropdown.Item>
            
          </Dropdown.Menu>
        </Dropdown>
        <input
          type='submit'
          value='Download'
          className='btn btn-primary btn-block mt-3'
          onClick={handleDownload}
        />
      
      </form> */}
    </>
  );
};

export default DownloadImages;