const { Array2d } = require('./class')
const { startPoint } = require('./start-point')
const { endPoint } = require('./end-point')
const { startIndex: getStartIndex } = require('./start-index')
const { endIndex: getEndIndex } = require('./end-index')

const __copy = (dst, dstStride, dstStart, src, srcStride, srcStart, srcEnd, srcWidth) => {
	let writeIndex = dstStart
	let readIndex = srcStart
	const dstStep = dstStride - srcWidth
	const srcStep = srcStride - srcWidth
	while (readIndex < srcEnd) {
		for (let i = 0; i < srcWidth; i++) {
			dst[writeIndex++] = src[readIndex++]
		}
		writeIndex += dstStep
		readIndex += srcStep
	}
}

const copy$$$ = (a, _offset, b, _start, _end) => {
	const { w: aw, h: ah } = a
	const { w: bw, h: bh } = b
	const offset = startPoint(aw, ah, _offset)
	const start = startPoint(bw, bh, _start)
	const end = endPoint(bw, bh, _end)
	const offsetIndex = getStartIndex(aw, offset)
	const startIndex = getStartIndex(bw, start)
	const endIndex = getEndIndex(bw, end)
	const width = end[0] - start[0]
	__copy(a.data, aw, offsetIndex, b.data, bw, startIndex, endIndex, width)
	return a
}

const copy = (a, _offset, b, _start, _end) => {
	const { w: aw, h: ah } = a
	const { w: bw, h: bh } = b
	const offset = startPoint(aw, ah, _offset)
	const start = startPoint(bw, bh, _start)
	const end = endPoint(bw, bh, _end)
	const offsetIndex = getStartIndex(aw, offset)
	const startIndex = getStartIndex(bw, start)
	const endIndex = getEndIndex(bw, end)

	const res = new Array2d(aw, ah)
	const width = end[0] - start[0]
	const height = end[1] - start[1]
	const limit = [ offset[0] + width, offset[1] + height ]
	const heightAbove = offset[1]
	const heightBelow = ah - limit[1]
	const widthLeft = offset[0]
	const widthRight = aw - limit[0]

	// ........
	// ........
	// P..S#Q..
	// ...##...
	// R....E..
	// ........

	const pIndex = getStartIndex(aw, [ 0, offset[1] ])
	const qIndex = getStartIndex(aw, [ limit[0], offset[1] ])
	const rIndex = getStartIndex(aw, [ 0, limit[1] ])

	heightAbove && __copy(res.data, aw, 0, a.data, aw, 0, pIndex, aw)
	widthLeft && __copy(res.data, aw, pIndex, a.data, aw, pIndex, rIndex, widthLeft)
	__copy(res.data, aw, offsetIndex, b.data, bw, startIndex, endIndex, width)
	widthRight && __copy(res.data, aw, qIndex, a.data, aw, qIndex, rIndex, widthRight)
	heightBelow && __copy(res.data, aw, rIndex, a.data, aw, rIndex, aw * ah, aw)

	return res
}

copy.$$$ = copy$$$

module.exports = {
	__copy,
	copy,
}
