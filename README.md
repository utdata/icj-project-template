# ICJ Project Template

A Bootstrap4-based project scaffold with a gulp workflow that is set up for Github Pages publishing.

Features:

* [Bootstrap 4.1](https://getbootstrap.com/).
* [Sass](https://sass-lang.com/). (Possibly with autoprefixing?).
* ES6 support from Babel.
* Nunjucks templates with [`journalize`](https://www.npmjs.com/package/journalize) filters.
* Browsersync server. (Refresh is not working).
* Image compression. (not sure if this is working).
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

Configured in `gulpfile.babel.js`. Gulp tasks live in `./tasks`.

* Default task -- just `gulp` -- runs `styles`, `lint`, `scripts`, `images` and `nunjucks`.
* Running `gulp dev` runs the default tasks above plus `serve` for the BrowserSync server.
* To run any specific gulp task: `gulp <name of task>`, e.g. `gulp clean`.

### Tasks

* `clean.js`: Clear out the `./docs` directory using [`del`](https://www.npmjs.com/package/del).
* `images.js`: Optimize images using [`gulp-imagemin`](https://www.npmjs.com/package/gulp-imagemin).
* `lint.js`: Lint your (optionally ES6) javascript in `/src/js/` using [`gulp-eslint`](https://www.npmjs.com/package/gulp-eslint) -- it's a good idea to have an eslint package installed in your text editor of choice, as well.
* `nunjucks.js`: Build out templates using [`gulp-nunjucks-render`](https://github.com/carlosl/gulp-nunjucks-render) (see notes below).
* `scripts.js`: Babel/concat/uglify javascript in `/src/js/` using [`gulp-babel`](https://www.npmjs.com/package/gulp-babel), [`gulp-concat`](https://www.npmjs.com/package/gulp-concat) and [`gulp-uglify`](https://www.npmjs.com/package/gulp-uglify).
* `serve.js`: Spin up a [BrowserSync](https://browsersync.io/docs/gulp) server at `localhost:3000`. Bundled with watch tasks for css/js/template changes.
* `styles.js`: Process Sass files from `/src/scss/` into minified css using [`gulp-sass`](https://www.npmjs.com/package/gulp-sass), [`gulp-sourcemaps`](https://www.npmjs.com/package/gulp-sourcemaps), [`gulp-autoprefixer`](https://www.npmjs.com/package/gulp-autoprefixer) and [`gulp-cssnano`](https://www.npmjs.com/package/gulp-cssnano).

### Nunjucks templates

Layouts, partials and files live in `./src/njk/`.

You can add [custom filters](https://mozilla.github.io/nunjucks/api.html#custom-filters) and [global variables](https://mozilla.github.io/nunjucks/api.html#addglobal) in the `manageEnv` function inside `./tasks/nunjucks.js`.

### Deployment

Files are bundled into the `docs/` folder and the _ARE_ committed to Github because [Github Pages](https://help.github.com/categories/github-pages-basics/) is used for free hosting of pages.

* Review [Github Pages](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch) tospecific directions on deployment.

#### Inspiration

Borrows from [Google](https://developers.google.com/web/tools/starter-kit/), [Texas Tribune](https://github.com/texastribune/unholstered), [Statesman](https://github.com/statesman/) and elsewhere.
