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
      s3Options: {
        accessKeyId: awsAccess,
        secretAccessKey: awsSecret,
        region: 'us-west-2'
      }
    });

    // set the delete params
    const params = {
        Bucket: s3_bucket,
        Prefix: config.url_endpoint
    };

    const skull = `
                 uuuuuuu
             uu$$$$$$$$$$$uu
          uu$$$$$$$$$$$$$$$$$uu
         u$$$$$$$$$$$$$$$$$$$$$u
        u$$$$$$$$$$$$$$$$$$$$$$$u
       u$$$$$$$$$$$$$$$$$$$$$$$$$u
       u$$$$$$$$$$$$$$$$$$$$$$$$$u
       u$$$$$$"   "$$$"   "$$$$$$u
       "$$$$"      u$u       $$$$"
        $$$u       u$u       u$$$
        $$$u      u$$$u      u$$$
         "$$$$uu$$$   $$$uu$$$$"
          "$$$$$$$"   "$$$$$$$"
            u$$$$$$$u$$$$$$$u
             u$"$"$"$"$"$"$u
  uuu        $$u$ $ $ $ $u$$       uuu
 u$$$$        $$$$$u$u$u$$$       u$$$$
  $$$$$uu      "$$$$$$$$$"     uu$$$$$$
u$$$$$$$$$$$uu    """""    uuuu$$$$$$$$$$
$$$$"""$$$$$$$$$$uuu   uu$$$$$$$$$"""$$$"
 """      ""$$$$$$$$$$$uu ""$"""
           uuuu ""$$$$$$$$$$uuu
  u$$$uuu$$$$$$$$$uu ""$$$$$$$$$$$uuu$$$
  $$$$$$$$$$""""           ""$$$$$$$$$$$"
   "$$$$$"                      ""$$$$""
     $$$"                         $$$$"
    `

    // delete!
    const deleter = client.deleteDir(params);

    deleter.on('error', function(err) {
      console.error("unable to delete:", err.stack);
    });
    deleter.on('progress', function() {
      console.log("progress", deleter.progressAmount, deleter.progressTotal);
    });
    deleter.on('end', function() {
      console.log("\n\n💀  💀  💀  congrats you just deleted your thing on s3\n");
      console.log(skull);
    });
    
  } else {
    console.error('You\'re missing one or both AWS credential environmental variables.');
  }
};
