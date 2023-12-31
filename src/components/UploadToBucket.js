
import React , {useState} from 'react';
import '../styles.css';
import AWS from 'aws-sdk'

const S3_BUCKET ='jols-bucket';
const REGION ='us-east-1';
const API_ACCESS = process.env.REACT_APP_ACCESS;
const API_SECRET = process.env.REACT_APP_SECRET;

AWS.config.update({
    accessKeyId: API_ACCESS,
    secretAccessKey: API_SECRET
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const UploadToBucket = () => {


    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            prefix: 'original-images/',
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }


    return <div>
        <div className='container-intro-cloud-project'>
            <h1> AWS NODEjs Image Uploader</h1>
            <h3> As part of my Cloud Computing for Web Developers, I created an application that allows you to upload images to the cloud. Using a Lambda function, the uploaded images are resized to thumnail format. Techniques used:  AWS SDK and see further my github repo link. To be continued...</h3>
            <h3>AWS SDK File Upload Progress is {progress}%</h3>
        </div>
        <input className="button__datei" type="file" onChange={handleFileInput}/>
        <button className="button__primary" onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>
}

export default UploadToBucket;