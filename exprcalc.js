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
		var match = /^[A-Za-z_][A-Za-z0-9_\-\u0080-\uffff]*/g.exec(input);
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
	var result = [], count = 10000;
	while (input.length && --count) {
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
			throw 'Unexpected Character: ' + input[0];
		}
	}
	return result;
}
function rplParse(tokens) {
	var stack_main = new Array(), stack_oper = new Array();
	var token_pop, verification = 0;
	var double_oper = ['+', '-', '*', '/'];
	var priority = {
		'+': 1,
		'-': 1,
		'*': 10,
		'/': 10,
		'NEG': 20,
	}

	for (var i = 0; i < tokens.length; i++) {
		var token = tokens[i];
		if (token.type == NUMBER || token.type == LABEL) {
			stack_main.push(token);
			verification++;
		} else if (token.type == OPER) {
			if (stack_oper.length == 0 || token.content == '(' || stack_oper[stack_oper.length-1].content == '(') {
				stack_oper.push(token);
			} else if (token.content == ')') {
				token_pop = undefined;
				while (token_pop = stack_oper.pop()) {
					if (stack_oper.length == 0) {
						throw "Unmatched \")\" Detected";
					} else if (token_pop.content == '(') {
						break;
					}
					stack_main.push(token_pop);
				}
			} else {
				//Pick out negative operation
				if (token.content == '-'
						&& (i == 0 || (tokens[i-1].type == OPER && tokens[i-1].content != ')'))) {
					token.content = 'NEG';
				}

				while (stack_oper.length > 0 && priority[stack_oper[stack_oper.length-1].content] >= priority[token.content]) {
					token_pop = stack_oper.pop();
					if (double_oper.indexOf(token_pop.content) >= 0) {
						if (verification <= 1) {
							throw "Unexpected Operand: " + token.content;
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
			throw "Unmatched \"(\" Detected";
		} else if (double_oper.indexOf(token_pop.content) >= 0) {
			if (verification <= 1) {
				throw "Unexpected Operand: " + token.content;
			}
			verification--;
		}
		stack_main.push(token_pop);
	}
	return stack_main;
}
function rplCalc(tokens) {
	var stack = new Array();
	for (var i = 0; i < tokens.length; i++) {
		var token = tokens[i];
	}
}

//var expr = '3+(-3.1+4)*5+a';
var expr = '3+(-3.1+4)*5+a';
console.log(expr);
console.log(lexParser(expr));
console.log(rplParse(lexParser(expr)));
console.log(rplParse(lexParser('3++4')));
//console.log(eval(expr));

