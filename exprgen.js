(function(root, factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		// AMD support.
		define([], factory);
	} else if (typeof exports === 'object') {
		// NodeJS support.
		module.exports = factory();
	} else {
		// Browser global support.
		root.exprGen = factory();
	}
}(this, function() {
	'use strict';
	var syntaxTable = {
		'START' : ['N', 'S', '('],
		'N' : ['B', ')', 'END'],
		'S' : ['N', '('],
		'B' : ['N', '('],
		'(' : ['S', 'N', '('],
		')' : [')', 'B', 'END'],
	}
	var operBinocularAvail = ['+', '-', '*', '/'];
	return function(len){
		var t = 'START', result = '', bracket = 0, running = true;
		while (running) {
			var tAvail = syntaxTable[t];
			var t = tAvail[Math.floor(Math.random() * tAvail.length)];
			if ('END' == t) {
				if (len < 0) {
					break;
				} else {
					t = tAvail[Math.floor(Math.random() * (tAvail.length - 1))];
				}
			}
			switch (t) {
				case '(':
					result += '(';
					bracket++;
				break;
				case ')':
					if (bracket > 0) {
						result += ')';
						bracket--;
					}
				break;
				case 'N':
					result += String((Math.random()*200).toFixed(3));
				break;
				case 'S':
					result += '-';
				break;
				case 'B':
					result += operBinocularAvail[Math.floor(Math.random() * operBinocularAvail.length)];
				break;
			}
			len--;
		}
		while (bracket--) {
			result += ')';
		}
		return result;
	}
}));

