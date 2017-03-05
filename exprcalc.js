/* Token types */
var NUMBER = 1, LABEL = 2, OPER = 3;

var lexTable = [
	function(input) {
		var match = /^0[0-7]+/g.exec(input);
		if (match) {
			return {type:NUMBER, len:match[0].length, content:parseInt(match[0], 8)};
		}
		match = /^0x[0-9A-Fa-f]+/g.exec(input);
		if (match) {
			return {type:NUMBER, len:match[0].length, content:Number(match[0])};
		}
		match = /^[0-9]+(\.[0-9]+)?([Ee][+\-][0-9]+)?/g.exec(input);
		if (match) {
			return {type:NUMBER, len:match[0].length, content:Number(match[0])};
		}
		return false;
	},
	function(input) {
		var match = /^[A-Za-z_\u0080-\uffff][A-Za-z0-9_\-\u0080-\uffff]*/g.exec(input);
		if (match) {
			return {type:LABEL, len:match[0].length, content:match[0]};
		}
		return false;
	},
	function(input) {
		var match = /^[+\-\*\/=\(\)]/g.exec(input);
		if (match) {
			return {type:OPER, len:match[0].length, content:match[0]};
		}
		return false;
	},
	function(input) {
		var match = /^\s+/g.exec(input);
		if (match) {
			return {type:null, len:match[0].length};
		}
		return false;
	},
];
function lexParser(input){
	var result = [];
	while (input.length) {
		var token = undefined;
		for (var i = 0; i < lexTable.length; i++) {
			token = lexTable[i](input);
			if (token) {
				if (token.type !== null) {
					result.push(token);
				}
				input = input.slice(token.len);
				break;
			}
		}
		if (!token) {
			throw {error:"Unexpected Character", token:input[0]};
		}
	}
	return result;
}
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
			if (b == 0) {
				throw 'Division By Zero';
			}
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
}
function rplParse(tokens) {
	var stack_main = new Array(), stack_oper = new Array();
	var token_pop, verification = 0;

	for (var i = 0; i < tokens.length; i++) {
		var token = tokens[i];
		if (token.type == NUMBER || token.type == LABEL) {
			stack_main.push(token);
			verification++;
		} else if (token.type == OPER) {
			//Pick out negative operation
			if (token.content == '-'
					&& (i == 0 || (tokens[i-1].type == OPER && tokens[i-1].content != ')'))) {
				token.content = tokens[i].content = 'NEG';
			}

			if (stack_oper.length == 0 || token.content == '(' || stack_oper[stack_oper.length-1].content == '(') {
				stack_oper.push(token);
			} else if (token.content == ')') {
				while (token_pop = stack_oper.pop()) {
					if (stack_oper.length == 0) {
						throw {error:"Unmatched Bracket", token:token_pop};
					} else if (token_pop.content == '(') {
						break;
					}

					if (operand[token_pop.content].binocular) {
						if (verification <= 1) {
							throw {error:"Syntax Error"};
						}
						verification--;
					}
					stack_main.push(token_pop);
				}
			} else {
				if (undefined === operand[token.content]) {
					throw {error:"Invalid Operand", token:token};
				}
				while (stack_oper.length > 0
						&& stack_oper[stack_oper.length-1].content != '('
						&& operand[stack_oper[stack_oper.length-1].content].priority >= operand[token.content].priority) {
					token_pop = stack_oper.pop();
					if (operand[token_pop.content].binocular) {
						if (verification <= 1) {
							throw {error:"Syntax Error"};
						}
						verification--;
					}
					stack_main.push(token_pop);
				}
				stack_oper.push(token);
			}
		}
	}
	while (token_pop = stack_oper.pop()) {
		if (token_pop.content == '(') {
			throw {error:"Unmatched Bracket", token:token_pop};
		} else if (operand[token_pop.content].binocular) {
			if (verification <= 1) {
				throw {error:"Syntax Error"};
			}
			verification--;
		}
		stack_main.push(token_pop);
	}
	return stack_main;
}
function rplCalc(tokens, vars) {
	var stack = new Array();
	for (var i = 0; i < tokens.length; i++) {
		var token = tokens[i];
		if (token.type == NUMBER) {
			stack.push(token.content);
		} else if (token.type == LABEL) {
			if (undefined === vars[token.content]) {
				stack.push(0);
			} else {
				stack.push(Number(vars[token.content]));
			}
		} else if (token.type == OPER){
			//Calculate by opers
			var operand_data = operand[token.content];
			if (undefined !== operand_data) {
				throw "Calculation Error";
			} else if (operand_data.binocular) {
				if (stack.length <= 1) {
					throw "Calculation Error";
				}
				var b = stack.pop(), a = stack.pop();
				stack.push(operand_data.processor(a,b));
			} else {
				if (stack.length < 1) {
					throw "Calculation Error";
				}
				stack.push(operand_data.processor(stack.pop()));
			}
		}
	}
	if (stack.length != 1) {
		throw "Calculation Error";
	}
	return stack[0];
}

//var expr = '3+(-3.1+4)*5+a';
var util = require('util');
var expr = '3+-(-3.1-4)*5';
try {
	console.log(expr);
	console.log(rplParse(lexParser(expr)));
	console.log(rplCalc(rplParse(lexParser(expr))));
} catch(e) {
	console.log(e);
}
console.log(eval(expr));
/*
try {
	console.log(rplParse(lexParser('3++4')));
} catch(e) {
	console.log(e);
}
*/
//console.log(eval(expr));

