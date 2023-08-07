const { test } = require('@kmamal/testing')
const { Array2d, clone, fill } = require('.')

test("structs.array-2d.fill", (t) => {
	const a = new Array2d(2, 3)

	const b = fill(a, 1)
	t.equal(b.data, [ 1, 1, 1, 1, 1, 1 ])

	t.equal(fill(b, 2, [ 0, 0 ], [ 0, 0 ]), b)
	t.equal(fill(b, 2, [ 1, 1 ], [ 1, 1 ]), b)
	t.equal(fill(b, 2, [ 1, 1 ], [ 0, 0 ]), b)

	const c = fill(b, 2, null, [ -1, -1 ])
	t.equal(c.data, [ 2, 1, 2, 1, 1, 1 ])

	const d = fill(c, 3, [ 1, 1 ])
	t.equal(d.data, [ 2, 1, 2, 3, 1, 3 ])

	const e = fill(d, 4, [ 0, 1 ], [ 2, 2 ])
	t.equal(e.data, [ 2, 1, 4, 4, 1, 3 ])
})

test("structs.array-2d.fill.$$$", (t) => {
	const a = new Array2d(2, 3)

	fill.$$$(a, 1)
	t.equal(a.data, [ 1, 1, 1, 1, 1, 1 ])

	t.equal(fill.$$$(clone(a), 2, [ 0, 0 ], [ 0, 0 ]), a)
	t.equal(fill.$$$(clone(a), 2, [ 1, 1 ], [ 1, 1 ]), a)
	t.equal(fill.$$$(clone(a), 2, [ 1, 1 ], [ 0, 0 ]), a)

	fill.$$$(a, 2, null, [ -1, -1 ])
	t.equal(a.data, [ 2, 1, 2, 1, 1, 1 ])

	fill.$$$(a, 3, [ 1, 1 ])
	t.equal(a.data, [ 2, 1, 2, 3, 1, 3 ])

	fill.$$$(a, 4, [ 0, 1 ], [ 2, 2 ])
	t.equal(a.data, [ 2, 1, 4, 4, 1, 3 ])
})
