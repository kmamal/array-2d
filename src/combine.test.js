const { test } = require('@kmamal/testing')
const { Array2d, clone, combine } = require('.')

const add = (a, b) => a + b

test("structs.array-2d.combine", (t) => {
	const a = new Array2d(2, 3, [ 1, 2, 3, 4, 5, 6 ])
	const b = new Array2d(3, 2, [ 7, 8, 9, 10, 11, 12 ])

	t.equal(combine(a, null, add, b, [ 0, 0 ], [ 0, 0 ]), a)
	t.equal(combine(a, null, add, b, [ 1, 1 ], [ 1, 1 ]), a)
	t.equal(combine(a, null, add, b, [ 1, 1 ], [ 0, 0 ]), a)

	const c = combine(a, null, add, b, null, [ -1, -1 ])
	t.equal(c.data, [ 8, 10, 3, 4, 5, 6 ])

	const d = combine(c, [ 0, 2 ], add, b, [ 1, 1 ], [ 3, 2 ])
	t.equal(d.data, [ 8, 10, 3, 4, 16, 18 ])
})

test("structs.array-2d.combine.$$$", (t) => {
	const a = new Array2d(2, 3, [ 1, 2, 3, 4, 5, 6 ])
	const b = new Array2d(3, 2, [ 7, 8, 9, 10, 11, 12 ])

	t.equal(combine.$$$(clone(a), null, add, b, [ 0, 0 ], [ 0, 0 ]), a)
	t.equal(combine.$$$(clone(a), null, add, b, [ 1, 1 ], [ 1, 1 ]), a)
	t.equal(combine.$$$(clone(a), null, add, b, [ 1, 1 ], [ 0, 0 ]), a)

	combine.$$$(a, null, add, b, null, [ -1, -1 ])
	t.equal(a.data, [ 8, 10, 3, 4, 5, 6 ])

	combine.$$$(a, [ 0, 2 ], add, b, [ 1, 1 ], [ 3, 2 ])
	t.equal(a.data, [ 8, 10, 3, 4, 16, 18 ])
})
