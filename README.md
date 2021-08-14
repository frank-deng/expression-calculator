expression-calculator
=====================

A simple expression parser, using LL(1) syntax analyzer.

Useful to parse and calculate expression without using `eval()`, so as to avoid all the security risks caused by `eval()`.

API Documentation
-----------------

### Initialization

	const calc = new Calc();
	const calc = new Calc(expression);
	const calc = new Calc(RPN);
	
### Methods

#### `compile(expr)`

Compile an expression into an RPN expression.

**Parameters**

* `expr` - Expression to compile in string.

**Returns**

A reference to this instance.

**Throws**

* `SyntaxError` - If the given expression contains error.

	
#### `calc(vars)`
	
Calculate the previously compiled expression.

The compiled expression may contain variables, with default value 0.

You may use a key-value dict to specify values for variables in the expression. Variable names are case sensitive.

**Parameters**

* `vars` - A dict contains key-value pairs (Optional).

**Returns**

The calculation result, or `null` if no RPN is loaded or compiled from expression.

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

* `SyntaxError` - If the given RPN contains invalid tokens or errors.

### Aliases

#### `Calc.TOKEN_NUM`

Mark RPN tokens as number type.

#### `Calc.TOKEN_VAR`

Mark RPN tokens as variable type.

#### `Calc.TOKEN_OPER`

Mark RPN tokens as operand type.

