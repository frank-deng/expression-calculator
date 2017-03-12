var Calc = require('./exprcalc.min');
var exprGen = require('./exprgen');
QUnit.test("Basic Test", function(assert) {
	assert.strictEqual((new Calc()).compile('1+1').calc(), 2);
	assert.strictEqual((new Calc()).compile('- 3+ - (-3.1-4)*5/-10').calc(), -6.55);
	assert.strictEqual((new Calc()).compile('3-((-4))').calc(), 7);
	assert.strictEqual((new Calc()).compile('3-((-4))+4').calc(), 11);
});
QUnit.test("Compile Multiple Exprs", function(assert) {
	var calc = new Calc();
	assert.strictEqual(calc.compile('1+1').calc(), 2);
	assert.strictEqual(calc.compile('- 3+ - (-3.1-4)*5/-10').calc(), -6.55);
	assert.strictEqual(calc.compile('3-((-4))').calc(), 7);
	assert.strictEqual(calc.compile('3-((-4))+4').calc(), 11);
});
QUnit.test("RPN Output", function(assert) {
	var calc = new Calc();
	assert.deepEqual(calc.compile('1+1').getRPN(), [
		{type:Calc.TOKEN_NUM, value:1},
		{type:Calc.TOKEN_NUM, value:1},
		{type:Calc.TOKEN_OPER, value:'+'},
	]);
	assert.deepEqual(calc.compile('- 3+ - (-3.1-4)*5/-10').getRPN(), [
		{type:Calc.TOKEN_NUM, value:3},
		{type:Calc.TOKEN_OPER, value:'NEG'},
		{type:Calc.TOKEN_NUM, value:3.1},
		{type:Calc.TOKEN_OPER, value:'NEG'},
		{type:Calc.TOKEN_NUM, value:4},
		{type:Calc.TOKEN_OPER, value:'-'},
		{type:Calc.TOKEN_OPER, value:'NEG'},
		{type:Calc.TOKEN_NUM, value:5},
		{type:Calc.TOKEN_OPER, value:'*'},
		{type:Calc.TOKEN_NUM, value:10},
		{type:Calc.TOKEN_OPER, value:'NEG'},
		{type:Calc.TOKEN_OPER, value:'/'},
		{type:Calc.TOKEN_OPER, value:'+'},
	]);
	assert.deepEqual(calc.compile('3-((-4))').getRPN(), [
		{type:Calc.TOKEN_NUM, value:3},
		{type:Calc.TOKEN_NUM, value:4},
		{type:Calc.TOKEN_OPER, value:'NEG'},
		{type:Calc.TOKEN_OPER, value:'-'},
	]);
	assert.deepEqual(calc.compile('3-((-4))+4').getRPN(), [
		{type:Calc.TOKEN_NUM, value:3},
		{type:Calc.TOKEN_NUM, value:4},
		{type:Calc.TOKEN_OPER, value:'NEG'},
		{type:Calc.TOKEN_OPER, value:'-'},
		{type:Calc.TOKEN_NUM, value:4},
		{type:Calc.TOKEN_OPER, value:'+'},
	]);
});
QUnit.test("Run Without Expressions", function(assert) {
	var calc = new Calc();
	assert.strictEqual(calc.calc(), false);
});
QUnit.test("Malformed Expressions", function(assert) {
	var calc = new Calc();
	assert.throws(
		function(){
			calc.compile('3+#10');
		},
		function(e){
			return (
				(e instanceof Calc.SyntaxError)
				&& e.message === 'Unexpected Character'
				&& e.token === 2
			);
		}
	);
	assert.throws(
		function(){
			calc.compile('3--4');
		},
		function(e){
			return (
				(e instanceof Calc.SyntaxError)
				&& e.message === 'Unexpected Character'
				&& e.token === 1
			);
		}
	);
	assert.throws(
		function(){
			calc.compile('3+-(-3.1-4)*5 10-');
		},
		function(e){
			return (
				(e instanceof Calc.SyntaxError)
				&& e.message === 'Unexpected Token'
				&& e.token.type === Calc.TOKEN_NUM
				&& e.token.value === '10'
				&& e.token.pos === 14
			);
		}
	);
	assert.throws(
		function(){
			calc.compile('3-((-4)');
		},
		function(e){
			return (
				(e instanceof Calc.SyntaxError)
				&& e.message === 'Unmatched Bracket'
				&& e.token.type === Calc.TOKEN_OPER
				&& e.token.value === '('
				&& e.token.pos === 2
			);
		}
	);
	assert.throws(
		function(){
			calc.compile('3-(-4))');
		},
		function(e){
			return (
				(e instanceof Calc.SyntaxError)
				&& e.message === 'Unmatched Bracket'
				&& e.token.type === Calc.TOKEN_OPER
				&& e.token.value === ')'
				&& e.token.pos === 6
			);
		}
	);
	assert.strictEqual(calc.calc(), false);
});
QUnit.test("RPN Input", function(assert) {
	var rpn, calc = new Calc();
	rpn = [
		{type:Calc.TOKEN_NUM, value:1},
		{type:Calc.TOKEN_NUM, value:1},
		{type:Calc.TOKEN_OPER, value:'+'},
	];
	assert.deepEqual(calc.setRPN(rpn).getRPN(), rpn);
	assert.strictEqual(calc.setRPN(rpn).calc(), 2);

	rpn = [
		{type:Calc.TOKEN_NUM, value:3},
		{type:Calc.TOKEN_OPER, value:'NEG'},
		{type:Calc.TOKEN_NUM, value:3.1},
		{type:Calc.TOKEN_OPER, value:'NEG'},
		{type:Calc.TOKEN_NUM, value:4},
		{type:Calc.TOKEN_OPER, value:'-'},
		{type:Calc.TOKEN_OPER, value:'NEG'},
		{type:Calc.TOKEN_NUM, value:5},
		{type:Calc.TOKEN_OPER, value:'*'},
		{type:Calc.TOKEN_NUM, value:10},
		{type:Calc.TOKEN_OPER, value:'NEG'},
		{type:Calc.TOKEN_OPER, value:'/'},
		{type:Calc.TOKEN_OPER, value:'+'},
	];
	calc.setRPN(rpn);
	assert.deepEqual(calc.getRPN(), rpn);
	assert.strictEqual(calc.calc(), -6.55);

	rpn = [
		{type:Calc.TOKEN_NUM, value:3},
		{type:Calc.TOKEN_NUM, value:4},
		{type:Calc.TOKEN_OPER, value:'NEG'},
		{type:Calc.TOKEN_OPER, value:'-'},
	];
	calc.setRPN(rpn);
	assert.deepEqual(calc.getRPN(), rpn);
	assert.strictEqual(calc.calc(), 7);

	rpn = [
		{type:Calc.TOKEN_NUM, value:3},
		{type:Calc.TOKEN_NUM, value:4},
		{type:Calc.TOKEN_OPER, value:'NEG'},
		{type:Calc.TOKEN_OPER, value:'-'},
		{type:Calc.TOKEN_NUM, value:4},
		{type:Calc.TOKEN_OPER, value:'+'},
	];
	calc.setRPN(rpn);
	assert.deepEqual(calc.getRPN(), rpn);
	assert.strictEqual(calc.calc(), 11);
});
QUnit.test("Random Expression", function(assert) {
	var calc = new Calc(), count = 100;
	while (count--){
		var expr = exprGen(20);
		assert.strictEqual(calc.compile(expr).calc(), eval(expr), expr);
	}
});

