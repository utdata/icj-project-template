const gulp = require("gulp");
const del = require("del");

module.exports = (resolve, reject) => {
  del(["public/*"], { dot: true });
  resolve();
};
