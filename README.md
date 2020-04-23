# ICJ Project Template

A Node-based template system with a Gulp workflow set up for Github Pages publishing.

Features:

- [Bootstrap 4.4](https://getbootstrap.com/).
- [Sass](https://sass-lang.com/) with [autoprefixer](https://github.com/postcss/autoprefixer).
- Nunjucks templates with [`journalize`](https://www.npmjs.com/package/journalize) filters. Data can be made available to templates through the `project.config.json` file or files in the `njk/_data` folder.
- Browsersync server.
- Image compression for jpeg and png formats.
- Publishing to `docs/` for [Github Pages](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch).

## Setup

If you are in my ICJ class, this is already done, but others will need to make sure you have gulp installed globally: `npm install -g gulp-cli`.

- Create a project folder to hold all your code.
- Open VS Code into that folder and open the Terminal.
- Run `degit utdata/icj-project-template`.
- Create your Github repo and connect them.

## Understanding this project

Most of the files you edit for this project are in the `src` directory. The Gulp production process will generate the publishable files into the `docs` folder, which you shouldn't touch.

```pre
├── src
|  ├── img
|  ├── js
|  ├── njk
|  |  ├── index.njk  (Each .njk file becomes an html page)
|  |  ├── detail-book-shipping-news.njk
|  |  ├── detail-entry-example.njk
|  |  ├── _data (For data)
|  |  ├── _layouts (For templates)
|  |  └── _partials (For reusable code)
|  └── scss (For Sass files)
```

Each `.njk` file inside `src/njk` is published as an html file in `docs/`

All the other folders inside `src/njk` support those pages through Nunjucks templates.

## Sass/scss

The `src/scss/` folder holds all the SCSS files. It is configured for Bootstrap and the CSS gets compiled into the `docs` folder for publication.

There is also and example of a Sass partial with the `src/scss/_nav.scss` file, which is imported into `src/scss/main.scss`.

## Nunjucks templates

[Nunjucks](https://mozilla.github.io/nunjucks/templating.html) allows you to break your HTML into reuseable templates so you don't have to repeat code for each page on your site.

Templates work off several basic concepts:

- _extends_ is used to specify template inheritance, meaning you can "build upon" templates to avoid repeating code.
- _block_ defines a section on the template and identifies it with a name. This is used by template inheritance. Base templates can specify blocks and child templates can override them with new content.
- _include_ pulls in other templates in place. It's useful when you need to share smaller chunks across several templates that already inherit other templates.

With these tools, you can build a site framework once as a Layout, and then _extend_ or "use" that layout and all it's code, but swap out predefined _blocks_ specific to your new page.

### Layouts

**Layouts** and **partials** are parts of files used and extended elsewhere.

- The layout `src/njk/_layouts/base.njk` is an example base template for a site. The idea is to build the framework of the site only once, even though you have many pages.
- The layout `src/njk/_layouts/detail-entry.njk` is an example of a layout that _extends_ the base layout, but then allows the user to insert different content through the _content_ block.
- The layout `src/njk/_layouts/detail-book.njk` is a more complicated layout that _extends_ the base layout, but then pulls in data. The matching `detail-book-shipping-news.njk` file pulls in one row of the example book data in the project.
- Anything in `src/njk/_partials/` are snippets of code used by other layouts through a Nunjucks tag called _include_.

The Nunjucks community has adopted `.njk` as the file extension for templates. Because these files are in folder names that start with `_` and not at the `src/njk/` level, they do NOT become actual webpages on your site.

### Pages

All **pages** are kept in the root of the `src/njk/` folder. Each `.njk` file created here becomes an HTML page in `docs/`, and therefore a page on your website.

- The page `src/njk/index.njk` is the main website page that _extends_ `src/njk/_layouts/base.njk`. You are coding only the main content of the page, and inheriting all the nav and other framework from the layout.
- the page `src/njk/detail-entry-example.njk` _extends_ the `src/njk/_layouts/detail-entry.njk` layout, showing an example of how you can overwrite blocks in the layout.
- The page `src/njk/detail-book-example.njk` _extends_ the `src/njk/_layouts/detail-book.njk` layout, which is already extending `base.njk`. It is an example of building a layout using example book data from the project, and then choosing one row of that data for the specific page.

### Using data in Nunjucks templates

Nunjucks has special [tags to apply logic](https://mozilla.github.io/nunjucks/templating.html#tags), like looping through data within templates.

Most data should be saved as key-value pairs in a javascript array in the `src/njk/_data/data.json`. An example might be this:

```json
  "books": [
    {
      "title": "The Clown",
      "author": "Heinrich Böll"
    },
    {
      "title": "The Shipping News",
      "author": "Annie Proulx"
    }
  ]
}
```

- You can access this data in a loop as `data.books.title`. There is an example in the `index.njk` file.
- You can add new `*.json` files into `src/njk/_data/` and they will be added to the Nunjucks context as `filename.arrayname.property`.
- You can also set global variables in `project.config.json` as key-value pairs or arrays.

> IMPORTANT: If you add/change/delete data in JSON files, you must re-run the `gulp dev` command to make it available to Nunjucks.

Have a spreadsheet of data that you need to convert to JSON? Try [csvjson.com](https://www.csvjson.com/csv2json).

### Filtering data for detail pages

It is possible to select a single node or "row" from an array in `data.filename.json` by its position to use in a detail page using the Nunjucks [set](https://mozilla.github.io/nunjucks/templating.html#set) tag. The position order starts at zero, so using the books example above, you could access "The Shipping News" author (and similar properties) like this:

```html
{% set book = data.books[1] %}
<h1>{{ book.title }}</h1>
```

Using this method, you can create a single detail layout that can be extended to multiple detail pages, each using a single "row" from the JSON array. There is an example in `src/njk/detail-book-shipping-news.njk` and the corresponding layout `src/njk/_layouts/detail-book.njk`.

### Deployment

This project is designed to bundle the finished website into the `docs` folder, which can then be published anywhere you have a server.

By default, the `docs/` folder is committed to Github because we are using [Github Pages](https://help.github.com/categories/github-pages-basics/) for free hosting of our site.

Review [Github Pages](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch) for specific directions on deployment.

## How to use ArchieML and Google Sheets in your projects

### Creating a service account

The instructions for how to create a service account on Google are [here](https://cloud.google.com/docs/authentication/getting-started). **Make sure you're logged into a personal gmail account**. If you use your school email, you might not have permissions to create a service account. Follow the link above and click on `Go to the Service Account Key page`.

- First, you must create a project. Project is a little misleading because you do not need to do this for each project. You only need to do this once per email address. I've named my project `icj-project`.

- You are next directed to create a service account key.
  - For **Service account**, choose "New service account"
  - For the **Service account name**, I've used `icj`. The **Service account ID** will get filled out for you.
  - For Role, use the **Select a role** dropdown and go to `Project --> Owner` and select it.
- Once you hit **Create key**, a file will be saved on your machine. _This file is important_ and you need to keep it on your machine! I put mine in the same folder with all of my other icj class projects, for example: `/Users/christian/Documents/icj/icj-project-306222d7b682.json`.
- Click on **Library** in the left navigation to go to the [API Library](https://console.developers.google.com/apis/library)
- Use the search to find the Google Docs API and choose it.
  - Make sure `icj-project` is selected in the top nav near the Google Cloud Services logo.
  - Then click on the **Enable** buttton to activate it.
- Sue the search bar to find `Google Sheets API` and do the same to enable that.

### Setting up the environment variable

We are setting this environment variable to authenticate ourselves using the information in the json file when we want to grab data from Google's API.

#### Mac setup

> We can assume bash here for the time being. I force that since Windows users have Git Bash. Might have to reconsider that some day ...
>
> - Figure out what the default shell is on your machine. You can do this by running this in terminal.
>   ```
>   echo $SHELL
>   ```

- In Visual Studio Code, open your `.bash_profile` file, which is stored in your home user folder. You can likely use `code ~/.bash_profile` to open it. You should see some stuff the already from other configurations.
  - If your default shell is `zsh`. instead use the file `~/.zshrc`.
- Point the environment variable to your .json configuration file. Use the example below, but your path an file name.

```
## Google Auth
export GOOGLE_APPLICATION_CREDENTIALS="/Users/christian/Documents/icj/icj-project-306222d7b682.json"
```

### Windows setup

Refer to [Google's instructions if you're using Windows](https://cloud.google.com/docs/authentication/getting-started#windows).

### Using Google Docs and Sheets

To fetch data from your Google Doc or Sheet, fill out `project.config.json` and run `gulp fetch`.

`icj-project-template` projects support downloading ArchieML-formatted Google Docs and correctly-formatted Google Sheets directly from Google Drive for use within your templates. All files you want to use in your projects should be listed in `project.config.json` under the `files` key. You are not limited to one of each.

```js
{ // ...
  /**
    * Any Google Doc and Google Sheet files to be synced with this project.
    */
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
    },
  // ...
}
```

Each object representing a file needs three things:

**fileId**

The `fileId` key represents the ID of a Google Doc or Google Sheet. This is most easily found in the URL of a document when you have it open in your browser.

**type**

The `type` key is used to denote whether this is a Google Doc (`doc`) or a Google Sheet (`sheet`). This controls how it gets processed.

**name**

The `name` key controls what filename it will receive once it's put in the `data/` directory. So if the `name` is `hello`, it'll be saved to `data/hello.json`.

#### Google Docs

ArchieML Google Docs work as documented on the [ArchieML](http://archieml.org/) site. This includes the automatic conversion of links to `<a>` tags! You can use the [Archie Sandbox](http://archieml.org/sandbox.html) to see what the outputted json will look like.

#### Google Sheets

For more information about how the Google Sheets processor works, check out the `sheet-to-data` [library](https://github.com/rdmurphy/sheet-to-data).

Google Sheets processed may potentially require some additional configuration. Each sheet (or tab) in a Google Sheet is converted separately by the kit, and keyed-off in the output object by the _name of the sheet_.

By default it treats every sheet in a Google Sheet as being formatted as a `table`. In other words, every _row_ is considered an item, and the _header row_ determines the key of each value in a _column_.

The Google Sheets processor also supports a `key-value` format as popularized by [`copytext`](https://github.com/nprapps/copytext) ([and its Node.js counterpart](https://github.com/rdmurphy/node-copytext)). This treats everything in the _first column_ as the key, and everything in the _second column_ as the value matched to its key. Every other column is _ignored_.

To activate the `key-value` format, add `:kv` to the end of a sheet's filename. (For consistency you can also use `:table` to tell the processor to treat a sheet as a `table`, but it is not required due to it being the default.)

If there are any sheets you want to exclude from being processed, you can do it via two ways: hide them using the native _hide_ mechanism in Google Sheets, or add `:skip` to the end of the sheet name.

## Technical notes on how this project is structured

### Gulp

Gulp is task runner and is configured in `gulpfile.js`. Individual tasks live in the `tasks` folder.

- The default `gulp` task runs the `styles`, `lint`, `scripts`, `images` and `nunjucks` tasks to create the production files.
- Running `gulp dev` runs the default tasks above plus `serve` for the BrowserSync server.
- To run any specific gulp task: `gulp <name of task>`, e.g. `gulp clean`.

#### Tasks

- `clean.js`: Deletes the contents of the `docs` directory using [`del`](https://www.npmjs.com/package/del).
- `clear.js`: Clears out the gulp cache. Useful to reprocess images of the same name stuck in cache. Run `gulp clear` then re-run `gulp`.
- `images.js`: Optimize images using [`gulp-imagemin`](https://www.npmjs.com/package/gulp-imagemin) and [`imagemin-mozjpeg`](https://www.npmjs.com/package/imagemin-mozjpeg) packages.
- `lint.js`: Checks syntax of your (optionally ES6) javascript in `/src/js/` using [`gulp-eslint`](https://www.npmjs.com/package/gulp-eslint) -- it's a good idea to have an eslint package installed in your text editor of choice, as well.
- `nunjucks.js`: Builds out html pages using [`gulp-nunjucks-render`].(https://github.com/carlosl/gulp-nunjucks-render) (see notes below).
- `scripts.js`: Babel/concat/uglify javascript in `/src/js/` using [`gulp-babel`](https://www.npmjs.com/package/gulp-babel), [`gulp-concat`](https://www.npmjs.com/package/gulp-concat) and [`gulp-uglify`](https://www.npmjs.com/package/gulp-uglify).
- `serve.js`: Spins up a [BrowserSync](https://browsersync.io/docs/gulp) server at `localhost:3000`. Bundled with watch tasks for css/js/template changes.
- `styles.js`: Processes Sass files from `/src/scss/` into minified css using [`gulp-sass`](https://www.npmjs.com/package/gulp-sass), [`gulp-sourcemaps`](https://www.npmjs.com/package/gulp-sourcemaps), [`gulp-autoprefixer`](https://www.npmjs.com/package/gulp-autoprefixer) and [`gulp-cssnano`](https://www.npmjs.com/package/gulp-cssnano).

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

### Future development

- I'd like to add a Nunjucks Markdown package of some sort to allow adding/editing of basic text in Markdown, perhaps with front-matter. Would prefer to hook up through Google Docs. See [Issue 17](https://github.com/utdata/icj-project-template/issues/17).
- I'd like to loop through data to create detail pages.
