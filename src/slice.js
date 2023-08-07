const { __copy } = require('./copy')
const { Array2d } = require('./class')
const { startPoint } = require('./start-point')
const { endPoint } = require('./end-point')
const { startIndex: getStartIndex } = require('./start-index')
const { endIndex: getEndIndex } = require('./end-index')

const slice$$$ = (arr, _start, _end) => {
	const { w, h } = arr
	const start = startPoint(w, h, _start)
	const end = endPoint(w, h, _end)
	const startIndex = getStartIndex(w, start)
	const endIndex = getEndIndex(w, end)

	const resW = Math.max(0, end[0] - start[0])
	const resH = Math.max(0, end[1] - start[1])
	__copy(arr.data, resW, 0, arr.data, w, startIndex, endIndex, resW)
	arr.w = resW
	arr.h = resH
	arr.data.length = resW * resH

	return arr
}

const slice = (arr, _start, _end) => {
	const { w, h } = arr
	const start = startPoint(w, h, _start)
	const end = endPoint(w, h, _end)
	const startIndex = getStartIndex(w, start)
	const endIndex = getEndIndex(w, end)

	const resW = Math.max(0, end[0] - start[0])
	const resH = Math.max(0, end[1] - start[1])
	const res = new Array2d(resW, resH)
	__copy(res.data, resW, 0, arr.data, w, startIndex, endIndex, resW)
	return res
}

slice.$$$ = slice$$$

module.exports = { slice }
