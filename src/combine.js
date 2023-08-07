const { __copy } = require('./copy')
const { Array2d } = require('./class')
const { startPoint } = require('./start-point')
const { endPoint } = require('./end-point')
const { startIndex: getStartIndex } = require('./start-index')
const { endIndex: getEndIndex } = require('./end-index')

const __combine = (dst, dstStride, dstStart, a, aStride, aStart, b, bStride, bStart, bEnd, width, fn) => {
	let writeIndex = dstStart
	let aIndex = aStart
	let bIndex = bStart
	const dstStep = dstStride - width
	const aStep = aStride - width
	const bStep = bStride - width
	while (bIndex < bEnd) {
		for (let i = 0; i < width; i++) {
			const aItem = a[aIndex++]
			const bItem = b[bIndex++]
			const value = fn(aItem, bItem)
			dst[writeIndex++] = value
		}
		writeIndex += dstStep
		aIndex += aStep
		bIndex += bStep
	}
}

const combine$$$ = (a, _offset, fn, b, Start, End) => {
	const { w: aw, h: ah } = a
	const { w: bw, h: bh } = b
	const offset = startPoint(aw, ah, _offset)
	const start = startPoint(bw, bh, Start)
	const end = endPoint(bw, bh, End)
	const offsetIndex = getStartIndex(aw, offset)
	const startIndex = getStartIndex(bw, start)
	const endIndex = getEndIndex(bw, end)
	const width = end[0] - start[0]
	__combine(a.data, aw, offsetIndex, a.data, aw, offsetIndex, b.data, b.w, startIndex, endIndex, width, fn)
	return a
}

const combine = (a, _offset, fn, b, Start, End) => {
	const { w: aw, h: ah } = a
	const { w: bw, h: bh } = b
	const offset = startPoint(aw, ah, _offset)
	const start = startPoint(bw, bh, Start)
	const end = endPoint(bw, bh, End)
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
	__combine(res.data, aw, offsetIndex, a.data, aw, offsetIndex, b.data, bw, startIndex, endIndex, width, fn)
	widthRight && __copy(res.data, aw, qIndex, a.data, aw, qIndex, rIndex, widthRight)
	heightBelow && __copy(res.data, aw, rIndex, a.data, aw, rIndex, aw * ah, aw)

	return res
}

combine.$$$ = combine$$$

module.exports = {
	__combine,
	combine,
}
