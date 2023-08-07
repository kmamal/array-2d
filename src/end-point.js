const { endIndex } = require('@kmamal/util/array/end-index')

const endPoint = (w, h, point) => {
	let x
	let y
	if (point) {
		x = point[0]
		y = point[1]
	}
	return [
		endIndex(w, x),
		endIndex(h, y),
	]
}

module.exports = { endPoint }
