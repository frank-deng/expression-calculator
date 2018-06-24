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
		root.Calc = factory();
	}
}(this, function() {
	'use strict';
	/* Token types */
	var INVALID = 0, NUM = 1, VAR = 2, OPER = 3;
	var lexTable = [
		function(input) {
			var match = /^(\-\-)/g.exec(input);
			if (match) {
				return {type:INVALID};
			}
			return false;
		},
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
			var match = /^[A-Za-z_\u0080-\uffff][A-Za-z0-9_\u0080-\uffff]*/g.exec(input);
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
			exchangeable: true,
			processor: function(a, b) {
				return a+b;
			}
		},
		'-': {
			binocular: true,
			priority: 10,
			exchangeable: false,
			processor: function(a, b) {
				return a-b;
			}
		},
		'*': {
			binocular: true,
			priority: 20,
			exchangeable: true,
			processor: function(a, b) {
				return a*b;
			}
		},
		'/': {
			binocular: true,
			priority: 20,
			exchangeable: false,
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
	var syntaxTable = {
		'START' : ['N', 'S', '('],
		'N' : ['B', ')', 'END'],
		'S' : ['N', '('],
		'B' : ['N', '(', 'S'],
		'(' : ['S', 'N', '('],
		')' : [')', 'B', 'END'],
	}

	var ErrorPrototype = Error.prototype;

	var SyntaxError = function(m, token){
		this.name = 'SyntaxError';
		this.message = m;
		this.stack = (new Error()).stack;
		this.token = token;
	}
	var SyntaxErrorPrototype = SyntaxError.prototype;
	SyntaxErrorPrototype = Object.create(ErrorPrototype);
	SyntaxErrorPrototype.constructor = SyntaxError;

	var RPNError = function(m, token, pos){
		this.name = 'RPNError';
		this.message = m;
		this.stack = (new Error()).stack;
		this.token = token;
		this.pos = pos;
	}
	var RPNErrorPrototype = RPNError.prototype;
	RPNErrorPrototype = Object.create(ErrorPrototype);
	RPNErrorPrototype.constructor = RPNError;

	var lexParser = function(input){
		var result = [], pos = 0, token;
		while (input.length) {
			for (var i = 0; i < lexTable.length; i++) {
				token = lexTable[i](input);
				if (false !== token) {
					if (INVALID == token.type) {
						throw new SyntaxError("Unexpected Character", pos);
					} else if (token.type !== null) {
						token.pos = pos;
						result.push(token);
					}
					pos += token.value.length;
					input = input.slice(token.value.length);
					break;
				}
			}
			if (!token) {
				throw new SyntaxError("Unexpected Character", pos);
			}
		}
		return result;
	}
	var getTokenType = function(token) {
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
	var processTokens = function(tokens) {
		var t_last = 'START', t, stack_bracket = new Array();
		for (var i = 0; i < tokens.length; i++) {
			var token = tokens[i];
			if (token.type == OPER && token.value == '-' && ['N', ')'].indexOf(t_last) < 0) {
				token.value = tokens[i].value = 'NEG';
			}

			t = getTokenType(token);
			if (syntaxTable[t_last].indexOf(t) < 0) {
				throw new SyntaxError("Unexpected Token", token);
			}
			if ('(' == t) {
				stack_bracket.push(tokens[i]);
			} else if (')' == t) {
				if (stack_bracket.length == 0) {
					throw new SyntaxError("Unmatched Bracket", token);
				} else {
					stack_bracket.pop();
				}
			}
			t_last = t;
		}
		if (syntaxTable[t_last].indexOf('END') < 0) {
			throw new SyntaxError("Unexpected End Of Expression");
		} else if (stack_bracket.length > 0) {
			throw new SyntaxError("Unmatched Bracket", stack_bracket[stack_bracket.length - 1]);
		}
	}
	var makeRPN = function(tokens, debug) {
		var stack_main = new Array(), stack_oper = new Array();
		var token_pop;

		var compressRPN = function(token, debug){
			if (debug) {
				stack_main.push(token);
				return;
			}
			var operand_data = operand[token.value];
			if (operand_data.binocular
				&& stack_main.length > 1
				&& stack_main[stack_main.length-1].type == NUM
				&& stack_main[stack_main.length-2].type == NUM) {
				var b = stack_main.pop().value, a = stack_main.pop().value;
				stack_main.push({
					type: NUM,
					value: operand_data.processor(a,b),
				});
			} else if (!operand_data.binocular
				&& stack_main.length > 0
				&& stack_main[stack_main.length-1].type == NUM) {
				stack_main.push({
					type: NUM,
					value: operand_data.processor(stack_main.pop().value),
				});
			} else {
				stack_main.push(token);
			}
		}

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
						compressRPN(token_pop, debug);
					}
				} else {
					while (stack_oper.length > 0
							&& stack_oper[stack_oper.length-1].value != '('
							&& operand[stack_oper[stack_oper.length-1].value].priority >= operand[token.value].priority) {
						compressRPN(stack_oper.pop(), debug);
					}
					stack_oper.push(token);
				}
			}
		}
		while (token_pop = stack_oper.pop()) {
			compressRPN(token_pop, debug);
		}
		return stack_main;
	}

	var Calc = function(){
		this.rpnTokens = undefined;
	};
	Calc.SyntaxError = SyntaxError;
	Calc.RPNError = RPNError;
	Calc.TOKEN_NUM = NUM;
	Calc.TOKEN_VAR = VAR;
	Calc.TOKEN_OPER = OPER;

	var cp = Calc.prototype;
	cp.compile = function(expr, debug) {
		var tokens = lexParser(expr);
		processTokens(tokens);
		this.rpnTokens = makeRPN(tokens, debug);
		return this;
	}
	cp.getRPN = function(){
		return this.rpnTokens;
	}
	cp.setRPN = function(tokens){
		if (tokens.length == 0) {
			throw new RPNError("Empty RPN");
		}

		var vstack = 0, rpnTokens = [];
		for (var i = 0; i < tokens.length; i++) {
			var token = tokens[i];
			if (token.type == NUM) {
				if (isNaN(token.value)) {
					throw new RPNError("Invalid Number", token, i);
				}
				token.value = Number(token.value);
				vstack++;
			} else if (token.type == VAR) {
				if ('string' != typeof(token.value)) {
					throw new RPNError("Invalid Variable", token, i);
				}
				vstack++;
			} else if (token.type == OPER) {
				var operand_data = operand[token.value];
				if (undefined === operand_data) {
					throw new RPNError("Invalid Operand", token, i);
				} else if (operand_data.binocular) {
					if (vstack <= 1) {
						throw new RPNError("Unexpected Operand", token, i);
					}
					vstack--;
				} else if (vstack == 0) {
					throw new RPNError("Unexpected Operand", token, i);
				}
			} else {
				throw new RPNError("Invalid Token", token, i);
			}
			rpnTokens.push({type:token.type, value:token.value});
		}
		if (vstack != 1) {
			throw new RPNError("Invalid RPN");
		}
		this.rpnTokens = rpnTokens;
		return this;
	}
	cp.calc = function(vars) {
		var rpnTokens = this.rpnTokens;
		if (undefined === rpnTokens || rpnTokens.length == 0) {
			return false;
		} else if (rpnTokens.length == 1 && rpnTokens[0].type == NUM) {
			return rpnTokens[0].value;
		}

		var stack = new Array();
		for (var i = 0; i < rpnTokens.length; i++) {
			var token = rpnTokens[i];
			if (token.type == NUM) {
				stack.push(token.value);
			} else if (token.type == VAR) {
				if (undefined === vars || isNaN(vars[token.value])) {
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
	cp.getSimplifiedExpr = function(){
		var processNum = function(stack, n){
			stack.push({value:n, priority:100});
		}
		var processOper = function(stack, oper){
			var revAddMinus = function(e){
				var arr = e.split('');
				var bracket = 0;
				for (var i = 0; i < arr.length; i++) {
					switch (e[i]) {
						case '+':
							if (0 == bracket) {
								arr[i] = '-';
							}
						break;
						case '-':
							if (0 == bracket) {
								arr[i] = '+';
							}
						break;
						case '(':
							bracket++;
						break;
						case ')':
							bracket--;
						break;
					}
				}
				return arr.join('');
			}
			var revMulDiv = function(e){
				var arr = e.split('');
				var bracket = 0;
				for (var i = 0; i < arr.length; i++) {
					switch (e[i]) {
						case '*':
							if (0 == bracket) {
								arr[i] = '/';
							}
						break;
						case '/':
							if (0 == bracket) {
								arr[i] = '*';
							}
						break;
						case '(':
							bracket++;
						break;
						case ')':
							bracket--;
						break;
					}
				}
				return arr.join('');
			}
			var operData = operand[oper];
			if (operData.binocular) {
				var b = stack.pop(), a = stack.pop(), temp;
				if (operData.exchangeable && String(a.value) > String(b.value)) {
					temp = a; a = b; b = temp;
				}
				if (a.priority < operData.priority) {
					a.value = '('+a.value+')';
				}
				var value = a.value + oper;
				if (b.priority > operData.priority) {
					value += b.value;
				} else if (b.priority < operData.priority) {
					b.value = '('+b.value+')';
					value += b.value;
				} else {
					switch(oper) {
						case '-':
							value += revAddMinus(b.value);
						break;
						case '/':
							value += revMulDiv(b.value);
						break;
						default:
							value += b.value;
						break;
					}
				}
				stack.push({
					value:value,
					priority:operData.priority,
				});
			} else {
				var node = stack[stack.length-1];
				if ('NEG' == oper) {
					node.value = (node.priority == 100 ? '-'+node.value : '-('+node.value+')');
				}
				node.priority = 0;
			}
		};

		if (undefined === this.rpnTokens || this.rpnTokens.length == 0) {
			return '';
		}
		var stack = new Array();
		for (var i = 0; i < this.rpnTokens.length; i++) {
			var token = this.rpnTokens[i];
			if (token.type == NUM || token.type == VAR) {
				processNum(stack, token.value)
			} else if (token.type == OPER){
				processOper(stack, token.value);
			}
		}
		return stack[0].value;
	}
	return Calc;
}));

