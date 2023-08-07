const { test } = require('@kmamal/testing')
const { fromFactory } = require('.')

test("structs.array-2d.fill", (t) => {
	const a = fromFactory(3, 3, (x, y) => (x + 1) * (y + 1))
	t.equal(a.data, [ 1, 2, 3, 2, 4, 6, 3, 6, 9 ])
})
