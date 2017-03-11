/* Token types */
function CalcSyntaxError(m, token){
	this.name = CalcSyntaxError;
	this.message = m;
	this.stack = (new Error()).stack;
	this.token = token;
}
CalcSyntaxError.prototype = Object.create(Error.prototype);
CalcSyntaxError.prototype.constructor = CalcSyntaxError;

function Calc(){
	var NUM = 1, VAR = 2, OPER = 3;
	var lexTable = [
		function(input) {
			var match = /^0x[0-9A-Fa-f]+/g.exec(input);
			if (match) {
				return {type:NUM, value:match[0]};
			}
			match = /^[0-9]+(\.[0-9]+)?([Ee][+\-][0-9]+)?/g.exec(input);
			if (match) {
				return {type:NUM, value:match[0]};
			}
			return false;
		},
		function(input) {
			var match = /^[A-Za-z_\u0080-\uffff][A-Za-z0-9_\-\u0080-\uffff]*/g.exec(input);
			if (match) {
				return {type:VAR, value:match[0]};
			}
			return false;
		},
		function(input) {
			var match = /^[+\-\*\/\(\)]/g.exec(input);
			if (match) {
				return {type:OPER, value:match[0]};
			}
			return false;
		},
		function(input) {
			var match = /^\s+/g.exec(input);
			if (match) {
				return {type:null, value:match[0]};
			}
			return false;
		},
	];
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
	function lexParser(input){
		var result = [], pos = 0, token;
		while (input.length) {
			for (var i = 0; i < lexTable.length; i++) {
				token = lexTable[i](input);
				if (token) {
					if (token.type !== null) {
						token.pos = pos;
						result.push(token);
					}
					pos += token.value.length;
					input = input.slice(token.value.length);
					break;
				}
			}
			if (!token) {
				throw new CalcSyntaxError("Unexpected Character", pos);
			}
		}
		return result;
	}
	function getTokenType(token) {
		if (token.type == NUM || token.type == VAR) {
			return 'N';
		} else if (token.type == OPER) {
			if (token.value == '(') {
				return '(';
			} else if (token.value == ')') {
				return ')';
			} else if (operand[token.value].binocular) {
				return 'B';
			} else {
				return 'S';
			}
		}
		return null;
	}
	function processTokens(tokens) {
		var syntaxTable = {
			'START' : ['N', 'S', '('],
			'N' : ['B', ')', 'END'],
			'S' : ['N', '(', 'S'],
			'B' : ['N', '(', 'S'],
			'(' : ['S', 'N', '('],
			')' : [')', 'B', 'END'],
		}
		var t_last = 'START', t, stack_bracket = new Array();
		for (var i = 0; i < tokens.length; i++) {
			var token = tokens[i];
			if (token.type == OPER && token.value == '-' && ['N', ')'].indexOf(t_last) < 0) {
				token.value = tokens[i].value = 'NEG';
			}

			t = getTokenType(token);
			if (syntaxTable[t_last].indexOf(t) < 0) {
				throw new CalcSyntaxError("Unexpected Token", token);
			}
			if ('(' == t) {
				stack_bracket.push(tokens[i]);
			} else if (')' == t) {
				if (stack_bracket.length == 0) {
					throw new CalcSyntaxError("Unmatched Bracket", token);
				} else {
					stack_bracket.pop();
				}
			}
			t_last = t;
		}
		if (syntaxTable[t_last].indexOf('END') < 0) {
			throw new CalcSyntaxError("Unexpected End Of Expression");
		} else if (stack_bracket.length > 0) {
			throw new CalcSyntaxError("Unmatched Bracket", stack_bracket[stack_bracket.length - 1]);
		}
	}
	function makeRPN(tokens) {
		var stack_main = new Array(), stack_oper = new Array();
		var token_pop;

		for (var i = 0; i < tokens.length; i++) {
			var token = tokens[i];
			delete token.pos;

			if (token.type == NUM) { 
				token.value = Number(token.value);
				stack_main.push(token);
			} else if (token.type == VAR) {
				stack_main.push(token);
			} else if (token.type == OPER) {
				if (stack_oper.length == 0 || token.value == '(') {
					stack_oper.push(token);
				} else if (token.value == ')') {
					while (token_pop = stack_oper.pop()) {
						if (token_pop.value == '(') {
							break;
						}
						stack_main.push(token_pop);
					}
				} else {
					while (stack_oper.length > 0
							&& stack_oper[stack_oper.length-1].value != '('
							&& operand[stack_oper[stack_oper.length-1].value].priority >= operand[token.value].priority) {
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

	var rpnTokens = undefined;
	this.compile = function(expr) {
		var tokens = lexParser(expr);
		processTokens(tokens);
		rpnTokens = makeRPN(tokens);
		return this;
	}
	this.getRPN = function(){
		return rpnTokens;
	}
	this.setRPN = function(tokens){
		rpnTokens = new Array();
		var vstack = 0;
		for (var i = 0; i < tokens.length; i++) {
			var token = tokens[i];
			if (token.type == NUM || token.type == VAR) {
				vstack++;
			} else if (token.type == OPER) {
				var operand_data = operand[token.value];
				if (undefined === operand_data) {
					throw new CalcSyntaxError("Invalid Operand", token);
				} else if (operand_data.binocular) {
					if (vstack <= 1) {
						throw new CalcSyntaxError("Unexpected Operand", token);
					}
					vstack--;
				} else if (vstack == 0) {
					throw new CalcSyntaxError("Unexpected Operand", token);
				}
			} else {
				throw new CalcSyntaxError("Invalid Token", token);
			}
		}
		if (vstack != 1) {
			throw new CalcSyntaxError("Incomplete RPN", token);
		}
		return this;
	}
	this.calc = function(vars) {
		if (undefined === rpnTokens) {
			return false;
		}
		var stack = new Array();
		for (var i = 0; i < rpnTokens.length; i++) {
			var token = rpnTokens[i];
			if (token.type == NUM) {
				stack.push(token.value);
			} else if (token.type == VAR) {
				if (undefined === vars[token.value]) {
					stack.push(0);
				} else {
					stack.push(Number(vars[token.value]));
				}
			} else if (token.type == OPER){
				//Calculate by opers
				var operand_data = operand[token.value];
				if (operand_data.binocular) {
					var b = stack.pop(), a = stack.pop();
					stack.push(operand_data.processor(a,b));
				} else {
					stack.push(operand_data.processor(stack.pop()));
				}
			}
		}
		return stack[0];
	}
}


var exprAll = [
	"- 3+ - (-3.1-4)*5/-10",
	"3+-(-3.1-4)*5 10-",
	"3-((-4))",
	"3-((-4))+4",
	"3-((-4)",
	"3-(-4))",
];
var calc = new Calc();
for (var i = 0; i < exprAll.length; i++) {
	var expr = exprAll[i];
	console.log('>>> '+expr);
	try {
		console.log(calc.compile(expr).calc());
		console.log(eval(expr));
	} catch(e) {
		console.log('Error: ', e);
	}
}

