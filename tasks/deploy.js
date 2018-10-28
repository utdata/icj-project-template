const gulp = require('gulp');
const s3 = require('s3');
const argv = require('yargs').argv;
const config = require('../project.config');
const awsAccess = process.env.AWS_ACCESS_KEY_ID;
const awsSecret = process.env.AWS_SECRET_ACCESS_KEY;

 
module.exports = () => {
  // check for production flag
  const s3_bucket = argv.prod ? config.s3_bucket_production : config.s3_bucket_stage;

  // check for AWS environmental variables
  if (awsAccess && awsSecret) {

    // set up an S3 client
    const client = s3.createClient({
      maxAsyncS3: 20,
      s3RetryCount: 3,
      s3RetryDelay: 1000,
      multipartUploadThreshold: 20971520,
      multipartUploadSize: 15728640,
      s3Options: {
        accessKeyId: awsAccess,
        secretAccessKey: awsSecret,
        region: 'us-west-2'
      }
    });

    // set the upload params
    const params = {
      localDir: "./docs",
      deleteRemoved: true,
      s3Params: {
        Bucket: s3_bucket,
        Prefix: config.url_endpoint,
        ACL: 'public-read',
        CacheControl: 'max-age=60'
      }
    };

    // upload!
    const uploader = client.uploadDir(params);

    uploader.on('error', function(err) {
      console.error("unable to sync:", err.stack);
    });
    uploader.on('progress', function() {
      console.log("progress", uploader.progressAmount, uploader.progressTotal);
    });
    uploader.on('end', function() {
      console.log("\n🐿  🐿  🐿  congrats you just shipped some code\n");
    });
  } else {
    console.error('You\'re missing one or both AWS credential environmental variables.');
  }
};
