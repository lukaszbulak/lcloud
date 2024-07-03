TASK DESCRIPTION
=================

1. Create a new GitHub account or use yours and create a public repository:

2. Write a nodejs CLI that can do the following things, work from top to bottom of the list getting each one done before moving to the next (120min):

   - List all files in an S3 Bucket
   - Upload a local file to a defined location in the bucket
   - List an AWS buckets files that match a "filter" regex 
   - Delete all files matching a regex from a bucket

    Please use following credentials:
    
        access key id: xxx
        access key: yyyy/yyy+yyy
    
    You have access to S3 bucket named "developer-task", but limited to contents of "a-wing" prefix (directory)
    Please push your final work to GitHub repo and also use this repository to save your progress of work min 2-3 times.

3. (*) Please use the ENV variables for configuring the sdk, you can check AWS documents (120min): 
    Javascript SDK: http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-environment.html
    If you don't have practices with AWS, you have additional 120min for reading AWS documentation.

4. (*) If you have more free time and feel that you can improve your code, you can work more and push code to the same repo with your improvement. (60min)


(*) - optional if you need these points, you have additional time.


SOLUTION
=========
To run, just execute

    node .

in current directory.