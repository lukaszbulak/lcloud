const {PutObjectCommand} = require("@aws-sdk/client-s3");
const fs = require('fs');
const path = require("path");

function upload(s3Client, bucketName, prefix, localFilePath) {
    console.log("Uploading file " + localFilePath);

    const fileName = path.basename(localFilePath);

    fs.readFile(localFilePath, function (err, data) {
        if (err) {
            throw err;
        }

        const command = new PutObjectCommand({
            Body: data,
            Bucket: bucketName,
            Key: prefix + fileName,
            // TODO ACL and other params...
        });
        const response = s3Client.send(command);
        response.then(value => {
            console.log("upload complete:", value.$metadata.httpStatusCode);
        }).catch(err => {
            console.log("error uploading:", err);
        })
    });
}


exports.upload = upload;
