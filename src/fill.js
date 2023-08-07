const { Array2d } = require('./class')
const { startPoint } = require('./start-point')
const { endPoint } = require('./end-point')
const { startIndex: getStartIndex } = require('./start-index')
const { endIndex: getEndIndex } = require('./end-index')
const { __copy } = require('./copy')

const __fill = (arr, stride, start, end, width, value) => {
	let writeIndex = start
	const step = stride - width
	while (writeIndex < end) {
		for (let i = 0; i < width; i++) {
			arr[writeIndex++] = value
		}
		writeIndex += step
	}
}

const fill$$$ = (arr, value, _start, _end) => {
	const { w, h } = arr
	const start = startPoint(w, h, _start)
	const end = endPoint(w, h, _end)
	const startIndex = getStartIndex(w, start)
	const endIndex = getEndIndex(w, end)

	const width = end[0] - start[0]
	__fill(arr.data, w, startIndex, endIndex, width, value)
	return arr
}

const fill = (arr, value, _start, _end) => {
	const { w, h } = arr
	const start = startPoint(w, h, _start)
	const end = endPoint(w, h, _end)
	const startIndex = getStartIndex(w, start)
	const endIndex = getEndIndex(w, end)

	const res = new Array2d(w, h)
	const width = end[0] - start[0]
	const widthLeft = start[0]
	const widthRight = w - end[0]
	const heightAbove = start[1]
	const heightBelow = h - end[1]

	// ........
	// ........
	// P..SXQ..
	// ...XX...
	// R....E..
	// ........

	const pIndex = getStartIndex(w, [ 0, start[1] ])
	const qIndex = getStartIndex(w, [ end[0], start[1] ])
	const rIndex = getStartIndex(w, [ 0, end[1] ])

	heightAbove && __copy(res.data, w, 0, arr.data, w, 0, pIndex, w)
	widthLeft && __copy(res.data, w, pIndex, arr.data, w, pIndex, rIndex, widthLeft)
	__fill(res.data, w, startIndex, endIndex, width, value)
	widthRight && __copy(res.data, w, qIndex, arr.data, w, qIndex, rIndex, widthRight)
	heightBelow && __copy(res.data, w, rIndex, arr.data, w, rIndex, w * h, w)

	return res
}

fill.$$$ = fill$$$

module.exports = {
	__fill,
	fill,
}
