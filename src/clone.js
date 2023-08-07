const { Array2d } = require('./class')

const clone = (arr) => new Array2d(arr.w, arr.h, arr.data.slice())

module.exports = { clone }
