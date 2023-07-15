"use strict";
exports.__esModule = true;
exports.prime = exports.sum = exports.hanoi3 = exports.fibonacci = exports.factorial = void 0;
exports.factorial = function (value) {
    var n = 1;
    for (var i = 2; i <= value; ++i)
        n *= i;
    return n;
};
exports.fibonacci = function (index, first, second) {
    if (first === void 0) { first = 0; }
    if (second === void 0) { second = 1; }
    if (index === 0)
        return first;
    if (index === 1)
        return second;
    return exports.fibonacci(index - 2) + exports.fibonacci(index - 1);
};
/**
 * 하노이의 탑
 * (https://shoark7.github.io/programming/algorithm/tower-of-hanoi)
 * - '세 개의 기둥'과 이 기동에 꽂을 수 있는 크기가 다양한 '원판'이 있다.
 * - 퍼즐을 시작하기 전에는 한 기둥에 원판들이 작은 것이 위에 있도록 순서대로 쌓여 있다.
 * - 목적은 한 기둥에 꽂힌 원판들을 그 순서 그대로 다른 기둥으로 옮겨서 다시 쌓는 것이다.
 * - 한 번에 하나의 원판만 옮길 수 있다.
 * - 큰 원판이 작은 원판 위에 있어서는 안된다.
 * @param n 초기에 1번 기둥에 있는 원판의 수
 * @param from
 * @param to
 * @param via
 * @param paths
 * @return 목적지까지의 경로(paths)
 */
exports.hanoi3 = function (n, from, to, via, paths) {
    if (paths === void 0) { paths = []; }
    if (n === 1) {
        paths.push([from, to]);
    }
    else {
        exports.hanoi3(n - 1, from, via, to, paths);
        paths.push([from, to]);
        exports.hanoi3(n - 1, via, to, from, paths);
    }
    return paths;
};
exports.sum = {
    between: function (from, to) {
        return ((from + to) * (Math.abs(from - to) + 1)) / 2;
    },
    upTo: function (value, cost) {
        if (cost === void 0) { cost = 1; }
        return ((value * (value + 1)) / 2) * cost;
    }
};
exports.prime = {
    is: function (val) {
        for (var i = 3, to = Math.sqrt(val); i <= to; i += 2) {
            if (val % i === 0)
                return false;
        }
        return val >= 2;
    },
    between: function (from, to) { }
};
