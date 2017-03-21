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

#### `compile(expr,compress)`

Compile an expression into an RPN expression.

**Parameters**

* `expr` - Expression to compile in string.
* `Compress` - Compress RPN for fast calculation, default is `false`.

**Returns**

A reference to this instance.

**Throws**

* `Calc.SyntaxError` - If the given expression contains error.
	
#### `calc(vars)`
	
Calculate the previously compiled expression.

**Parameters**

* `vars` - A dict contains key-value pairs where keys for variable name and values for the numeric values for variables in the expression. Variables are case sensitive.

**Returns**

The calculation result, or `false` if no RPN is loaded or compiled from expression.

**Example**

Compile expression:

	var calc = new Calc();
	calc.compile('3+4-a');

Compile expression with the final RPN compressed:

	var calc = new Calc();
	calc.compile('3+4-a', true);

#### `getRPN()`

Get the compiled RPN expression.

**Returns**

Returns the compiled RPN, or `undefined` if no RPN is loaded or compiled from expression.

**Example**

	var calc = new Calc();
	calc.compile('3*(5+a)').getRPN();

The code above will get the following data:

	[
		{type:1, value:3},
		{type:1, value:5},
		{type:2, value:"a"},
		{type:3, value:"+"},
		{type:3, value:"*"},
	]
	
In the expression above, each token's type value has an alias, you may refer to **Aliases** section for detail.

#### `setRPN(expr)`

Load compiled RPN.

**Parameters**

* `expr` - The RPN expression, with the same format as data returned by method `getRPN()`.

**Returns**

A reference to this instance.

**Throws**

* `Calc.RPNError` - If the given RPN contains invalid tokens or errors.

### Aliases

#### `Calc.TOKEN_NUM`

Mark tokens of number type.

#### `Calc.TOKEN_VAR`

Mark tokens of variable type.

#### `Calc.TOKEN_OPER`

Mark tokens of operand type.
