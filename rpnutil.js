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
		root.RPNUtil = factory();
	}
}(this, function() {
	'use strict';
	/* Token types */
	var INVALID = 0, NUM = 1, VAR = 2, OPER = 3;
	var operand = {
		'+': {
			binocular: true,
			priority: 10,
			processor: function(a, b) {
				return a+b;
			}
		},
		'-': {
			binocular: true,
			priority: 10,
			processor: function(a, b) {
				return a-b;
			}
		},
		'*': {
			binocular: true,
			priority: 20,
			processor: function(a, b) {
				return a*b;
			}
		},
		'/': {
			binocular: true,
			priority: 20,
			processor: function(a, b) {
				return a/b;
			}
		},
		'NEG': {
			binocular: false,
			priority: 50,
			processor: function(a) {
				return -a;
			}
		},
	};
	return {
		getBinaryTree: function(rpn) {
			var stack = new Array();
			for (var i = 0; i < rpn.length; i++) {
				var token = rpn[i];
				if (token.type == NUM || token.type == VAR) {
					stack.push(token.value);
				} else if (token.type == OPER){
					var operand_data = operand[token.value];
					if (operand_data.binocular) {
						var b = stack.pop(), a = stack.pop();
						stack.push({node:token.value, left:a, right:b});
					}
				}
			}
			return stack[0];
		},
	}
}));
