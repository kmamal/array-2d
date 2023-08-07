const { startIndex } = require('@kmamal/util/array/start-index')

const startPoint = (w, h, point) => {
	let x
	let y
	if (point) {
		x = point[0]
		y = point[1]
	}
	return [
		startIndex(w, x),
		startIndex(h, y),
	]
}

module.exports = { startPoint }
