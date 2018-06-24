var Calc = require('./exprcalc');
var Calc2 = require('./exprcalc.min');
var exprGen = require('./exprgen');

QUnit.test("Basic Test", function(assert) {
	assert.strictEqual((new Calc()).compile('1+1').calc(), 2);
	assert.strictEqual((new Calc()).compile('- 3+ - (-3.1-4)*5/-10').calc(), -6.55);
	assert.strictEqual((new Calc()).compile('3-((-4))').calc(), 7);
	assert.strictEqual((new Calc()).compile('3-((-4))+4').calc(), 11);

	assert.strictEqual((new Calc2()).compile('1+1').calc(), 2);
	assert.strictEqual((new Calc2()).compile('- 3+ - (-3.1-4)*5/-10').calc(), -6.55);
	assert.strictEqual((new Calc2()).compile('3-((-4))').calc(), 7);
	assert.strictEqual((new Calc2()).compile('3-((-4))+4').calc(), 11);
});
QUnit.test("Compile Multiple Exprs", function(assert) {
	var calc = new Calc();
	assert.strictEqual(calc.compile('1+1').calc(), 2);
	assert.strictEqual(calc.compile('- 3+ - (-3.1-4)*5/-10').calc(), -6.55);
	assert.strictEqual(calc.compile('3-((-4))').calc(), 7);
	assert.strictEqual(calc.compile('3-((-4))+4').calc(), 11);

	calc = new Calc2();
	assert.strictEqual(calc.compile('1+1').calc(), 2);
	assert.strictEqual(calc.compile('- 3+ - (-3.1-4)*5/-10').calc(), -6.55);
	assert.strictEqual(calc.compile('3-((-4))').calc(), 7);
	assert.strictEqual(calc.compile('3-((-4))+4').calc(), 11);
});
QUnit.test("Zero Division", function(assert) {
	var calc = new Calc();
	assert.strictEqual(calc.compile('3/0').calc(), Infinity);
	assert.strictEqual(calc.compile('3/(1-1)*2').calc(), Infinity);
	assert.strictEqual(calc.compile('-3/(1-1)').calc(), -Infinity);

	calc = new Calc2();
	assert.strictEqual(calc.compile('3/0').calc(), Infinity);
	assert.strictEqual(calc.compile('3/(1-1)*2').calc(), Infinity);
	assert.strictEqual(calc.compile('-3/(1-1)').calc(), -Infinity);
});
QUnit.test("RPN Output", function(assert) {
	var calc = new Calc();
	assert.deepEqual(calc.compile('1+1', true).getRPN(), [
		{type:Calc.TOKEN_NUM, value:1},
		{type:Calc.TOKEN_NUM, value:1},
		{type:Calc.TOKEN_OPER, value:'+'},
	]);
	assert.deepEqual(calc.compile('1+1').getRPN(), [
		{type:Calc.TOKEN_NUM, value:2},
	]);
	assert.deepEqual(calc.compile('- 3+ - (-3.1-4)*5/-10', true).getRPN(), [
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
	assert.deepEqual(calc.compile('- 3+ - (-3.1-4)*5/-10').getRPN(), [
		{type:Calc.TOKEN_NUM, value:-6.55},
	]);
	assert.deepEqual(calc.compile('3-((-4))', true).getRPN(), [
		{type:Calc.TOKEN_NUM, value:3},
		{type:Calc.TOKEN_NUM, value:4},
		{type:Calc.TOKEN_OPER, value:'NEG'},
		{type:Calc.TOKEN_OPER, value:'-'},
	]);
	assert.deepEqual(calc.compile('3-((-4))').getRPN(), [
		{type:Calc.TOKEN_NUM, value:7},
	]);
	assert.deepEqual(calc.compile('3-((-4))+4', true).getRPN(), [
		{type:Calc.TOKEN_NUM, value:3},
		{type:Calc.TOKEN_NUM, value:4},
		{type:Calc.TOKEN_OPER, value:'NEG'},
		{type:Calc.TOKEN_OPER, value:'-'},
		{type:Calc.TOKEN_NUM, value:4},
		{type:Calc.TOKEN_OPER, value:'+'},
	]);
	assert.deepEqual(calc.compile('3-((-4))+4').getRPN(), [
		{type:Calc.TOKEN_NUM, value:11},
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
QUnit.test("Malformed RPN", function(assert) {
	var calc = new Calc();
	var rpnGood = [
		{type:Calc.TOKEN_NUM, value:1},
		{type:Calc.TOKEN_NUM, value:2},
		{type:Calc.TOKEN_OPER, value:'+'},
	];
	calc.setRPN(rpnGood);

	assert.throws(
		function(){
			calc.setRPN([]);
		},
		function(e){
			return (
				(e instanceof Calc.RPNError)
				&& e.message === 'Empty RPN'
				&& e.token === undefined
				&& e.pos === undefined
			);
		}
	);
	assert.throws(
		function(){
			calc.setRPN([{
				aaa: 111,
			}]);
		},
		function(e){
			return (
				(e instanceof Calc.RPNError)
				&& e.message === 'Invalid Token'
				&& e.token.aaa === 111
				&& e.pos === 0
			);
		}
	);
	assert.throws(
		function(){
			calc.setRPN([
				{type:Calc.TOKEN_NUM, value:5},
				{type:Calc.TOKEN_NUM, value:6},
				{type:Calc.TOKEN_OPER, value:'+'},
				{type:Calc.TOKEN_NUM, value:'aaa'},
				{type:Calc.TOKEN_OPER, value:'*'},
			]);
		},
		function(e){
			return (
				(e instanceof Calc.RPNError)
				&& e.message === 'Invalid Number'
				&& e.token.type === Calc.TOKEN_NUM
				&& e.token.value === 'aaa'
				&& e.pos === 3
			);
		}
	);
	assert.throws(
		function(){
			calc.setRPN([
				{type:Calc.TOKEN_NUM, value:5},
				{type:Calc.TOKEN_VAR, value:2333},
				{type:Calc.TOKEN_OPER, value:'+'},
				{type:Calc.TOKEN_VAR, value:'b'},
				{type:Calc.TOKEN_OPER, value:'*'},
			]);
		},
		function(e){
			return (
				(e instanceof Calc.RPNError)
				&& e.message === 'Invalid Variable'
				&& e.token.type === Calc.TOKEN_VAR
				&& e.token.value === 2333
				&& e.pos === 1
			);
		}
	);
	assert.throws(
		function(){
			calc.setRPN([
				{type:Calc.TOKEN_NUM, value:5},
				{type:Calc.TOKEN_NUM, value:6},
				{type:Calc.TOKEN_OPER, value:'$'},
				{type:Calc.TOKEN_VAR, value:'a'},
				{type:Calc.TOKEN_OPER, value:'*'},
			]);
		},
		function(e){
			return (
				(e instanceof Calc.RPNError)
				&& e.message === 'Invalid Operand'
				&& e.token.type === Calc.TOKEN_OPER
				&& e.token.value === '$'
				&& e.pos === 2
			);
		}
	);
	assert.throws(
		function(){
			calc.setRPN([
				{type:Calc.TOKEN_NUM, value:5},
				{type:Calc.TOKEN_NUM, value:6},
				{type:Calc.TOKEN_OPER, value:'+'},
				{type:Calc.TOKEN_OPER, value:'*'},
			]);
		},
		function(e){
			return (
				(e instanceof Calc.RPNError)
				&& e.message === 'Unexpected Operand'
				&& e.token.type === Calc.TOKEN_OPER
				&& e.token.value === '*'
				&& e.pos === 3
			);
		}
	);
	assert.throws(
		function(){
			calc.setRPN([
				{type:Calc.TOKEN_OPER, value:'NEG'},
			]);
		},
		function(e){
			return (
				(e instanceof Calc.RPNError)
				&& e.message === 'Unexpected Operand'
				&& e.token.type === Calc.TOKEN_OPER
				&& e.token.value === 'NEG'
				&& e.pos === 0
			);
		}
	);
	assert.throws(
		function(){
			calc.setRPN([
				{type:Calc.TOKEN_NUM, value:5},
				{type:Calc.TOKEN_NUM, value:6},
				{type:Calc.TOKEN_OPER, value:'+'},
				{type:Calc.TOKEN_NUM, value:7},
				{type:Calc.TOKEN_OPER, value:'*'},
				{type:Calc.TOKEN_NUM, value:8},
			]);
		},
		function(e){
			return (
				(e instanceof Calc.RPNError)
				&& e.message === 'Invalid RPN'
				&& e.token === undefined
				&& e.pos === undefined
			);
		}
	);
	assert.deepEqual(calc.getRPN(), rpnGood);
});
QUnit.test("Applying Variables", function(assert) {
	var rpn, calc = new Calc();

	calc.compile('a*b');
	assert.deepEqual(calc.getRPN(), [
		{type:Calc.TOKEN_VAR, value:'a'},
		{type:Calc.TOKEN_VAR, value:'b'},
		{type:Calc.TOKEN_OPER, value:'*'},
	]);
	assert.strictEqual(calc.calc(), 0);
	assert.strictEqual(calc.calc({a:12,b:3}), 36);

	calc.compile('(3+4)*(a+b)');
	assert.deepEqual(calc.getRPN(), [
		{type: Calc.TOKEN_NUM, value: 7},
		{type: Calc.TOKEN_VAR, value: 'a'},
		{type: Calc.TOKEN_VAR, value: 'b'},
		{type: Calc.TOKEN_OPER, value: '+'},
		{type: Calc.TOKEN_OPER, value: '*'},
	]);
	assert.strictEqual(calc.calc({a:2, b:3}), 35);
	assert.strictEqual(calc.compile('(3+4)*(a+b)', true).calc({a:2, b:3}), 35);

	calc.compile('(3+4)*(a+b)/(-(-5-6))');
	assert.deepEqual(calc.getRPN(), [
		{type: Calc.TOKEN_NUM, value: 7},
		{type: Calc.TOKEN_VAR, value: 'a'},
		{type: Calc.TOKEN_VAR, value: 'b'},
		{type: Calc.TOKEN_OPER, value: '+'},
		{type: Calc.TOKEN_OPER, value: '*'},
		{type: Calc.TOKEN_NUM, value: 11},
		{type: Calc.TOKEN_OPER, value: '/'},
	]);
	assert.strictEqual(calc.calc({a:2, b:3}), 35/11);
	assert.strictEqual(calc.compile('(3+4)*(a+b)/(-(-5-6))', true).calc({a:2, b:3}), 35/11);

	calc.compile('a-b');
	assert.deepEqual(calc.getRPN(), [
		{type:Calc.TOKEN_VAR, value:'a'},
		{type:Calc.TOKEN_VAR, value:'b'},
		{type:Calc.TOKEN_OPER, value:'-'},
	]);
	assert.strictEqual(calc.calc({a:12,b:3}), 9);
	assert.strictEqual(calc.calc({a:12}), 12);
	assert.strictEqual(calc.calc({b:3}), -3);

	rpn = [
		{type:Calc.TOKEN_VAR, value:'c'},
		{type:Calc.TOKEN_VAR, value:'d'},
		{type:Calc.TOKEN_OPER, value:'-'},
	];
	calc.setRPN(rpn);
	assert.deepEqual(calc.getRPN(), rpn);
	assert.strictEqual(calc.calc(), 0);
	assert.strictEqual(calc.calc({c:1}), 1);
	assert.strictEqual(calc.calc({d:2}), -2);
	assert.strictEqual(calc.calc({c:1, d:2}), -1);
});
QUnit.test("Variables With Malformed Value", function(assert) {
	var calc = new Calc();
	calc.compile('a-b');
	assert.strictEqual(calc.calc({a:'ads', b:'<script>alert(2048)</script>', c:21}), 0);
	assert.strictEqual(calc.calc({a:12, b:'sd'}), 12);
	assert.strictEqual(calc.calc({a:undefined, b:3}), -3);
});
QUnit.test("Random Expression", function(assert) {
	var calc = new Calc(), calc2 = new Calc2(), calc3 = new Calc(), calc4 = new Calc2(), count = 1000;
	while (count--){
		var expr = exprGen(3+(Math.random()*40).toFixed(0));
		assert.strictEqual(calc.compile(expr).calc(), eval(expr), expr);
		expr = exprGen(3+(Math.random()*40).toFixed(0));
		assert.strictEqual(calc2.compile(expr).calc(), eval(expr), expr);
		expr = exprGen(3+(Math.random()*40).toFixed(0));
		assert.strictEqual(calc3.compile(expr).calc(), eval(expr), expr);
		expr = exprGen(3+(Math.random()*40).toFixed(0));
		assert.strictEqual(calc4.compile(expr).calc(), eval(expr), expr);
	}
});
QUnit.test("Convert RPN to Expression", function(assert){
	var calc = new Calc();
	assert.strictEqual(calc.setRPN([
		{type:Calc.TOKEN_VAR, value:'b'},
		{type:Calc.TOKEN_VAR, value:'a'},
		{type:Calc.TOKEN_OPER, value:'+'},
	]).getSimplifiedExpr(), 'a+b');
	assert.strictEqual(calc.setRPN([
		{type:Calc.TOKEN_VAR, value:'a'},
		{type:Calc.TOKEN_VAR, value:'3'},
		{type:Calc.TOKEN_OPER, value:'-'},
	]).getSimplifiedExpr(), 'a-3');
	assert.strictEqual(calc.setRPN([
		{type:Calc.TOKEN_VAR, value:'a'},
		{type:Calc.TOKEN_VAR, value:'b'},
		{type:Calc.TOKEN_VAR, value:'c'},
		{type:Calc.TOKEN_OPER, value:'*'},
		{type:Calc.TOKEN_OPER, value:'+'},
	]).getSimplifiedExpr(), 'a+b*c');
	assert.strictEqual(calc.setRPN([
		{type:Calc.TOKEN_VAR, value:'b'},
		{type:Calc.TOKEN_VAR, value:'c'},
		{type:Calc.TOKEN_OPER, value:'+'},
		{type:Calc.TOKEN_VAR, value:'a'},
		{type:Calc.TOKEN_OPER, value:'*'},
	]).getSimplifiedExpr(), 'a*(b+c)');
	assert.strictEqual(calc.setRPN([
		{type:Calc.TOKEN_VAR, value:'a'},
		{type:Calc.TOKEN_VAR, value:'b'},
		{type:Calc.TOKEN_OPER, value:'+'},
		{type:Calc.TOKEN_VAR, value:'c'},
		{type:Calc.TOKEN_OPER, value:'*'},
	]).getSimplifiedExpr(), '(a+b)*c');
	assert.strictEqual(calc.setRPN([
		{type:Calc.TOKEN_VAR, value:'a'},
		{type:Calc.TOKEN_OPER, value:'NEG'},
		{type:Calc.TOKEN_VAR, value:'b'},
		{type:Calc.TOKEN_OPER, value:'NEG'},
		{type:Calc.TOKEN_OPER, value:'+'},
		{type:Calc.TOKEN_OPER, value:'NEG'},
		{type:Calc.TOKEN_VAR, value:'c'},
		{type:Calc.TOKEN_OPER, value:'*'},
	]).getSimplifiedExpr(), '(-((-a)+(-b)))*c');
	assert.strictEqual(calc.compile('d+c').getSimplifiedExpr(), 'c+d');
	assert.strictEqual(calc.compile('(b+a)*c').getSimplifiedExpr(), '(a+b)*c');
	assert.strictEqual(calc.compile('(b-a)*c').getSimplifiedExpr(), '(b-a)*c');
	assert.strictEqual(calc.compile('((c-d))*(b+a)').getSimplifiedExpr(), '(a+b)*(c-d)');
	assert.strictEqual(calc.compile('d*c+b*a').getSimplifiedExpr(), 'a*b+c*d');
	assert.strictEqual(calc.compile('d*c-b*a').getSimplifiedExpr(), 'c*d-a*b');
	assert.strictEqual(calc.compile('(d*c-b)*a').getSimplifiedExpr(), 'a*(c*d-b)');
	assert.strictEqual(calc.compile('b*a-(d*c+a-b)').getSimplifiedExpr(), 'a*b-a-c*d+b');
	assert.strictEqual(calc.compile('d/(c/b)+b/a').getSimplifiedExpr(), 'b/a+d/c*b');
});
QUnit.test("Convert RPN to Expression - Random Expression Test", function(assert){
	var calc = new Calc(), count = 1000;
	while (count--){
		var expr = exprGen(3+(Math.random()*40).toFixed(0));
		var expr2 = calc.compile(expr, true).getSimplifiedExpr();
		var r0 = eval(expr), r1 = eval(expr2);
		assert.ok(function(){
			return (expr != expr2) && Math.abs(r1 - r0) < 0.0000001;
		}, expr+' : '+expr2);
	}
});

