import assert from 'assert';
import {
    NUM,
    VAR,
    OPER
} from './types';
import RPN from './rpn';

describe('Basic RPN test',function(){
	it('Calculate 1+1',function(){
		assert.strictEqual(new RPN('1+1').calc(),2);
    });
	it('RPN of 1+1',function(){
		assert.deepStrictEqual(new RPN('1+1').getRPN(),[
            {type:NUM, value:1},
            {type:NUM, value:1},
            {type:OPER, value:'+'},
        ]);
    });
	it('RPN of 1+2-3',function(){
		assert.deepStrictEqual(new RPN('1+2-3').getRPN(),[
            {type:NUM, value:1},
            {type:NUM, value:2},
            {type:OPER, value:'+'},
            {type:NUM, value:3},
            {type:OPER, value:'-'},
        ]);
    });
    it('RPN of 1+2-3 for JSON serialization',function(){
		assert.strictEqual(JSON.stringify(new RPN('1+2-3')),JSON.stringify([
            {type:NUM, value:1},
            {type:NUM, value:2},
            {type:OPER, value:'+'},
            {type:NUM, value:3},
            {type:OPER, value:'-'},
        ]));
    });
	it('Calculate 1+2*(3-4)',function(){
		assert.strictEqual(new RPN('1+2*(3-4)').calc(),-1);
    });
	it('RPN of 1+2*(3-4)',function(){
		assert.deepStrictEqual(new RPN('1+2*(3-4)').getRPN(),[
            {type:NUM, value:1},
            {type:NUM, value:2},
            {type:NUM, value:3},
            {type:NUM, value:4},
            {type:OPER, value:'-'},
            {type:OPER, value:'*'},
            {type:OPER, value:'+'},
        ]);
    });
	it('Calculate 1*1+2*(3-4)',function(){
		assert.strictEqual(new RPN('1*1+2*(3-4)').calc(),-1);
    });
	it('RPN of 1*1+2*(3-4)',function(){
		assert.deepStrictEqual(new RPN().compile('1*1+2*(3-4)').getRPN(),[
            {type:NUM, value:1},
            {type:NUM, value:1},
            {type:OPER, value:'*'},
            {type:NUM, value:2},
            {type:NUM, value:3},
            {type:NUM, value:4},
            {type:OPER, value:'-'},
            {type:OPER, value:'*'},
            {type:OPER, value:'+'},
        ]);
    });
	it('RPN of -1*1+2*(-3-4)',function(){
		assert.deepStrictEqual(new RPN().compile('-1*1+2*(-3-4)').getRPN(),[
            {type:NUM, value:1},
            {type:OPER, value:'NEG'},
            {type:NUM, value:1},
            {type:OPER, value:'*'},
            {type:NUM, value:2},
            {type:NUM, value:3},
            {type:OPER, value:'NEG'},
            {type:NUM, value:4},
            {type:OPER, value:'-'},
            {type:OPER, value:'*'},
            {type:OPER, value:'+'},
        ]);
    });
	it('RPN compress',function(){
		assert.deepStrictEqual(new RPN('1*1+2*(3-4)').compress().getRPN(),[
            {type:NUM, value:-1},
        ]);
    });
	it('RPN with variable',function(){
		assert.deepStrictEqual(new RPN('(a+3)*2-1').getRPN(),[
            {type:VAR, value:'a'},
            {type:NUM, value:3},
            {type:OPER, value:'+'},
            {type:NUM, value:2},
            {type:OPER, value:'*'},
            {type:NUM, value:1},
            {type:OPER, value:'-'},
        ]);
    });
	it('RPN with variable calculation',function(){
		assert.deepStrictEqual(new RPN('(a+3)*2-1*8').calc({a:666}),(666+3)*2-1*8);
    });
	it('RPN with variable calculation but without value specified',function(){
		assert.throws(()=>new RPN('(TEST+3)*2-1').calc(),
            new ReferenceError('Value of variable TEST not specified.'));
    });
	it('RPN with variable compression',function(){
		assert.deepStrictEqual(new RPN('(a+3)*2-1*8').getRPN(),[
            {type:VAR, value:'a'},
            {type:NUM, value:3},
            {type:OPER, value:'+'},
            {type:NUM, value:2},
            {type:OPER, value:'*'},
            {type:NUM, value:1},
            {type:NUM, value:8},
            {type:OPER, value:'*'},
            {type:OPER, value:'-'},
        ]);
		assert.deepStrictEqual(new RPN('(a+3)*2-1*8').compress().getRPN(),[
            {type:VAR, value:'a'},
            {type:NUM, value:3},
            {type:OPER, value:'+'},
            {type:NUM, value:2},
            {type:OPER, value:'*'},
            {type:NUM, value:8},
            {type:OPER, value:'-'},
        ]);
    });
    it('RPN get & set',function(){
        let template=[
            {type:VAR, value:'a'},
            {type:OPER, value:'NEG'},
            {type:NUM, value:3},
            {type:OPER, value:'+'},
            {type:NUM, value:2748},
            {type:OPER, value:'*'},
            {type:NUM, value:1},
            {type:NUM, value:8},
            {type:OPER, value:'NEG'},
            {type:OPER, value:'*'},
            {type:OPER, value:'-'},
        ];
        let rpn=new RPN('(-a+3)*0xabc-1*-8');
        let rpn2=new RPN();
        let rpn3=new RPN(rpn);
        rpn2.setRPN(rpn.getRPN());
		assert.deepStrictEqual(rpn.getRPN(),template);
		assert.deepStrictEqual(rpn2.getRPN(),template);
		assert.deepStrictEqual(rpn3.getRPN(),template);
    });
    it('Empty RPN',function(){
        let emptyRPN=new RPN().setRPN([]);
		assert.deepStrictEqual(emptyRPN.getRPN(),null);
		assert.deepStrictEqual(emptyRPN.calc(),null);
    });
    it('Exponentiation test',function(){
		assert.strictEqual(new RPN('2**2**3').calc(),256);
    });
    it('Exponentiation test 2',function(){
		assert.strictEqual(new RPN('2*2**(1+1)**(4-1)').calc(),512);
    });
});
describe('Malformed RPN test',function(){
    it('Non-array',function(){
        assert.throws(()=>new RPN().setRPN('aaa'),
            TypeError('Input must be an array with objects contains key "type" and "value"'));
    });
    it('Malformed array item',function(){
        assert.throws(()=>new RPN().setRPN([
            {value:23333},
            {type:NUM,value:666},
            {type:OPER,value:'+'},
        ]),TypeError(`Invalid RPN token at position 0`));
        assert.throws(()=>new RPN().setRPN([
            {type:NUM,value:666},
            null,
            {type:OPER,value:'+'},
        ]),TypeError(`Invalid RPN token at position 1`));
    });
    it('Invalid RPN variable',function(){
        assert.throws(()=>new RPN().setRPN([
            {type:VAR,value:23333},
            {type:NUM,value:666},
            {type:OPER,value:'+'},
        ]),TypeError(`Invalid RPN token at position 0`));
        assert.throws(()=>new RPN().setRPN([
            {type:NUM,value:666},
            {type:VAR,value:23333},
            {type:OPER,value:'+'},
        ]),TypeError(`Invalid RPN token at position 1`));
    });
    it('Invalid RPN number',function(){
        assert.throws(()=>new RPN().setRPN([
            {type:VAR,value:'var'},
            {type:NUM,value:'#####'},
            {type:OPER,value:'+'},
        ]),TypeError(`Invalid number at position 1`));
        assert.throws(()=>new RPN().setRPN([
            {type:NUM,value:'#####'},
            {type:VAR,value:'var'},
            {type:OPER,value:'+'},
        ]),TypeError(`Invalid number at position 0`));
    });
    it('Invalid RPN operand',function(){
        assert.throws(()=>new RPN().setRPN([
            {type:VAR,value:'var'},
            {type:NUM,value:2333},
            {type:OPER},
        ]),TypeError(`Invalid operand at position 2`));
        assert.throws(()=>new RPN([
            {type:NUM,value:2333},
            {type:VAR,value:'var'},
            {type:OPER,value:'雷'},
        ]),TypeError(`Invalid operand at position 2`));
    });
    it('Invalid RPN',function(){
        assert.throws(()=>new RPN().setRPN([
            {type:VAR,value:'var'},
            {type:OPER,value:'NEG'},
            {type:OPER,value:'+'},
        ]),SyntaxError(`Invalid RPN`));
        assert.throws(()=>new RPN().setRPN([
            {type:OPER,value:'NEG'},
            {type:OPER,value:'+'},
        ]),SyntaxError(`Invalid RPN`));
        assert.throws(()=>new RPN().setRPN([
            {type:NUM,value:2333},
            {type:NUM,value:2333},
            {type:NUM,value:2333},
            {type:OPER,value:'NEG'},
            {type:OPER,value:'+'},
        ]),SyntaxError(`Invalid RPN`));
    });
});
