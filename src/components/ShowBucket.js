import React , {useState} from 'react';
import App from '../App';
import '../styles.css';
import {S3Client, ListObjectsV2Command} from "@aws-sdk/client-s3";
// import { fileURLToPath } from 'url';

const ShowBucket = () => {
    
/*   
const params = {
 Bucket: 'my-bucket',
};
const command = new ListObjectsCommand(params);
const data = await s3.send(command); */

    const s3Client = new S3Client({
        region: 'us-east-1',
        endpoint: 'http://localhost:4566',
        forcePathStyle: true
    })

    let listObjectsParams = {
        Bucket: "jols-bucket",
        // The default and maximum number of keys returned is 1000. This limits it to
        // one for demonstration purposes.
        MaxKeys: 10,
    }
    // s3Client.send(listObjectsCmd)

        
    // listObjectsCmd = new ListObjectsV2Command(listObjectsParams)
        
    App.get('/images', (req, res) => {
        listObjectsParams = {
            Bucket: "jols-bucket",
            // The default and maximum number of keys returned is 1000. This limits it to
            // one for demonstration purposes.
            MaxKeys: 10,
        }
        s3Client
        .send(new ListObjectsV2Command(listObjectsParams))
        .then((listObjectsResponse) => {
            res.send(listObjectsResponse)
        })
    })    
    return <div>
    <div>Show Bucket list overview</div>
    <div>Select a bucket and show image files</div>
    <div><h3>list Objects Response: </h3></div>
    <br></br>
    <button></button>
</div>
}


export default ShowBucket;