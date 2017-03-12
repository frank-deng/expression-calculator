var Calc = require('./exprcalc');
var exprGen = require('./exprgen');

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
		//console.log('Error: ', e);
		console.log(e instanceof Calc.SyntaxError);
	}
}

var count = 100;
while (count--){
	var expr = exprGen(20);
	try {
		var r0 = calc.compile(expr).calc();
		var r1 = eval(expr);
		if (r0 != r1) {
			console.log('Error', expr, r0, r1);
		} else {
			console.log(expr, r0);
		}
	} catch(e) {
		console.log(e);
		console.log(e.token);
	}
}

