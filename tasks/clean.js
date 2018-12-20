const gulp = require('gulp');
import del from 'del'; 

module.exports = (resolve, reject) => {
    del(['docs/*'], {dot: true});
    resolve();
};
