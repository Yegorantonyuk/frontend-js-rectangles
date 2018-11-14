﻿import { areIntersected, filterVisible } from '../src/index';

function stringifyRect (rect) {
	return `[${rect.left},${rect.top}; ${rect.width} x ${rect.height}]`;
}

describe('The function', function () {
	let rect1 = Object.freeze({
			left: 0, top: 0,
			width: 20, height: 20
		}),
		rect2 = Object.freeze({
			left: 10, top: 10,
			width: 25, height: 25
		}),
		rect3 = Object.freeze({
			left: -10, top: -10,
			width: 25, height: 25
		}),
		rect4 = Object.freeze({
			left: 0, top: -5,
			width: 25, height: 0
		}),
		rect5 = Object.freeze({
			left: -20, top: 10,
			width: 5, height: 5
		}),
		rect6 = Object.freeze({
			left: 0, top: 0,
			width: 0, height: 0
		}),
		rect7 = Object.freeze({
			left: 100, top: 10,
			width: 5, height: 5
		}),
		rect8 = Object.freeze({
			left: 5, top: 5,
			width: 10, height: 10
		}),
		rect9 = Object.freeze({
			left: 20, top: 20,
			width: 20, height: 20
		}),
		rect10 = Object.freeze({
			left: -10, top: 0,
			width: 10, height: 10
		}),
		rect11 = Object.freeze({
			left: 10, top: 10,
			width: 0, height: 25
		}),
		rect12 = Object.freeze({
			left: -4, top: 3,
			width: 1, height: 1
		}),
		rect13 = Object.freeze({
			left: -4, top: 7,
			width: 1, height: 1
		});

	describe('`areIntersected`', function () {
		let intersected;

		it('is defined', function () {
			expect(areIntersected).toBeDefined();
		});

		it('is a function', function () {
			expect(areIntersected).toBeInstanceOf(Function);
		});

		beforeEach(function () {
			intersected = undefined;
		});

		describe('can detect', function () {
			describe('intersection', function () {
				it(`${stringifyRect(rect1)} and ${stringifyRect(rect2)}`, function () {
					intersected = areIntersected(rect1, rect2);
					expect(intersected).toBe(true);
				});

				it(`${stringifyRect(rect1)} and ${stringifyRect(rect3)}`, function () {
					intersected = areIntersected(rect1, rect3);
					expect(intersected).toBe(true);
				});

				it(`${stringifyRect(rect4)} and ${stringifyRect(rect3)}`, function () {
					intersected = areIntersected(rect4, rect3);
					expect(intersected).toBe(true);
				});

				it(`${stringifyRect(rect3)} and ${stringifyRect(rect3)}`, function () {
					intersected = areIntersected(rect3, rect3);
					expect(intersected).toBe(true);
				});

				it(`${stringifyRect(rect1)} and ${stringifyRect(rect8)}`, function () {
					intersected = areIntersected(rect1, rect8);
					expect(intersected).toBe(true);
				});
			});

			describe('not intersected rectangles', function () {
				it(`${stringifyRect(rect1)} and ${stringifyRect(rect5)}`, function () {
					intersected = areIntersected(rect1, rect5);
					expect(intersected).toBe(false);
				});

				it(`${stringifyRect(rect2)} and ${stringifyRect(rect7)}`, function () {
					intersected = areIntersected(rect2, rect7);
					expect(intersected).toBe(false);
				});

				it(`${stringifyRect(rect4)} and ${stringifyRect(rect7)}`, function () {
					intersected = areIntersected(rect4, rect7);
					expect(intersected).toBe(false);
				});

				it(`${stringifyRect(rect2)} and ${stringifyRect(rect5)}`, function () {
					intersected = areIntersected(rect2, rect5);
					expect(intersected).toBe(false);
				});

				it(`${stringifyRect(rect1)} and ${stringifyRect(rect4)}`, function () {
					intersected = areIntersected(rect1, rect4);
					expect(intersected).toBe(false);
				});

				it(`${stringifyRect(rect1)} and ${stringifyRect(rect7)}`, function () {
					intersected = areIntersected(rect1, rect7);
					expect(intersected).toBe(false);
				});

				it(`${stringifyRect(rect13)} and ${stringifyRect(rect12)}`, function () {
					intersected = areIntersected(rect13, rect12);
					expect(intersected).toBe(false);
				});

			});

			describe('adjacent(surrounding) rectangles are not intersected ', function () {
				it(`${stringifyRect(rect1)} and ${stringifyRect(rect6)}`, function () {
					intersected = areIntersected(rect1, rect6);
					expect(intersected).toBe(false);
				});

				it(`${stringifyRect(rect1)} and ${stringifyRect(rect9)}`, function () {
					intersected = areIntersected(rect1, rect9);
					expect(intersected).toBe(false);
				});

				it(`${stringifyRect(rect1)} and ${stringifyRect(rect10)}`, function () {
					intersected = areIntersected(rect1, rect10);
					expect(intersected).toBe(false);
				});
				
			});
		});
	});

	describe('`filterVisible`', function () {
		let filtered;

		it('is defined', function () {
			expect(filterVisible).toBeDefined();
		});

		it('is a function', function () {
			expect(filterVisible).toBeInstanceOf(Function);
		});

		beforeEach(function () {
			filtered = undefined;
		});

		describe('can filter', function () {
			it('an array of rectangles', function () {
				let parent = rect1;
				let rectangles = [
					rect2,
					rect3,
					rect5,
					rect7,
					rect8,
					rect9,
					rect10
				];

				filtered = filterVisible(parent, rectangles);
				expect(filtered).toEqual([
					rect2,
					rect3,
					rect8
				]);
			});

			it('an array of rectangles, where some are invisible', function () {
				let parent = rect1;
				let rectangles = [
					rect2,
					rect3,
					rect4,
					rect5,
					rect6,
					rect7,
					rect8,
					rect9,
					rect10,
					rect11,
					rect12,
					rect13
				];

				filtered = filterVisible(parent, rectangles);
				expect(filtered).toEqual([
					rect2,
					rect3,
					rect8
				]);
			});

			it('an empty array', function () {
				filtered = filterVisible(rect1, []);
				expect(filtered).toHaveLength(0);
			});

			it('no rectangles, if the parent rectangle is invisible', function () {
				filtered = filterVisible(rect6, []);
				expect(filtered).toHaveLength(0);
			});
		});
	});
});