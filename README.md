expression-calculator
=====================

A simple expression parser, using LL(1) syntax analyzer.

Useful to parse and calculate expression without using `eval()`, so as to avoid all the security risks caused by `eval()`.

API Documentation
-----------------

### Initialization

Initialize an instance of `Calc()`.

	var calc = new Calc();
	
### Methods

#### `compile(expr,debug)`

Compile an expression into an RPN expression.

**Parameters**

* `expr` - Expression to compile in string.
* `debug` - Compression of RPN will not be made if `true`, useful for debugging, default is `false`.

**Returns**

A reference to this instance.

**Throws**

* `Calc.SyntaxError` - If the given expression contains error.

	
#### `calc(vars)`
	
Calculate the previously compiled expression.

The compiled expression may contain variables, with default value 0.

You may use a key-value dict to specify values for variables in the expression. Variable names are case sensitive.

**Parameters**

* `vars` - A dict contains key-value pairs (Optional).

**Returns**

The calculation result, or `false` if no RPN is loaded or compiled from expression.

**Example**

	var calc = new Calc();
	calc.compile('3+4').calc(); //Result: 7
	calc.compile('3+4-a').calc({a:-10}); //Result: 17


#### `getRPN()`

Get the compiled RPN expression.

**Returns**

Returns the compiled RPN which can be converted into JSON, or `undefined` if no RPN is loaded or compiled.

**Example**

	var calc = new Calc();
	calc.compile('3*(5+a)').getRPN();

The code above will get the following JSON data:

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


#### `setRPN(expr)`

Load previously compiled RPN from other source like database or memcache/redis.

**Parameters**

* `expr` - The RPN expression, with the same format as data returned by method `getRPN()`.

**Returns**

A reference to this instance.

**Throws**

* `Calc.RPNError` - If the given RPN contains invalid tokens or errors.


#### `getSimplifiedExpr()`

Get a simplified expression from the RPN compiled from an expression or loaded externally.

**Returns**

String of the simplified expression.

**Example**

	var calc = new Calc();
	var expr = calc.setRPN([
		{type:Calc.TOKEN_VAR, value:'b'},
		{type:Calc.TOKEN_VAR, value:'c'},
		{type:Calc.TOKEN_OPER, value:'+'},
		{type:Calc.TOKEN_VAR, value:'a'},
		{type:Calc.TOKEN_OPER, value:'*'},
	]).getSimplifiedExpr();
	//expr = 'a*(b+c)'
	
	var expr = calc.compile('((c-d))*(b+a)').getSimplifiedExpr();
	//expr = '(a+b)*(c-d)'


### Aliases

#### `Calc.TOKEN_NUM`

Mark RPN tokens of number type.

#### `Calc.TOKEN_VAR`

Mark RPN tokens of variable type.

#### `Calc.TOKEN_OPER`

Mark RPN tokens of operand type.

