var Calc = require('./exprcalc');
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

