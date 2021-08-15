<a name='english'></a>

expression-calculator
=====================

[English](#english) | [中文](#chinese)

A simple expression parser, using LL(1) syntax analyzer.

Useful to parse and calculate expression without using `eval()`, so as to avoid all the security risks caused by `eval()`.

[Click here to open demo page](https://frank-deng.github.io/expression-calculator/)

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

**Returns**

A reference to this instance for chaining.

Aliases
-------

* `Calc.TOKEN_NUM` - Value is `1`, marks RPN tokens as number type.
* `Calc.TOKEN_VAR` - Value is `2`, marks RPN tokens as variable type.
* `Calc.TOKEN_OPER` - Value is `3`, marks RPN tokens as operand type.


<a name='chinese'></a>

expression-calculator
=====================

[English](#english) | [中文](#chinese)

一个简单的表达式解析器，使用LL(1)语法分析器。

可用于代替`eval()`函数来实现表达式的解析和计算，以避免`eval()`带来的相关安全风险。

[单击此处打开演示页面](https://frank-deng.github.io/expression-calculator/)

安装
----

	npm install --save expression-calculator

引入
----

ES6/Webpack

	import Calc from 'expression-calculator';

Node.js

	const Calc=require('expression-calculator');

Script标签

	<script type='text/javascript' src='path/to/exprcalc.js'></script>

初始化
------

### `const calc = new Calc();`

初始化一个逆波兰式为空的`Calc()`实例。

### `const calc = new Calc(expression);`

初始化一个新的`Calc()`实例，然后将给定的算式编译成逆波兰式（初始化时会在内部调用`compile()`方法）。
	
### `const calc = new Calc(RPN);`

初始化一个新的`Calc()`实例，然后加载给定的逆波兰式（初始化时会在内部调用`setRPN()`方法）。

### `const calc = new Calc(calcInstance);`

复制参数中指定的`Calc()`实例。

方法说明
--------

### `compile(expr)`

将给定的算式编译成逆波兰式。

**参数**

* `expr` - 待编译的表达式字符串。

**返回**

当前对象的引用，可供链式操作。

**异常**

* `SyntaxError` - 当给定的表达式有错误时。

	
### `calc(vars)`
	
计算被编译的表达式。

被编译的表达式中可能含有变量，可用含键值对的`Object`指定各个变量的值。变量名区分大小写，支持中文变量名。

**参数**

* `vars` - `Object`格式的键值对，用于给变量指定值（当表达式中有变量时，该参数为必要参数，且表达式中所有变量的值都必须在此指定）。

**返回**

计算结果，如果逆波兰式为空则返回`null`。

**异常**

* `TypeError` - 存在值不为数字类型的变量。
* `ReferenceError` - 表达式中有变量未指定值。

**范例**

	var calc = new Calc();
	calc.compile('3+4').calc(); //Result: 7
	calc.compile('3+4-a').calc({a:-10}); //Result: 17


### `getRPN()`

获取编译过的逆波兰式。

**返回**

返回编译过的逆波兰式，可直接转换成JSON字符串。如果逆波兰式为空则返回`null`。

**范例**

	var calc = new Calc();
	calc.compile('3*(5+a)').getRPN();

以上代码将返回以下数据：

	[
		{type:1, value:3},
		{type:1, value:5},
		{type:2, value:"a"},
		{type:3, value:"+"},
		{type:3, value:"*"}
	]
	
在以上逆波兰式中，所有项目的`type`值都有对应的别名，可参考**常用别名**小节。

### `setRPN(expr)`

从外部加载已编译的逆波兰式。

**参数**

* `expr` - 待加载的逆波兰式数据，格式和`getRPN()`方法返回的相同。

**返回**

当前对象的引用，可供链式操作。

**异常**

* `TypeError` - 给定的逆波兰式中存在含有错误数据格式的数据项。
* `SyntaxError` - 给定的逆波兰式存在非法数据项或存在错误。

### `compress()`

压缩逆波兰式，通过提前对数字进行运算的方式。

**返回**

当前对象的引用，可供链式操作。

常用别名
-------

* `Calc.TOKEN_NUM` - 值为`1`，将当前逆波兰式项目标记为数字类型。
* `Calc.TOKEN_VAR` - 值为`2`，将当前逆波兰式项目标记为变量类型。
* `Calc.TOKEN_OPER` - 值为`3`，将当前逆波兰式项目标记为运算符类型。
