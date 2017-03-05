/* Token types */
var NUMBER = 1, VAR = 2, OPER = 3;
function lexParser(input){
	var lexTable = [
		function(input) {
			var match = /^0x[0-9A-Fa-f]+/g.exec(input);
			if (match) {
				return {type:NUMBER, content:match[0]};
			}
			match = /^[0-9]+(\.[0-9]+)?([Ee][+\-][0-9]+)?/g.exec(input);
			if (match) {
				return {type:NUMBER, content:match[0]};
			}
			return false;
		},
		function(input) {
			var match = /^[A-Za-z_\u0080-\uffff][A-Za-z0-9_\-\u0080-\uffff]*/g.exec(input);
			if (match) {
				return {type:VAR, content:match[0]};
			}
			return false;
		},
		function(input) {
			var match = /^[+\-\*\/=\(\)]/g.exec(input);
			if (match) {
				return {type:OPER, content:match[0]};
			}
			return false;
		},
		function(input) {
			var match = /^\s+/g.exec(input);
			if (match) {
				return {type:null, content:match[0]};
			}
			return false;
		},
	];
	var result = [], pos = 0, token_last = undefined, token;
	while (input.length) {
		for (var i = 0; i < lexTable.length; i++) {
			token = lexTable[i](input);
			if (token) {
				if (token.type !== null) {
					token.pos = pos;
					result.push(token);
				}
				pos += token.content.length;
				input = input.slice(token.content.length);
				break;
			}
		}
		if (!token) {
			throw "Unexpected Character At Position " + pos;
		} else if (null !== token.type){
			if (token.type == OPER && token.content == '-') {
				if (undefined == token_last) {
					token.content = 'NEG';
				} else if (token_last.type == OPER && token_last.content != ')') {
					token.content = 'NEG';
				}
			}
			token_last = token;
		}
	}
	return result;
}
function getTokenType(token) {
	if (token.type == NUMBER || token.type == VAR) {
		return 'N';
	} else if (token.type == OPER) {
		if (token.content == '(') {
			return '(';
		} else if (token.content == ')') {
			return ')';
		} else if (operand[token.content].binocular) {
			return 'B';
		} else {
			return 'S';
		}
	}
	return null;
}
function syntaxCheck(tokens) {
	var syntaxTable = {
		'START' : ['N', 'S', '('],
		'N' : ['B', ')', 'END'],
		'S' : ['N', '(', 'S'],
		'B' : ['N', '(', 'S'],
		'(' : ['S', 'N', '('],
		')' : ['END', 'B'],
	}
	var t_last = 'START', t, stack_bracket = new Array();
	for (var i = 0; i < tokens.length; i++) {
		var t = getTokenType(tokens[i]);
		if (syntaxTable[t_last].indexOf(t) < 0) {
			return tokens[i];
		}
		if ('(' == t) {
			stack_bracket.push(tokens[i]);
		} else if (')' == t) {
			if (stack_bracket.length == 0) {
				return tokens[i];
			} else {
				stack_bracket.pop();
			}
		}
		t_last = t;
	}
	if (syntaxTable[t_last].indexOf('END') < 0) {
		return tokens[i];
	} else if (stack_bracket.length > 0) {
		return stack_bracket[stack_bracket.length - 1];
	}
	return null;
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
};
function rplParse(tokens) {
	var stack_main = new Array(), stack_oper = new Array();
	var token_pop;

	for (var i = 0; i < tokens.length; i++) {
		var token = tokens[i];
		if (token.type == NUMBER) { 
			token.content = Number(token.content);
			stack_main.push(token);
		} else if (token.type == VAR) {
			stack_main.push(token);
		} else if (token.type == OPER) {
			if (stack_oper.length == 0 || token.content == '(' || stack_oper[stack_oper.length-1].content == '(') {
				stack_oper.push(token);
			} else if (token.content == ')') {
				while (token_pop = stack_oper.pop()) {
					if (token_pop.content == '(') {
						break;
					}
					stack_main.push(token_pop);
				}
			} else {
				if (undefined === operand[token.content]) {
					throw "Syntax Error";
				}
				while (stack_oper.length > 0
						&& stack_oper[stack_oper.length-1].content != '('
						&& operand[stack_oper[stack_oper.length-1].content].priority >= operand[token.content].priority) {
					stack_main.push(stack_oper.pop());
				}
				stack_oper.push(token);
			}
		}
	}
	while (token_pop = stack_oper.pop()) {
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
		} else if (token.type == VAR) {
			if (undefined === vars[token.content]) {
				stack.push(0);
			} else {
				stack.push(Number(vars[token.content]));
			}
		} else if (token.type == OPER){
			//Calculate by opers
			var operand_data = operand[token.content];
			if (undefined === operand_data) {
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

var exprAll = [
	"- 3+ - (-3.1-4)*5/-10",
	"3+-(-3.1-4)*5 10-",
	"3-((-4)",
	"3-(-4))",
];
for (var i = 0; i < exprAll.length; i++) {
	var expr = exprAll[i];
	console.log('------');
	console.log(expr);
	var syntaxError = syntaxCheck(lexParser(expr));
	if (syntaxError) {
		console.log('Syntax Error: ', syntaxError);
	} else {
		console.log(rplCalc(rplParse(lexParser(expr))));
		console.log(eval(expr));
	}
}

