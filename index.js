// imports
const {S3Client, ListObjectsV2Command} = require("@aws-sdk/client-s3");
const {list} = require("./list");
const {upload} = require("./upload");
const {deleteObjects} = require("./delete");


// parameters
/*
const ACCESS_KEY_ID = "AKIAVKNBWT6M44ZQK7X2";
const ACCESS_KEY = "pOjhKwGRM6rt6MIkdVeF/xWtySNA+CG7gHBkQ7UP";
const BUCKET_NAME = `developer-task`;
const PREFIX = `a-wing/`;
const LOCAL_FILE = 'package.json'; // TEMPORARY
const LIST_FILTER = '.*\\.jpg'; // *.jpg
const DELETE_FILTER = '.*\\.json'; // *.json
*/



// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });

// 0: node executable C:\Program Files\nodejs\node.exe
// 1: script name: C:\.....\index.js
// remaining are script params:
// 2: ACCESS_KEY_ID
// 3: ACCESS_KEY
// 4: BUCKET_NAME
// 5: PREFIX
// 6: cmd


if (process.argv.length < 7) {
    // no params provided. display help
    console.log("not enough params provided")
    help()
} else {
    const ACCESS_KEY_ID = process.argv[2];
    const ACCESS_KEY = process.argv[3];
    const BUCKET_NAME = process.argv[4];
    const PREFIX = process.argv[5];
    const cmd = process.argv[6];

    // create objects
    const s3Client = new S3Client({
            region: 'eu-west-1',
            credentials: {
                accessKeyId: ACCESS_KEY_ID,
                secretAccessKey: ACCESS_KEY
            }
        }
    );

    switch (cmd) {
        case "list":
            let LIST_FILTER;
            if (process.argv.length < 5) {
                LIST_FILTER = undefined;
            } else {
                LIST_FILTER = process.argv[5];
            }
            list(s3Client, BUCKET_NAME, PREFIX, LIST_FILTER)
            break;
        case "upload":
            if (process.argv.length < 5) {
                console.log("missing local file path");
                break;
            }
            const LOCAL_FILE = process.argv[5];
            upload(s3Client, BUCKET_NAME, PREFIX, LOCAL_FILE)
            break;
        case "delete":
            if (process.argv.length < 5) {
                console.log("missing delete regex");
                break;
            }
            const DELETE_FILTER = process.argv[5];
            deleteObjects(s3Client, BUCKET_NAME, PREFIX, DELETE_FILTER)
            break;
        default:
            help()
    }
}
function help() {
    console.log("S3 client application")
    console.log("  use commands:")
    console.log("   list  BUCKET PREFIX <regex>")
    console.log("      lists files in bucket with prefix, limiting to <regex> if provided")
}