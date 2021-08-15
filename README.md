expression-calculator
=====================

A simple expression parser, using LL(1) syntax analyzer.

Useful to parse and calculate expression without using `eval()`, so as to avoid all the security risks caused by `eval()`.

Installation
------------

	npm install --save expression-calculator

Import
------

ES6/Webpack

	import Calc from 'expression-calculator';

Node.js

	const Calc=require('expression-calculator');

Script Tag

	<script type='text/javascript' src='path/to/exprcalc.js'></script>

Global object `Symbol` should be polyfilled if not exist, espeically for older browsers like IE11.


Initialization
--------------

### `const calc = new Calc();`

Initialize a new instance of `Calc()` with empty RPN expression.

### `const calc = new Calc(expression);`

Initialize a new instance of `Calc()`, then compile the given expression into RPN (`compile()` method is called internally).
	
### `const calc = new Calc(RPN);`

Initialize a new instance of `Calc()`, then load the given RPN data (`setRPN()` method is called internally).

### `const calc = new Calc(calcInstance);`

Get a copy of the given `Calc()` instance.
	
Methods
-------

### `compile(expr)`

Compile an expression into an RPN expression.

**Parameters**

* `expr` - The string to be compiled.

**Returns**

A reference to this instance for chaining.

**Throws**

* `SyntaxError` - If the given expression contains error.

	
### `calc(vars)`
	
Calculate the previously compiled expression.

The compiled expression may contain variables, use a key-value dict to specify values for variables in the expression. Variable names are case sensitive.

**Parameters**

* `vars` - A dict contains key-value pairs (Required when the RPN contains variables, and all the variables in the RPN expression must have a value here).

**Returns**

The calculation result, or `null` if no RPN is loaded or compiled from expression.

**Throws**

* `TypeError` - When the value of a variable is not a number.
* `ReferenceError` - When the value of a variable is not given in the `vars` parameter.

**Example**

	var calc = new Calc();
	calc.compile('3+4').calc(); //Result: 7
	calc.compile('3+4-a').calc({a:-10}); //Result: 17


### `getRPN()`

Get the compiled RPN expression.

**Returns**

Returns the compiled RPN which can be converted into JSON, or `null` for empty RPN.

**Example**

	var calc = new Calc();
	calc.compile('3*(5+a)').getRPN();

The code above will generate the following JSON data:

	[
		{type:1, value:3},
		{type:1, value:5},
		{type:2, value:"a"},
		{type:3, value:"+"},
		{type:3, value:"*"}
	]
	
In the expression above, each token's type value has an alias, you may refer to **Aliases** section for detail.

You may also use it to check if the input expression is valid:

	var calc = new Calc();
	function checkExpr(expr) {
		try {
			var rpn = calc.compile(expr).getRPN();
			for (var i = 0; i < rpn.length; i++) {
				if (rpn[i].type == VAR) {
					return false;
				}
			}
		} catch(e) {
			return false;
		}
		return true;
	}


### `setRPN(expr)`

Load previously compiled RPN from other source like database or memcache/redis.

**Parameters**

* `expr` - The RPN expression, with the same format as data returned by method `getRPN()`.

**Returns**

A reference to this instance for chaining.

**Throws**

* `TypeError` - If the given RPN contains tokens with invalid type or value.
* `SyntaxError` - If the given RPN contains invalid tokens or errors.

### `compress()`

Reduce the size of RPN by precalculating the numbers.

Aliases
-------

* `Calc.TOKEN_NUM` - Mark RPN tokens as number type.
* `Calc.TOKEN_VAR` - Mark RPN tokens as variable type.
* `Calc.TOKEN_OPER` - Mark RPN tokens as operand type.
