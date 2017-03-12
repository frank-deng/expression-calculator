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

var expr = exprGen(10);
console.log(expr);
console.log(eval(expr));
try {
	console.log(calc.compile(expr).calc());
} catch(e) {
	console.log(e);
	console.log(e.token);
}
