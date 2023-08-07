const { test } = require('@kmamal/testing')
const { Array2d, clone, copy } = require('.')

test("structs.array-2d.copy", (t) => {
	const a = new Array2d(2, 3, [ 1, 2, 3, 4, 5, 6 ])
	const b = new Array2d(3, 2, [ 7, 8, 9, 10, 11, 12 ])

	t.equal(copy(a, null, b, [ 0, 0 ], [ 0, 0 ]), a)
	t.equal(copy(a, null, b, [ 1, 1 ], [ 1, 1 ]), a)
	t.equal(copy(a, null, b, [ 1, 1 ], [ 0, 0 ]), a)

	const c = copy(a, null, b, null, [ -1, -1 ])
	t.equal(c.data, [ 7, 8, 3, 4, 5, 6 ])

	const d = copy(c, [ 0, 2 ], b, [ 1, 1 ], [ 3, 2 ])
	t.equal(d.data, [ 7, 8, 3, 4, 11, 12 ])
})

test("structs.array-2d.copy.$$$", (t) => {
	const a = new Array2d(2, 3, [ 1, 2, 3, 4, 5, 6 ])
	const b = new Array2d(3, 2, [ 7, 8, 9, 10, 11, 12 ])

	t.equal(copy.$$$(clone(a), null, b, [ 0, 0 ], [ 0, 0 ]), a)
	t.equal(copy.$$$(clone(a), null, b, [ 1, 1 ], [ 1, 1 ]), a)
	t.equal(copy.$$$(clone(a), null, b, [ 1, 1 ], [ 0, 0 ]), a)

	copy.$$$(a, null, b, null, [ -1, -1 ])
	t.equal(a.data, [ 7, 8, 3, 4, 5, 6 ])

	copy.$$$(a, [ 0, 2 ], b, [ 1, 1 ], [ 3, 2 ])
	t.equal(a.data, [ 7, 8, 3, 4, 11, 12 ])
})
