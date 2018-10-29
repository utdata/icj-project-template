# ICJ Project Template

A Bootstrap4-based project scaffold with a gulp workflow that is set up for Github Pages publishing.

Features:

* [Bootstrap 4.1](https://getbootstrap.com/) for design
* [Sass](https://sass-lang.com/) (possibly with autoprefixing?)
* ES6 support from Babel
* Nunjucks templating with [`journalize`](https://www.npmjs.com/package/journalize) filters
* Browsersync server (though refresh is not working.)
* Image compression
* Publishing to `./docs/` for [Github Pages](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch).

## Setup

### Gulp!

Make sure you have gulp installed globally: `npm install -g gulp-cli`.

### Install npm dependencies

Download this directory, then `cd` into the project directory.

```sh
$ npm install
$ gulp
```

### The Gulp tasks

Files from `./src` get processed into the `./docs` directory. They _ARE_ saved in git, since we are using Github Pages for default publishing.

Gulp tasks live in `./tasks`:

* `clean.js`: Clear out the `./public` directory using [`del`](https://www.npmjs.com/package/del)
* `images.js`: Optimize images using [`gulp-imagemin`](https://www.npmjs.com/package/gulp-imagemin)
* `lint.js`: Lint your (optionally ES6) javascript in `/src/js/` using [`gulp-eslint`](https://www.npmjs.com/package/gulp-eslint) -- it's a good idea to have an eslint package installed in your text editor of choice, as well
* `nunjucks.js`: Build out templates using [`gulp-nunjucks-render`](https://github.com/carlosl/gulp-nunjucks-render) (see notes below)
* `scripts.js`: Babel/concat/uglify javascript in `/src/js/` using [`gulp-babel`](https://www.npmjs.com/package/gulp-babel), [`gulp-concat`](https://www.npmjs.com/package/gulp-concat) and [`gulp-uglify`](https://www.npmjs.com/package/gulp-uglify)
* `serve.js`: Spin up a [BrowserSync](https://browsersync.io/docs/gulp) server at `localhost:3000`. Bundled with watch tasks for css/js/template changes.
* `styles.js`: Process LESS files from `/src/less/` into minified css using [`gulp-less`](https://www.npmjs.com/package/gulp-less), [`gulp-autoprefixer`](https://www.npmjs.com/package/gulp-autoprefixer) and [`gulp-cssnano`](https://www.npmjs.com/package/gulp-autoprefixer).

To run a gulp task: `gulp <name of task>`, e.g. `gulp clean`.

Running the default task -- just `gulp` -- runs `styles`, `lint`, `scripts`, `images` and `nunjucks`.

Running `gulp dev` runs the default tasks above plus `serve` for the BrowserSync server.

### Nunjucks templates

Layouts, partials and files live in `./src/njk/`.

You can add [custom filters](https://mozilla.github.io/nunjucks/api.html#custom-filters) and [global variables](https://mozilla.github.io/nunjucks/api.html#addglobal) in the `manageEnv` function inside `./tasks/nunjucks.js`.

### Deployment

Files are bundled into the `docs/` folder. See [Github Pages](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch) for specific directions on deployment.

#### Inspiration

Borrows from [Google](https://developers.google.com/web/tools/starter-kit/), [Texas Tribune](https://github.com/texastribune/unholstered), [Statesman](https://github.com/statesman/) and elsewhere.
