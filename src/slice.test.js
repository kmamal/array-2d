const { test } = require('@kmamal/testing')
const { Array2d, clone, slice } = require('.')

test("structs.array-2d.slice", (t) => {
	const a = new Array2d(2, 3, [ 1, 2, 3, 4, 5, 6 ])
	t.equal(slice(a), a)
	t.equal(slice(a, [ 0, 0 ], [ 0, 0 ]), { w: 0, h: 0, data: [] })
	t.equal(slice(a, [ 1, 1 ], [ 1, 1 ]), { w: 0, h: 0, data: [] })
	t.equal(slice(a, [ 1, 1 ], [ 0, 0 ]), { w: 0, h: 0, data: [] })
	t.equal(slice(a, null, [ 2, 2 ]), { w: 2, h: 2, data: [ 1, 2, 3, 4 ] })
	t.equal(slice(a, [ 0, 2 ], [ 2, 3 ]), { w: 2, h: 1, data: [ 5, 6 ] })
	t.equal(slice(a, [ 0, 0 ], [ -1, -1 ]), { w: 1, h: 2, data: [ 1, 3 ] })
})

test("structs.array-2d.slice.$$$", (t) => {
	const a = new Array2d(2, 3, [ 1, 2, 3, 4, 5, 6 ])
	t.equal(slice.$$$(clone(a)), a)
	t.equal(slice.$$$(clone(a), [ 0, 0 ], [ 0, 0 ]), { w: 0, h: 0, data: [] })
	t.equal(slice.$$$(clone(a), [ 1, 1 ], [ 1, 1 ]), { w: 0, h: 0, data: [] })
	t.equal(slice.$$$(clone(a), [ 1, 1 ], [ 0, 0 ]), { w: 0, h: 0, data: [] })
	t.equal(slice.$$$(clone(a), null, [ 2, 2 ]), { w: 2, h: 2, data: [ 1, 2, 3, 4 ] })
	t.equal(slice.$$$(clone(a), [ 0, 2 ], [ 2, 3 ]), { w: 2, h: 1, data: [ 5, 6 ] })
	t.equal(slice.$$$(clone(a), [ 0, 0 ], [ -1, -1 ]), { w: 1, h: 2, data: [ 1, 3 ] })
})
