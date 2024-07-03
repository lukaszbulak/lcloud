const {ListObjectsV2Command} = require("@aws-sdk/client-s3");

function list(s3Client, BUCKET_NAME, PREFIX, listFilter) {

    if (listFilter) {
        console.log('listing files matching regex in S3 bucket...')
    } else {
        console.log('listing ALL files in S3 bucket...')
    }

    const command = new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        Delimiter: "/",
        Prefix: PREFIX,
    });
    const response = s3Client.send(command);
    response.then(value => {
            if (value.$metadata.httpStatusCode !== 200) {
                // handle different http status
                console.log("some error occurred, status not OK", value.$metadata);
                return;
            }
            console.log('succeeded, listing files:');
            console.log('');
            value.Contents.forEach((obj, index) => {

                const fileName = obj.Key.substring(PREFIX.length);
                if (listFilter) {
                    // regex: '.*\.jpg'
                    if (!fileName.match(listFilter)) {
                        return; // not matching regexp, do not list
                    }
                }
                // TODO display file size. distinguish from empty dir
                console.log(fileName)
            })
        }
    ).catch(err => {
        // handle connection error
        console.log("unexpected error occurred:", err)
    });
}

exports.list = list;