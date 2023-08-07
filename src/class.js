
class Array2d {
	constructor (w, h, arr) {
		this.w = w
		this.h = h
		this.data = arr || new Array(w * h)
	}

	_index (x, y) { return y * this.w + x }

	get (x, y) { return this.data[this._index(x, y)] }
	set (x, y, value) { this.data[this._index(x, y)] = value }
}

module.exports = { Array2d }
