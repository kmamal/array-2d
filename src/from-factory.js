const { Array2d } = require('./class')

const fromFactory = (w, h, map) => {
	const arr = new Array(w * h)
	let writeIndex = 0
	for (let j = 0; j < h; j++) {
		for (let i = 0; i < w; i++) {
			arr[writeIndex++] = map(i, j)
		}
	}
	return new Array2d(w, h, arr)
}

module.exports = { fromFactory }
