const d3collection = require("d3-collection");
module.exports = {
  /**
   * Any Google Doc and Google Sheet files to be synced with this project.
   */
  files: [
    {
      fileId: "1G3KD3Ldqb8y_wj0wHp4l_R7SPDc_sZ161w0ay7ltrRc",
      type: "doc",
      name: "data",
      path: "src/njk/_data",
    },
    {
      fileId: "1lhSKXYudyDQPzjx21-r9x5ITrWibWHB68oUzsfOZoes",
      type: "sheet",
      name: "covid",
      path: "src/data",
    },
  ],
  /**
   * The dataMutators option makes it possible to modify what's returned by
   * the data fetchers. This is a good place to restructure the raw data, or
   * to do joins with other data you may have.
   *
   * Example:
   * dataMutators: {
   *   // the function name should match one of the `name` values in `files`
   *   votes(originalData) {
   *   // what you return in this function is what ends up in the JSON file
   *   return originalData;
   * },
  },
   */
  dataMutators: {
    covid(originalData) {
      const sumByState = d3collection
        .nest()
        .key((d) => d.state)
        .rollup((v) =>
          v.map((d) => d.cases).reduce((acc, curr) => acc + curr, 0)
        )
        .entries(originalData.data);
      return sumByState;
    },
  },
};
