# ICJ Project Template

This project template was developed for the [Intro to Coding for Journalists](https://github.com/utdata/icj-class) class taught by Christian McDonald, Assistant Professor of Practice at the School of Journalism, Moody College of Communication, University of Texas at Austin.

The development concepts used in this template are similar in rigs used in modern newsroom like the Texas Tribune , L.A. Times and NPR. A student of the class (or other journalist) may find the features sufficient (or a good start) for data-driven online presentations.

## Features

This Node-based template system uses a Gulp workflow configured for Github Pages publishing. Some of the features include:

- [Bootstrap 4.4](https://getbootstrap.com/) and [Sass](https://sass-lang.com/).
- [Nunjucks Templating](https://mozilla.github.io/nunjucks/templating.html) with [`journalize`](https://www.npmjs.com/package/journalize) filters.
- Ability to configure Google Sheets and Docs (with [ArchieML](http://archieml.org/)) to manage data and content.

## Setup

If you are in my ICJ class, this is already done, but others might go through [icj-setting-up](https://github.com/utdata/icj-setting-up) to make sure you have everything installed that is needed.

To start a new project:

- Create a project folder for all your code.
- Open VS Code into that folder and open the Terminal.
- Run `degit utdata/icj-project-template`.
- Initialize your repo, add and commit the files.
- Create your Github repo and connect them.

Make sure you run `degit` to get all your files _before_ you initialize your repo.

## Understanding this project

Most of the files you edit for this project are in the `src` directory. The Gulp production process will generate the publishable files into the `docs` folder, which you shouldn't touch.

```pre
├── src
|  ├── img (For image files)
|  ├── js (For custom JavaScript)
|  ├── njk
|  |  ├── _data (For data)
|  |  ├── _layouts (For templates)
|  |  ├── _partials (For reusable code)
|  |  ├── detail-shipping-news.njk (Becomes an HTML page)
|  |  └── index.njk (Becomes an HTML page)
|  └── scss (For Sass/CSS files)
```

Each `.njk` file inside `src/njk` or a nested folder is compiled as an HTML file in `docs/`. Folders inside `src/njk` that start with `_` support those pages through Nunjucks templates and do NOT become HTML files.

## Sass/scss

The `src/scss/` folder holds all the SCSS files. It is configured for Bootstrap and the CSS gets compiled into the `docs/css` folder for publication.

There is an example of a Sass partial with the `src/scss/_nav.scss` file, which is imported into `src/scss/main.scss`.

## Nunjucks templates

[Nunjucks](https://mozilla.github.io/nunjucks/templating.html) allows you to break your HTML into reuseable templates so you don't have to repeat code for each page on your site. The Nunjucks community has adopted `.njk` as the standard file extension.

Templates work off several basic concepts:

- _extends_ is used to specify template inheritance, meaning you can "build upon" templates to avoid repeating code.
- _block_ defines a section on the template and identifies it with a name. This is used by template inheritance. Pages that extend a template can override or append to the blocks with new content.
- _include_ pulls in other code files in place. It's useful to organize or share smaller chunks of code across several files.

With these tools, you can build a site framework once as a Layout, and then _extend_ that layout and use all its code, but swap out predefined _blocks_ specific to your new page.

### Layouts

**Layouts** and **partials** are parts of files used and extended elsewhere.

- The layout `src/njk/_layouts/base.njk` is an example base template for a site. The idea is to build the framework of the site only once, even though you might have many pages.
- The layout `src/njk/_layouts/detail-book.njk` is a page that _extends_ the base layout, but then pulls in data. This example is configured for a powerful feature in this this project template called "bake" that generates pages from a layout and data. More on that below.
- Files in `src/njk/_partials/` are snippets of code used by other layouts through a Nunjucks tag called _include_. This allows you to organize and reuse the same code throughout your site.

It's important that these folders start with `_` so they are not processed as new HTML pages on your site.

### Pages

All **pages** are kept in the `src/njk/` folder. Each `.njk` file (including those in a nested folder) will be processed and become an `.html` file in `docs/`, and therefore a webpage on your website.

This project includes an example page `src/njk/index.njk`, which is the homepage of the website. It _extends_ `src/njk/_layouts/base.njk`. Using the _block_ and _extend_ features allows you to worry about only main content of the page, as it inherits the nav and other framework from the base layout. This example includes some loops to build content from the example books and bookstores data, described in detail below.

To create a new webpage, just add a new file in `src/njk/` with the `.njk` extension. You'll want to _extend_ the `_layouts/base.njk` template and put your content inside `{% block content %}{% endblock %}`.

### Using data in Nunjucks templates

Nunjucks has special [tags to apply logic](https://mozilla.github.io/nunjucks/templating.html#tags), like looping through data.

Data used in the project must be saved as a JSON file in the `src/njk/_data/` folder. There are some examples in the project, including `library.json`. While not the full file, this is an example of an array of key-value pairs:

```json
  "books": [
    {
      "slug": "the-clown",
      "title": "The Clown",
      "author": "Heinrich Böll"
    },
    {
      "slug": "the-shipping-news",
      "title": "The Shipping News",
      "author": "Annie Proulx"
    }
  ]
}
```

There is an example using a loop to access data in these files in `index.njk`.

- You can add new `*.json` files into `src/njk/_data/` and they will be added to the Nunjucks context as `filename.arrayname`. Data is accessed with a Nunjucks variable `{{ arrayname.key }}`.
- Optionally, with the Google Drive authentication described below, you can store data in Google Sheets or Docs and "fetch" it as JSON arrays, which will be saved in the `src/njk/_data` folder.
- You can also create global variables in `project.config.json` as key-value pairs or arrays.

> IMPORTANT: If you add/change/delete data in JSON files, you must re-run the `gulp dev` command to make it available to Nunjucks.

### Generating detail pages from data

It is possible to "bake" multiple pages from data and a Nunjucks layout. The process requires three things:

- A Nunjucks layout. There is an example in the project: `src/njk/_layouts/detail-book.njk`. Data is accessed in the layout through Nunjuckes variables `{{ keyvalue }}` as set int the `project.config.json`  file.
- A JSON data file saved in `src/njk/_data`.
- Configuration in the `project.config.json` file, which has several requirements:

```json
"to_bake": [
    {
      "layout": "detail-book",
      "data": "library",
      "array": "books",
      "slug": "slug",
      "path": "books"
    }
  ]
```

- `layout` is the name of the layout file stored in `src/njk/_layouts` that will be used to build the pages. Note you don't need the extension in name.
- `data` is the name of the data file to build from. You don't need `.json` in the name.
- `array` is the name of the array you are using.
- `slug` is a key required from the data that will become the filename of each file created. The field used in the data needs to be in a URL-friendly format with all lowercase letters with dashes instead of spaces.
- The `path` an optional folder to save the files into. Make it an empty string to save in the root of `docs/`.

You can configure more than one "bake" task by adding new configurations to the `to_bake` array.

You generate or "bake" the files using `gulp bake`, but the command is also included in the default `gulp` and `gulp dev` commands.

## Deployment

This project is designed to bundle the finished website into the `docs` folder, which can then be published anywhere you have a server.

By default, the `docs/` folder is committed to Github because we are use [Github Pages](https://help.github.com/categories/github-pages-basics/) for free hosting of our site.

Review [Github Pages](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch) for specific directions on deployment using the `master/docs` folder.

## Using data from Google Drive

To use Google Drive to store and fetch data, you have to configure a service account key. See [icj-setting-up](https://github.com/utdata/icj-setting-up) Part 2 to prepare this.

`icj-project-template` projects support downloading ArchieML-formatted Google Docs and correctly-formatted Google Sheets directly from Google Drive for use within your templates. All files you want to use in your projects should be listed in `project.config.json` under the `files` key. You are not limited to one of each.

```js
{
  files: [
    {
      fileId: '<the-document-id-from-the-url>',
      type: 'doc',
      name: 'text',
    },
    {
      fileId: '<the-sheet-id-from-the-url>',
      type: 'sheet',
      name: 'data',
    }
}
```

Each object representing a Google Drive file needs three things:

- The `fileId` key represents the ID of a Google Doc or Google Sheet. This is most easily found in the URL of a document when you have it open in your browser.
- The `type` key is used to denote whether this is a Google Doc (`doc`) or a Google Sheet (`sheet`). This controls how it gets processed.
- The `name` key controls what filename it will receive once it's put in the `data/` directory. So if the `name` is set as `hello`, it'll be saved to `src/njk/_data/hello.json`.

### Gulp fetch downloads the data

Once your Google Sheet or Docs are set up and entered into `project.config.json`, you can run `gulp fetch` to download the data. You must then run `gulp dev` to load that data into the Nunjucks context. If you are already running gulp dev, be sure to kill the process with Control-c, then run `gulp fetch` and restart `gulp dev` again to get the new data.

### Google Docs

ArchieML Google Docs work as documented on the [ArchieML](http://archieml.org/) site. This includes the automatic conversion of links to `<a>` tags! You can use the [Archie Sandbox](http://archieml.org/sandbox.html) to see what the outputted json will look like.

- The Docs example used in this project is at [Books data](https://docs.google.com/document/d/1RgMhjtkXlbbf9uzSzy_xPRKwxcVZIZqVytgM_JoU4E4/edit).
- See [@newswire/doc-to-archieml](https://www.npmjs.com/package/@newswire/doc-to-archieml) and [ArchieML](http://archieml.org/) for more information on preparing these Google Docs as data.

### Google Sheets

For more information about how the Google Sheets processor works, check out the [sheet-to-data library](https://github.com/rdmurphy/sheet-to-data). The example Sheet used in this project is at [Bookstores data](https://docs.google.com/spreadsheets/d/1gDwO-32cgpBDn_0niV0iu6TqQTaRDr4nmSqnT53magY/edit#gid=0).

Google Sheets used may potentially require some additional configuration. Each sheet (or tab) in a Google Sheet is converted separately by the kit, and keyed-off in the output object by the _name of the sheet_.

By default it treats every sheet in a Google Sheet as being formatted as a `table`. In other words, every _row_ is considered an item, and the _header row_ determines the key of each value in a _column_.

The Google Sheets processor also supports a `key-value` format as popularized by [`copytext`](https://github.com/nprapps/copytext) ([and its Node.js counterpart](https://github.com/rdmurphy/node-copytext)). This treats everything in the _first column_ as the key, and everything in the _second column_ as the value matched to its key. Every other column is _ignored_.

To activate the `key-value` format, add `:kv` to the end of a sheet's filename. (For consistency you can also use `:table` to tell the processor to treat a sheet as a `table`, but it is not required due to it being the default.)

If there are any sheets you want to exclude from being processed, you can do it via two ways: hide them using the native _hide_ mechanism in Google Sheets, or add `:skip` to the end of the sheet name.

## Technical notes

Gulp is the task runner and is configured in `gulpfile.js`. Individual tasks live in the `tasks` folder.

- The default `gulp` task runs the `styles`, `lint`, `scripts`, `images`, `nunjucks` and `bake` tasks to create the production files.
- `gulp dev` runs the default tasks above plus `serve` for the BrowserSync server.
- To run any specific gulp task use `gulp <name of task>`, e.g. `gulp clean`.

### Tasks

- `bake.js`: Generates detail pages as noted above.
- `clean.js`: Deletes the contents of the `docs` directory using [`del`](https://www.npmjs.com/package/del).
- `clear.js`: Clears out the gulp cache. Useful to reprocess images of the same name stuck in cache. Run `gulp clear` then re-run `gulp`.
- `copy.js`: Used to copy production-necessary JavaScript files from `node_modules` into `docs/js`.
- `fetch.js`: Downloads Google Drive files as data as configured in `project.config.json`.
- `images.js`: Optimize images using [`gulp-imagemin`](https://www.npmjs.com/package/gulp-imagemin) and [`imagemin-mozjpeg`](https://www.npmjs.com/package/imagemin-mozjpeg) packages.
- `lint.js`: Checks syntax of your (optionally ES6) javascript in `/src/js/` using [`gulp-eslint`](https://www.npmjs.com/package/gulp-eslint) -- it's a good idea to have an eslint package installed in your text editor of choice, as well.
- `nunjucks.js`: Builds out html pages using [`gulp-nunjucks-render`].(https://github.com/carlosl/gulp-nunjucks-render) (see notes below).
- `scripts.js`: Babel/concat/uglify javascript in `/src/js/` using [`gulp-babel`](https://www.npmjs.com/package/gulp-babel), [`gulp-concat`](https://www.npmjs.com/package/gulp-concat) and [`gulp-uglify`](https://www.npmjs.com/package/gulp-uglify).
- `serve.js`: Spins up a [BrowserSync](https://browsersync.io/docs/gulp) server at `localhost:3000`. Bundled with watch tasks for css/js/template changes.
- `styles.js`: Processes Sass files from `/src/scss/` into minified css using [`gulp-sass`](https://www.npmjs.com/package/gulp-sass), [`gulp-sourcemaps`](https://www.npmjs.com/package/gulp-sourcemaps), [`gulp-autoprefixer`](https://www.npmjs.com/package/gulp-autoprefixer) and [`gulp-cssnano`](https://www.npmjs.com/package/gulp-cssnano).

Many thanks to [Elbert Wang](https://github.com/elbertwang3) for the development behind the `bake` and `fetch` tasks.

### More on Nunjucks

You can add [custom filters](https://mozilla.github.io/nunjucks/api.html#custom-filters) and [global variables](https://mozilla.github.io/nunjucks/api.html#addglobal) in the `manageEnv` function inside `tasks/nunjucks.js`.

A collection of functions useful for making prose reader friendly is already included with [`journalize`](https://www.npmjs.com/package/journalize).

In addition to data in the `src/njk/_data` folder, there is another place you can store variables to be used in Nunjucks templates. The `project.config.json` file is also imported when `gulp dev` is run. The template has some example data, and the snippet below shows an example of how to loop through a list of authors using Nunjucks.

```html
<p class="author">
  By {% for author in authors %}
  <a href="{{ author.link }}" target="_blank">{{ author.name }}</a>{% if not
  loop.last %}{% if loop.revindex0 == 1 %} and {% else %}, {% endif %}{% endif
  %} {% endfor %} <br />
  Published {{ publish_date }}
</p>
```
