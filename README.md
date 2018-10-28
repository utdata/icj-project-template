# Single-page project (gulp version)

A single-page project with a gulp-based workflow that borrows from [here](https://developers.google.com/web/tools/starter-kit/), [here](https://github.com/texastribune/unholstered) and elsewhere.

Features:

* LESS with autoprefixing
* ES6 support from Babel
* Nunjucks templating with [`journalize`](https://www.npmjs.com/package/journalize) filters
* Browsersync server
* Image compression
* Publish to S3

### Setup

#### Environmental variables

If you want to deploy to S3, you'll need to have saved our AWS credentials as the environmental variables `AWS_SECRET_ACCESS_KEY` and `AWS_ACCESS_KEY_ID`.

If you want to ping our Slack channel when you publish, you'll need to have saved our webhook URL as the environmental variable `SLACK_WEBHOOK`.

(To set an environmental variable, add a line to your `~/.bashrc` or `~/.zshrc` file like this: `export SLACK_WEBHOOK="https://hooks.slack.com/services/aLongStringOfChars"`)

#### Gulp!

Make sure you have gulp installed globally: `npm install -g gulp-cli`.

#### Install npm dependencies

Download or clone this directory, then `cd` into the project directory.

```sh
$ npm install
$ gulp
```

### The Gulp tasks

Files from `./src` get processed into the `./public` directory.

Gulp tasks live in `./tasks`:

* `clean.js`: Clear out the `./public` directory using [`del`](https://www.npmjs.com/package/del)
* `deploy.js`: Deploy to S3 using [`s3`](https://www.npmjs.com/package/s3) (see notes below)
* `images.js`: Optimize images using [`gulp-imagemin`](https://www.npmjs.com/package/gulp-imagemin)
* `lint.js`: Lint your (optionally ES6) javascript in `/src/js/` using [`gulp-eslint`](https://www.npmjs.com/package/gulp-eslint) -- it's a good idea to have an eslint package installed in your text editor of choice, as well
* `nunjucks.js`: Build out templates using [`gulp-nunjucks-render`](https://github.com/carlosl/gulp-nunjucks-render) (see notes below)
* `scripts.js`: Babel/concat/uglify javascript in `/src/js/` using [`gulp-babel`](https://www.npmjs.com/package/gulp-babel), [`gulp-concat`](https://www.npmjs.com/package/gulp-concat) and [`gulp-uglify`](https://www.npmjs.com/package/gulp-uglify)
* `serve.js`: Spin up a [BrowserSync](https://browsersync.io/docs/gulp) server at `localhost:3000`. Bundled with watch tasks for css/js/template changes.
* `slack.js`: Using [`request`](https://github.com/request/request), send a slack message with the S3 URL. You need the `SLACK_WEBHOOK` environmental variable for this to work.
* `styles.js`: Process LESS files from `/src/less/` into minified css using [`gulp-less`](https://www.npmjs.com/package/gulp-less), [`gulp-autoprefixer`](https://www.npmjs.com/package/gulp-autoprefixer) and [`gulp-cssnano`](https://www.npmjs.com/package/gulp-autoprefixer).

To run a gulp task: `gulp <name of task>`, e.g. `gulp clean`.

Running the default task -- just `gulp` -- runs `styles`, `lint`, `scripts`, `images` and `nunjucks`.

### Project configuration

A centralized project configuration file lives at `./project.config.json` and is `required()` wherever needed -- this is where you'd define the URL endpoint, page title and description, bylines, etc. These key/value pairs are also available inside the Nunjucks templates.

### Nunjucks templates

Templates and partials live in `./src/njk/`. You can add [custom filters](https://mozilla.github.io/nunjucks/api.html#custom-filters) and [global variables](https://mozilla.github.io/nunjucks/api.html#addglobal) in the `manageEnv` function inside `./tasks/nunjucks.js`.

### Deployment

To deploy to S3, you need the `AWS_SECRET_ACCESS_KEY` and `AWS_ACCESS_KEY_ID` environmental variables.

#### Deploy to staging bucket

* `gulp deploy`
* `gulp ship` (with slack notification)

#### Deploy to production bucket

* `gulp deploy --prod`
* `gulp ship --prod` (with slack notification)


### Deleting from S3

To delete your project from S3, you need the `AWS_SECRET_ACCESS_KEY` and `AWS_ACCESS_KEY_ID` environmental variables.

#### Delete from staging bucket

* `gulp delete`
* `gulp nuke` (with slack notification)

#### Delete from production bucket

* `gulp delete --prod`
* `gulp nuke --prod` (with slack notification)

