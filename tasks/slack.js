const gulp = require('gulp');
const config = require('../project.config');
const request = require('request');
const argv = require('yargs').argv;
const slackUrl = process.env.SLACK_WEBHOOK;


module.exports = () => {
  // check for production flag
  const s3_url = argv.prod ? config.s3_root_url_production : config.s3_root_url_stage;
  const url_endpoint = argv.prod ? config.s3_bucket_production : config.s3_bucket_stage;

  // check for slack environmental variable
  if (slackUrl) {

    // are we uploading or deleting?
    const is_upload = (argv._.includes('deploy') || argv._.includes('ship')) ? true : false;

    let slack_attrs = {
      message: ["hello yes i just pushed some code to ",
                s3_url,
                config.url_endpoint
               ].join(""),
      username: "UploadBot",
      icon_emoji: ":rocket:"
    }

    if (!is_upload) {
      slack_attrs.message = ["hello yes i just deleted some code at ",
                config.url_endpoint
               ].join("");
      slack_attrs.username = "DeleteBot";
      slack_attrs.icon_emoji = ":skull_and_crossbones:";
    }


    const payload = {
      "text": slack_attrs.message,
      "channel": "#bakery",
      "username": slack_attrs.username,
      "icon_emoji": slack_attrs.icon_emoji
    };

    // send the request
    request.post({
        url: slackUrl,
        json: payload
      },
      function callback(err, res, body) {
        if (body !== "ok") {
          return console.error('slack error:', body);
        }
      }
    );
  } else {
    console.log('You\'re missing the SLACK_WEBHOOK environmental variable.')
  }
};
