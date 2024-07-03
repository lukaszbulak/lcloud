const {DeleteObjectsCommand, ListObjectsV2Command} = require("@aws-sdk/client-s3");

function deleteObjects(s3Client, bucketName, prefix, filter) {
    console.log("listing objects to delete...")
    const command = new ListObjectsV2Command({
        Bucket: bucketName,
        Delimiter: "/",
        Prefix: prefix,
    });
    const response = s3Client.send(command);
    response.then(value => {
            if (value.$metadata.httpStatusCode !== 200) {
                // handle different http status
                console.log("some error occurred, status not OK", value.$metadata);
                return;
            }

            const filtered = value.Contents.filter((obj) => {
                const fileName = obj.Key.substring(prefix.length);
                return fileName.match(filter);
            });

            // now we have filtered list. try to delete
            // partition by 1000 as DeleteObjectsCommand limit
            const partitioned = partition(filtered, 1000);
            partitioned.forEach(part => {
                console.log("deleting part of ", part.length);

                const objects = [];
                part.forEach(e => {
                    objects.push({Key: e})
                })
                const deleteParam = {
                    Bucket: bucketName,
                    Delete: { Objects: objects
                    }
                };
                const delCommand = new DeleteObjectsCommand(deleteParam);
                const delResponse = s3Client.send(delCommand);
                delResponse.then(value => {
                    console.log("delete response", value.$metadata);
                }).catch(err => {
                    console.log("unexpected error occurred deleting:", err)
                });
            })
        }
    ).catch(err => {
        // handle connection error
        console.log("unexpected error occurred listing:", err)
    });
}

function partition(array, n) {
    return array.length ? [array.splice(0, n)].concat(partition(array, n)) : [];
}


exports.deleteObjects = deleteObjects;
